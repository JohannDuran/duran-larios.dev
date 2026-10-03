import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiAward, FiChevronDown } from 'react-icons/fi';

// Company logo per experience id. Empty string → render an icon badge instead.
const companyLogos: Record<number, string> = {
  1: 'https://play-lh.googleusercontent.com/XgYXR5kLXNPEM0mllxDOMTmwYgzHEQnwiKiOeWwgm2RM02aJiCdRZnxrJ1zPuI2q3ddgY7lSFhKWEpwj7_dmFA=w480-h960-rw', // Macropay
  2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa85inRQkFADvo-kZDoue0H4o5hnoS5vZJxa_sOwKqMud0COHcxTwZHcmf&s=10', // Grupo Colorines
  3: '', // OneSmart
  4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsuCKD3RQBDCpypu3tcfy_t6Jp44u4TS6vItnDS3abA&s=10', // Compufax
  5: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxobbRmlvjKpZCyUCqv5Rhs-0wyVih-T-tf_k3dU0Eg&s=10', // Tecnologico
};

interface ExperienceItem {
  id: number;
  type: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const Experience = () => {
  const { t } = useTranslation();
  // Track which card is expanded (first one open by default for a filled look).
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const experiences = (t('experienceSection.items', { returnObjects: true }) as ExperienceItem[]) || [];

  return (
    <section
      id="experience"
      className="relative py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section header — editorial, left-aligned on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-500">
            {t('experienceSection.kicker') || 'Career Path'}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('nav.experience') || 'Experience & Education'}
          </h2>
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mt-5" />
        </motion.div>

        {/* Single-column timeline */}
        <div className="max-w-3xl mx-auto">
          <ol className="relative border-l border-gray-200 dark:border-gray-700/70 ml-3 md:ml-0">
            {experiences.map((exp, index) => {
              const isWork = exp.type === 'work';
              const logo = companyLogos[exp.id];
              const isOpen = expandedId === exp.id;

              return (
                <motion.li
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative pl-8 md:pl-12 pb-10 last:pb-0"
                >
                  {/* Timeline node */}
                  <span className="absolute -left-[9px] top-1.5 flex items-center justify-center">
                    <span className="absolute w-4 h-4 rounded-full bg-primary-500/20 animate-ping-slow" />
                    <span className="relative w-[18px] h-[18px] rounded-full border-2 border-primary-500 bg-gray-50 dark:bg-dark-card flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-gradient-primary" />
                    </span>
                  </span>

                  {/* Period label in mono — technical, Swiss-style */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      {exp.period}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${
                        isWork
                          ? 'text-gray-400 dark:text-gray-500'
                          : 'text-accent dark:text-accent-light'
                      }`}
                    >
                      {isWork ? <FiBriefcase size={10} /> : <FiAward size={10} />}
                      {isWork
                        ? t('experienceSection.work') || 'Work'
                        : t('experienceSection.education') || 'Education'}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white dark:bg-dark-surface border-primary-500/40 elevation-3'
                        : 'bg-white/60 dark:bg-dark-surface/50 border-gray-100 dark:border-gray-800 hover:border-primary-500/30 elevation-1 hover:elevation-2'
                    }`}
                  >
                    {/* Header row — click to expand */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : exp.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      {/* Company logo or icon badge */}
                      <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center ring-1 ring-gray-200/70 dark:ring-gray-700/70">
                        {logo ? (
                          <img src={logo} alt="" className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-primary-500">
                            {isWork ? <FiBriefcase size={22} /> : <FiAward size={22} />}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug truncate">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">
                          {exp.company}
                        </p>
                      </div>

                      <FiChevronDown
                        className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary-500' : ''
                        }`}
                        size={20}
                      />
                    </button>

                    {/* Expandable description */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
