import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiLayout, FiCode, FiServer, FiArrowUpRight } from 'react-icons/fi';
import { TfiCreditCard } from 'react-icons/tfi';
import { TbAutomaticGearbox, TbShieldCheck } from 'react-icons/tb';
import type { IconType } from 'react-icons';

const servicesIcons: { id: number; icon: IconType }[] = [
  { id: 1, icon: FiLayout },            // Desarrollo de Software y Arquitectura Web
  { id: 2, icon: FiCode },              // Sistemas Backend y APIs
  { id: 3, icon: FiServer },            // Infraestructura y Despliegue
  { id: 4, icon: TbAutomaticGearbox },  // Integración de IA y Automatización
  { id: 5, icon: TfiCreditCard },       // Pasarelas de Pago y Fintech
  { id: 6, icon: TbShieldCheck },       // Mantenimiento y Optimización
];

interface ServiceTranslation {
  id: number;
  title: string;
  description: string;
}

const Services = () => {
  const { t } = useTranslation();

  const translations = (t('services.items', { returnObjects: true }) as ServiceTranslation[]) || [];

  const services = servicesIcons.map((service) => {
    const translation = translations.find((item) => item.id === service.id);
    return {
      ...service,
      title: translation?.title ?? '',
      description: translation?.description ?? '',
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="services"
      className="relative py-24 bg-white dark:bg-dark-bg transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative background blobs (coherent with the site's blob animation) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl animate-blob"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-accent/20 dark:bg-accent-dark/10 rounded-full blur-3xl animate-blob"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.title')}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-primary mx-auto rounded-full" />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Gradient border glow — fades in on hover */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary-500 to-accent opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"
              />

              <div className="relative h-full glass elevation-2 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 group-hover:elevation-4">
                {/* Soft radial glow inside the card on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Large watermark index number */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-6 text-6xl font-black leading-none text-gray-900/5 dark:text-white/5 select-none transition-colors duration-500 group-hover:text-primary-500/10"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  {/* Icon with ring + glow */}
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-500 ring-1 ring-primary-500/10 group-hover:bg-gradient-primary group-hover:text-white group-hover:ring-primary-500/40 transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-105">
                      <service.icon size={30} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gradient transition-colors">
                    {service.title}
                  </h3>

                  {/* Animated underline */}
                  <div className="h-0.5 w-10 bg-gradient-primary rounded-full mb-4 origin-left scale-x-100 group-hover:scale-x-150 transition-transform duration-500" />

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
