import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe } from 'react-icons/fi';

// Section ids in document order — used for scroll-spy.
const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'services', 'contact'];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: observe each section and mark the one currently in view.
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible section among those intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Trigger when a section is roughly in the vertical middle of the viewport.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Label shows the language you'll switch TO (ES when in English, EN when in Spanish).
  const targetLangLabel = i18n.language.startsWith('en') ? 'ES' : 'EN';

  const navLinks = [
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.skills'), href: '#skills', id: 'skills' },
    { name: t('nav.projects'), href: '#projects', id: 'projects' },
    { name: t('nav.experience'), href: '#experience', id: 'experience' },
    { name: t('nav.services'), href: '#services', id: 'services' },
    { name: t('nav.contact'), href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/30 dark:bg-dark-bg/30 backdrop-blur-md border-b border-white/10 dark:border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-bold text-2xl text-gradient tracking-tight">
          Duran<span className="text-gray-900 dark:text-white">.dev</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
                }`}
              >
                {link.name}
                {/* Animated active indicator slides between links */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <div className="flex items-center gap-4 ml-4 border-l border-gray-300 dark:border-gray-700 pl-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
              aria-label={`Switch language to ${targetLangLabel}`}
            >
              <FiGlobe size={20} />
              <span className="text-xs font-bold tracking-wider">{targetLangLabel}</span>
            </button>
            <button onClick={toggleTheme} className="hover:text-primary-500 transition-colors" aria-label="Toggle Theme">
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 hover:text-primary-500 transition-colors"
            aria-label={`Switch language to ${targetLangLabel}`}
          >
            <FiGlobe size={20} />
            <span className="text-xs font-bold tracking-wider">{targetLangLabel}</span>
          </button>
          <button onClick={toggleTheme} className="hover:text-primary-500 transition-colors" aria-label="Toggle Theme">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl focus:outline-none z-50 relative" aria-label="Toggle menu">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0, transition: { delay: 0.1, duration: 0.2 } }}
            className="md:hidden fixed top-0 left-0 w-full flex flex-col items-center justify-center gap-8 text-xl font-semibold z-40 bg-white dark:bg-dark-card"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`transition-colors ${
                    isActive ? 'text-primary-500' : 'hover:text-primary-500'
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
