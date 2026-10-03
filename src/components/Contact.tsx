import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Web3Forms access key. This key is meant to live in the frontend (it only
// authorizes sending to the inbox configured on web3forms.com), so hardcoding
// it is fine. Can be overridden via VITE_WEB3FORMS_KEY if desired.
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || '2ca9314d-d16a-41ae-bb88-d5f2bfa6e9b2';

// Generate a simple math challenge (small numbers, addition only).
const makeCaptcha = () => {
  const a = Math.floor(Math.random() * 8) + 1; // 1–8
  const b = Math.floor(Math.random() * 8) + 1; // 1–8
  return { a, b, answer: a + b };
};

const Contact = () => {
  const { t } = useTranslation();
  // `website` is a honeypot field: hidden from humans, bots tend to fill it.
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Timestamp of the last submission, used for simple client-side rate limiting.
  const [lastSentAt, setLastSentAt] = useState(0);
  // Simple math captcha challenge + the user's typed answer.
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot: if the hidden field is filled, it's almost certainly a bot.
    //    Silently ignore to avoid tipping off the bot.
    if (formData.website.trim() !== '') {
      return;
    }

    // 2. Rate limit (client-side): block submissions fired less than 15s apart.
    //    The server enforces its own stricter limit; this is just UX.
    const now = Date.now();
    if (now - lastSentAt < 15_000) {
      toast.error(t('contact.rateLimit') || 'Please wait a few seconds before sending again.');
      return;
    }

    // 3. Trim + validate input before sending.
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name === '' || email === '' || message === '') {
      toast.error(t('contact.error') || 'Please fill in all fields.');
      return;
    }

    // Length guards (mirror the server limits).
    if (name.length > 100 || email.length > 150 || message.length > 2000) {
      toast.error(t('contact.tooLong') || 'Your message is too long.');
      return;
    }

    // Basic email format check (the server also validates).
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      toast.error(t('contact.invalidEmail') || 'Please enter a valid email address.');
      return;
    }

    // 4. Require the correct answer to the simple math captcha.
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      toast.error(t('contact.captcha') || 'Incorrect captcha answer.');
      setCaptcha(makeCaptcha());
      setCaptchaInput('');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit through Web3Forms (external service). This keeps the contact
      // form fully client-side and avoids any server/PHP dependency.
      // The destination inbox is tied to the access key; `cc` adds a copy.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo mensaje de contacto - ${name}`,
          from_name: 'Portfolio duran-larios.dev',
          name,
          email,
          message,
          cc: 'johann.duran@outlook.com',
          botcheck: formData.website, // honeypot, Web3Forms ignores filled ones
        }),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (res.ok && data.success) {
        setLastSentAt(now);
        setFormData({ name: '', email: '', message: '', website: '' });
        toast.success(t('contact.success') || 'Message sent successfully!');
      } else {
        toast.error(t('contact.error') || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error(t('contact.error') || 'Something went wrong. Please try again.');
    } finally {
      // Refresh the captcha for the next submission.
      setCaptcha(makeCaptcha());
      setCaptchaInput('');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title') || 'Get in Touch'}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="glass p-8 rounded-3xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
                <FiMail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email</h4>
                <a href="mailto:contact@duran-larios.dev" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  contact@duran-larios.dev
                </a>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
                <FiMapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Mérida, México<br/>Disponible Presencial|Remoto
                </p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex items-start gap-4 hover:border-primary-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
                <FiPhone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Phone</h4>
                <a href="tel:+529991998949" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  +52 999 199 8949
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl flex flex-col gap-6">
              {/* Honeypot field — hidden from users, bots fill it and get blocked.
                  Kept out of the layout and the tab order, and marked aria-hidden. */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                    {t('contact.name') || 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-6 py-4 rounded-xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600 text-gray-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                    {t('contact.email') || 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-6 py-4 rounded-xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600 text-gray-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                  {t('contact.message') || 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="px-6 py-4 rounded-xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600 text-gray-900 dark:text-white resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {/* Simple math captcha — blocks basic bots, no external service. */}
              <div className="flex flex-col gap-2">
                <label htmlFor="captcha" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                  {t('contact.captchaLabel') || 'Anti-spam'}: {captcha.a} + {captcha.b} = ?
                </label>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  inputMode="numeric"
                  autoComplete="off"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="px-6 py-4 rounded-xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600 text-gray-900 dark:text-white"
                  placeholder={t('contact.captchaPlaceholder') || 'Your answer'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {t('contact.send') || 'Send Message'}
                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
