import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'React / Next.js', level: 90 },
    { name: 'TypeScript / JS', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Node.js / Express', level: 75 },
    { name: 'UI / UX Design', level: 80 }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16" ref={ref}>
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Decorative background blocks */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-6 scale-105 opacity-50 dark:opacity-30"></div>
              <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900/40 rounded-3xl transform -rotate-3 scale-105"></div>
              
              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden glass z-10 p-2">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
                  alt="Developer Desk" 
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Floating element */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl z-20 shadow-xl"
              >
                <div className="text-primary-600 dark:text-primary-400 font-bold text-xl">5+ Years</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text & Skills Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.skills')}
            </h3>

            <div className="flex flex-col gap-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 dark:text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-primary rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                    >
                      {/* Shine effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-white/20"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
