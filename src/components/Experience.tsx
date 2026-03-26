import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiAward } from 'react-icons/fi';

const experiences = [
  {
    id: 1,
    type: 'work',
    role: 'Senior Frontend Developer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Lead a team of 5 developers building scalable React applications. Improved core vitals by 40%.'
  },
  {
    id: 2,
    type: 'work',
    role: 'Full Stack Developer',
    company: 'Digital Solutions LLC',
    period: '2019 - 2022',
    description: 'Developed and maintained various client projects using React, Node.js, and PostgreSQL.'
  },
  {
    id: 3,
    type: 'education',
    role: 'Master in Software Engineering',
    company: 'University of Technology',
    period: '2017 - 2019',
    description: 'Specialized in distributed systems and modern web architecture.'
  },
  {
    id: 4,
    type: 'education',
    role: 'Bachelor in Computer Science',
    company: 'State University',
    period: '2013 - 2017',
    description: 'Graduated with honors. Active member of the coding club.'
  }
];

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.experience') || 'Experience & Education'}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500 via-primary-300 to-transparent dark:from-primary-600 dark:via-primary-800 dark:to-transparent transform md:-translate-x-1/2 rounded-full"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center justify-between md:justify-normal w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline icon */}
                  <div className="absolute left-2 md:left-1/2 w-8 h-8 md:w-10 md:h-10 transform -translate-x-[calc(50%-1px)] md:-translate-x-1/2 flex items-center justify-center bg-white dark:bg-dark-surface border-4 border-primary-500 rounded-full z-10 text-primary-500 shadow-lg group-hover:scale-125 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {exp.type === 'work' ? <FiBriefcase size={16} /> : <FiAward size={16} />}
                  </div>

                  {/* Empty space for desktop layout */}
                  <div className="hidden md:block w-5/12"></div>
                  
                  {/* Content card */}
                  <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="glass p-6 md:p-8 rounded-2xl hover:border-primary-500/50 transition-colors duration-300 group-hover:shadow-primary-500/20 group-hover:shadow-2xl">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/40 rounded-full border border-primary-100 dark:border-primary-800/50">
                        {exp.period}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
                        {exp.company}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
