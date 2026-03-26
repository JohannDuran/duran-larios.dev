import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe } from 'react-icons/fi';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-bold text-2xl text-gradient tracking-tight">
          Alex<span className="text-gray-900 dark:text-white">.dev</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-primary-500 transition-colors">
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-gray-300 dark:border-gray-700 pl-4">
            <button onClick={toggleLanguage} className="hover:text-primary-500 transition-colors" aria-label="Toggle Language">
              <FiGlobe size={20} />
            </button>
            <button onClick={toggleTheme} className="hover:text-primary-500 transition-colors" aria-label="Toggle Theme">
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLanguage} className="hover:text-primary-500 transition-colors">
            <FiGlobe size={20} />
          </button>
          <button onClick={toggleTheme} className="hover:text-primary-500 transition-colors">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl focus:outline-none z-50 relative">
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
            className="md:hidden glass fixed top-0 left-0 w-full flex flex-col items-center justify-center gap-8 text-xl font-semibold z-40"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="hover:text-primary-500 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
