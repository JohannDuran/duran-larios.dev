import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiAward } from 'react-icons/fi';


const Experience = () => {
  const { t } = useTranslation();
  
  const experiences = t('experienceSection.items', { returnObjects: true }) as Array<{
    id: number;
    type: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;

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

        <div className="max-w-4xl mx-auto relative px-4 md:px-0">
          {/* Main vertical line - Moved to 20px on mobile, center on desktop */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-500 via-primary-300 to-transparent dark:from-primary-600 dark:via-primary-800 dark:to-transparent transform md:-translate-x-1/2 rounded-full ml-4 md:ml-0"></div>
          
          <div className="space-y-12 shrink-0">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center w-full group ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
                >
                  {/* Timeline icon */}
                  {/* It exactly sits on the line at left:20px or left:50% */}
                  <div className="absolute left-[20px] md:left-1/2 w-10 h-10 transform -translate-x-1/2 flex items-center justify-center bg-white dark:bg-dark-surface border-[4px] border-primary-500 rounded-full z-10 text-primary-500 shadow-lg group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 ml-4 md:ml-0">
                    {exp.type === 'work' ? <FiBriefcase size={18} /> : <FiAward size={18} />}
                  </div>

                  {/* Empty space for desktop layout to push card to one side */}
                  <div className="hidden md:block md:w-1/2"></div>
                  
                  {/* Content card */}
                  {/* For mobile, it has ml-[60px] to start exactly right after the icon. For desktop, it takes nearly half minus the icon's radius  */}
                  <div className={`w-full md:w-1/2 flex flex-col pl-[60px] ml-4 md:ml-0 md:pl-0 ${isEven ? 'md:items-end md:pr-[20px]' : 'md:items-start md:pl-[20px]'}`}>
                    <div className="glass p-6 md:p-8 rounded-2xl md:rounded-[2rem] hover:border-primary-500/50 transition-all duration-300 group-hover:shadow-primary-500/20 group-hover:shadow-2xl w-full flex flex-col group/card overflow-hidden">
                      <div className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-start text-left`}>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/40 rounded-full border border-primary-100 dark:border-primary-800/50 shadow-sm">
                          {exp.period}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.role}
                        </h3>
                        <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
                          {exp.company}
                        </h4>
                      </div>
                      
                      {/* Inner scrollable area for descriptions */}
                      <div className="relative mt-2 p-5 rounded-xl bg-gray-50/50 dark:bg-dark-surface/40 border border-gray-100/50 dark:border-gray-800/50 group-hover/card:border-primary-500/20 transition-colors shadow-inner w-full">
                        <div className="max-h-[160px] overflow-y-auto pr-3 text-left">
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        </div>
                      </div>
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
