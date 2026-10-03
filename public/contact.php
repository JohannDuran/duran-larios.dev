<?php
// ============================================================
//  Procesador del formulario de contacto (Hostgator / PHP)
//  Envía el mensaje en texto plano a contact@duran-larios.dev
//
//  Capas de seguridad:
//   1. Solo POST
//   2. Verificación de Origin/Referer (anti-CSRF básico y bots)
//   3. Rate limiting por IP (anti-spam / anti-saturación)
//   4. Honeypot (anti-bot)
//   5. Validación y saneamiento de entrada
//   6. Anti header-injection (quita CR/LF de cabeceras)
//   7. From del propio dominio + Reply-To del visitante (entregabilidad)
// ============================================================

// --- Cabeceras base de respuesta -----------------------------------------
header('Content-Type: application/json; charset=UTF-8');
// Esta respuesta nunca debe cachearse.
header('Cache-Control: no-store');

// Función helper para responder y terminar.
function respond(int $code, array $payload): void {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

// --- 1. Solo aceptar POST --------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// --- 2. Verificar origen ---------------------------------------------------
// Aceptar solo peticiones que vengan de nuestro propio dominio.
// Esto frena envíos cross-site y muchos bots que postean directo.
$allowedHosts = ['duran-larios.dev', 'www.duran-larios.dev'];
$origin  = $_SERVER['HTTP_ORIGIN']  ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$sourceHost = '';
if ($origin !== '') {
    $sourceHost = parse_url($origin, PHP_URL_HOST) ?? '';
} elseif ($referer !== '') {
    $sourceHost = parse_url($referer, PHP_URL_HOST) ?? '';
}
// Si hay origen/referer y no está permitido, rechazar.
// (Si ambos vienen vacíos lo dejamos pasar: algunos navegadores/privacidad
//  no envían Referer, pero el honeypot + rate limit siguen protegiendo.)
if ($sourceHost !== '' && !in_array($sourceHost, $allowedHosts, true)) {
    respond(403, ['ok' => false, 'error' => 'Forbidden origin']);
}

// --- 3. Rate limiting por IP ----------------------------------------------
// Límites: mínimo 15s entre envíos, y máximo 5 envíos por hora por IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
// Normalizar la IP para usarla como nombre de archivo seguro.
$ipKey   = preg_replace('/[^a-fA-F0-9:.]/', '_', $ip);
$dir     = sys_get_temp_dir() . '/contact_rl';
if (!is_dir($dir)) {
    @mkdir($dir, 0700, true);
}
$file = $dir . '/' . hash('sha256', $ipKey) . '.json';

$now     = time();
$minGap  = 15;    // segundos entre envíos
$maxHour = 5;     // envíos por hora
$history = [];
if (is_file($file)) {
    $decoded = json_decode((string) @file_get_contents($file), true);
    if (is_array($decoded)) {
        $history = $decoded;
    }
}
// Conservar solo marcas de la última hora.
$history = array_values(array_filter($history, fn($ts) => ($now - (int) $ts) < 3600));

if (!empty($history)) {
    $last = max($history);
    if (($now - (int) $last) < $minGap) {
        respond(429, ['ok' => false, 'error' => 'Too many requests, slow down']);
    }
}
if (count($history) >= $maxHour) {
    respond(429, ['ok' => false, 'error' => 'Hourly limit reached']);
}

// --- Leer el cuerpo JSON ---------------------------------------------------
$raw  = file_get_contents('php://input');
// Limitar tamaño del payload (anti-DoS por cuerpos enormes): 10 KB.
if (strlen($raw) > 10240) {
    respond(413, ['ok' => false, 'error' => 'Payload too large']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST; // fallback a form-encoded
}

// --- 4. Honeypot -----------------------------------------------------------
// Si el campo oculto "website" viene lleno, es un bot. Fingir éxito
// (no registramos la marca de tiempo para no gastar la cuota de la IP real).
if (!empty(trim($data['website'] ?? ''))) {
    respond(200, ['ok' => true]);
}

// --- 5. Saneamiento y validación ------------------------------------------
$name    = trim(substr($data['name']    ?? '', 0, 100));
$email   = trim(substr($data['email']   ?? '', 0, 150));
$message = trim(substr($data['message'] ?? '', 0, 2000));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Invalid input']);
}

// --- 6. Anti header-injection ---------------------------------------------
// Quitar CR/LF de cualquier valor que vaya en cabeceras.
$safeEmail = preg_replace('/[\r\n]+/', '', $email);
$safeName  = preg_replace('/[\r\n]+/', '', $name);

// --- Construir el correo (texto plano) ------------------------------------
$to      = 'contact@duran-larios.dev';
$subject = "Nuevo mensaje de contacto - $safeName";
$body =
    "Nombre:  $safeName\n" .
    "Email:   $safeEmail\n" .
    "IP:      $ip\n" .
    "---------------------------------------\n\n" .
    $message . "\n";

// --- 7. Cabeceras del correo ----------------------------------------------
// From = buzón propio del dominio (mejor entregabilidad, evita spoofing).
// Reply-To = correo del visitante (al responder, va directo a él).
$headers  = "From: Portfolio Contacto <contact@duran-larios.dev>\r\n";
$headers .= "Reply-To: $safeName <$safeEmail>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Registrar el envío exitoso para el rate limiting.
    $history[] = $now;
    @file_put_contents($file, json_encode($history), LOCK_EX);
    respond(200, ['ok' => true]);
}

respond(500, ['ok' => false, 'error' => 'Mail send failed']);
