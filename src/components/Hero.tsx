import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  const roles = t('hero.roles', { returnObjects: true }) as string[];

  // Re-key TypeAnimation on language change to restart animation properly with new strings
  const typeSequence = roles.flatMap(role => [role, 2000]);

  // Determine the correct CV file based on current language
  const cvUrl = i18n.language?.startsWith('es') ? '/cv/ES-RESUME.pdf' : '/cv/EN-RESUME.pdf';

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDownloadConfirm(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary-400/30 dark:bg-primary-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-accent/30 dark:bg-accent-dark/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-blob [animation-delay:2000ms]"></div>
        <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] bg-pink-400/20 dark:bg-pink-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70 animate-blob [animation-delay:4000ms]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 my-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 font-medium text-sm shadow-sm"
          >
            🚀 {t('hero.greeting')}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
          >
            {t('hero.name')}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-12 md:h-16 text-2xl md:text-4xl font-bold text-gray-600 dark:text-gray-300 mb-8"
          >
            <span className="mr-2">I am a</span>
            <span className="text-gradient">
              <TypeAnimation
                key={i18n.language}
                sequence={typeSequence}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#projects" className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30 flex items-center justify-center gap-2">
              {t('hero.viewWork')} <FiArrowRight />
            </a>
            <button onClick={handleDownloadClick} className="px-8 py-4 rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold transition-all hover:bg-gray-50 dark:hover:bg-dark-card transform hover:scale-105 flex items-center justify-center gap-2">
              {t('hero.downloadCV')} <FiDownload />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce hidden md:flex"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-primary-500 to-transparent rounded-full mb-2"></div>
      </motion.div>

      {/* Download Confirm Modal */}
      <AnimatePresence>
        {showDownloadConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-dark-card p-6 md:p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiDownload size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('hero.confirmDownloadTitle') || 'Confirm Download'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {t('hero.confirmDownloadDesc') || 'Are you sure you want to download the CV?'}
                </p>
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => setShowDownloadConfirm(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-bg text-gray-900 dark:text-white font-medium flex-1 transition-colors"
                  >
                    {t('hero.cancel') || 'Cancel'}
                  </button>
                  <a 
                    href={cvUrl} 
                    download 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => setShowDownloadConfirm(false)}
                    className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium flex-1 transition-colors flex items-center justify-center"
                  >
                    {t('hero.confirm') || 'Download'}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
