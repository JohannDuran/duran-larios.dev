# duran-larios.dev

Mi portafolio personal. Una sola página con las secciones de siempre: presentación,
sobre mí, stack, proyectos, experiencia, servicios y contacto. Soporta español e
inglés y tema claro/oscuro.

## Stack

- React 19 + TypeScript
- Vite como bundler y dev server
- Tailwind CSS para estilos
- Framer Motion para animaciones
- i18next (es / en)

## Requisitos

- Node 20.19+ o 22.12+
- npm

## Correr en local

```bash
npm install
npm run dev
```

El dev server queda en `http://localhost:5173`.

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Levanta el entorno de desarrollo con hot reload |
| `npm run build` | Compila TypeScript y genera el build de producción en `dist/` |
| `npm run preview` | Sirve el build de `dist/` para revisarlo en local |
| `npm run lint` | Pasa ESLint sobre el proyecto |

## Estructura

```
src/
├── components/        Secciones y piezas de UI (Hero, About, Projects, ...)
├── i18n/
│   ├── config.ts      Configuración de idiomas
│   └── locales/       Textos en es.json / en.json
├── assets/            Imágenes y recursos
├── theme/             Tema y estilos base
├── App.tsx            Composición de la página
└── main.tsx           Punto de entrada
```

## Notas

- Los textos de cada sección viven en `src/i18n/locales`. Para editar títulos,
  descripciones o la lista de experiencia, se cambian ahí (no en los componentes).
- En la sección de proyectos, la vista previa de cada tarjeta se genera a partir de
  la URL en producción del sitio; si no se puede capturar, cae a una imagen de
  respaldo definida en `projectsData`.
- Los datos no traducibles de proyectos (tags, enlaces, imagen de respaldo) están
  en `src/components/Projects.tsx`, enlazados por `id` con los textos del locale.
