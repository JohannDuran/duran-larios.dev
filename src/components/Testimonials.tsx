import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    text: 'Alex delivered our project ahead of schedule and exceeded all our expectations. The attention to detail and code quality is outstanding.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO at Innovate',
    text: 'An exceptional developer who truly understands both the technical implementation and the user experience. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Product Manager',
    text: 'Working with Alex was a breeze. They communication was clear, and they brought innovative solutions to our complex problems.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.testimonials') || 'Client Testimonials'}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-8 md:px-20">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-lg"
            >
              <FiChevronLeft size={24} />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-lg"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl min-h-[350px] flex items-center justify-center relative shadow-xl overflow-hidden group">
            <FaQuoteLeft className="absolute top-8 left-8 text-primary-500/10 transition-transform group-hover:scale-110" size={80} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full text-center relative z-10"
              >
                <img 
                  src={testimonialsData[current].image} 
                  alt={testimonialsData[current].name} 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white dark:border-dark-surface shadow-md"
                />
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium italic mb-8 leading-relaxed">
                  "{testimonialsData[current].text}"
                </p>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonialsData[current].name}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400">
                    {testimonialsData[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-primary-500 w-8' : 'bg-gray-300 dark:bg-gray-700 hover:bg-primary-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
