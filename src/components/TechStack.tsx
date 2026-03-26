import { motion, type Variants } from 'framer-motion';
import { 
  SiReact, SiVite, SiTailwindcss, SiFramer, SiTypescript, SiJavascript,
  SiHtml5, SiCss3, SiNodedotjs, SiPython, SiGit, SiDocker,
  SiFigma, SiMongodb, SiPostgresql, SiFirebase, SiAngular, SiVuedotjs
} from 'react-icons/si';

const TechStack = () => {
  const techs = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Vue', icon: SiVuedotjs, color: '#4FC08D' },
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Framer', icon: SiFramer, color: '#0055FF' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive list of the tools and technologies I use to build robust and scalable applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {techs.map((Tech, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-surface rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group relative"
            >
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: Tech.color }}
              />
              <Tech.icon 
                size={48} 
                className="text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:!text-[var(--hover-color)]"
                style={{ '--hover-color': Tech.color } as React.CSSProperties}
              />
              <span className="mt-4 font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {Tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
