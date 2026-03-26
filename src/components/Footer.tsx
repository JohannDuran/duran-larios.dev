import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <a href="#" className="font-bold text-2xl text-gradient tracking-tight">
              Alex<span className="text-gray-900 dark:text-white">.dev</span>
            </a>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm">
              Building digital products, brands, and experience.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all hover:-translate-y-1">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all hover:-translate-y-1">
              <FiLinkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all hover:-translate-y-1">
              <FiTwitter size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Alex. {t('footer.rights')}
          </p>

          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
