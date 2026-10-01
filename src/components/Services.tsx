import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMonitor, FiLayout, FiDatabase, FiPenTool } from 'react-icons/fi';

const servicesIcons = [
  {
    id: 1,
    icon: FiMonitor
  },
  {
    id: 2,
    icon: FiLayout
  },
  {
    id: 3,
    icon: FiDatabase
  },
  {
    id: 4,
    icon: FiPenTool
  }
];

interface ServiceTranslation{
  id: number;
  title: string;
  description: string;
}

const Services = () => {
  const { t } = useTranslation();

  const translations = (t('services.items', { returnObjects: true}) as ServiceTranslation[]) || [];

  const services = servicesIcons.map((service) => {
    const translation = translations.find((item => item.id === service.id));

    return{
      ...service,
      title: translation?.title ?? '',
      description: translation?.description ?? '',
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map ((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="glass p-8 rounded-3xl group transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-500 mb-6 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
      </div>
    </section>
  );
};

export default Services;
