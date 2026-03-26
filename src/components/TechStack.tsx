import { motion, type Variants } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiPhp, SiNodedotjs, SiNestjs,
  SiExpress, SiGit, SiMysql, SiRedis, SiDocker, SiJenkins,
  SiGraphql, SiAmazonwebservices, SiLaravel, SiCakephp, SiPrisma
} from 'react-icons/si';
import { TbBrandCSharp, TbSql } from 'react-icons/tb';
import { FiLayers } from 'react-icons/fi';

const TechStack = () => {
  const techs = [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'SQL', icon: TbSql, color: '#4479A1' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'C#', icon: TbBrandCSharp, color: '#239120' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D33833' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { name: 'AWS', icon: SiAmazonwebservices, color: '#232F3E' },
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'CakePHP', icon: SiCakephp, color: '#D33C43' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
    { name: 'Microservicios', icon: FiLayers, color: '#06B6D4' },
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
