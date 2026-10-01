import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import ProjectPreview from './ProjectPreview';

// Non-translatable project data (image, tags, links). Translatable text
// (title, description) lives in the i18n locale files under `projects.items`,
// matched to each project by `id`.
const projectsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://www.agencydsn.com',
    github: '#'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 4'],
    live: 'https://www.inclusivecolle.com/',
    github: '#'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://www.intervalmp.com',
    github: '#'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'http://www.rivgoldcorporacion.com',
    github: '#'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop',
    tags: ['Astro 5', 'React 18', 'TypeScript', 'Tailwind'],
    live: 'https://experienciasxm.com.mx',
    github: '#'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Firebase 11', 'Radix UI'],
    live: 'https://pamelamorcillo.com/',
    github: '#'
  },
];

// Shape of a translated project entry coming from the locale files.
interface ProjectTranslation {
  id: number;
  title: string;
  description: string;
}

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  // Translated title/description per project, keyed by id.
  const translations = (t('projects.items', { returnObjects: true }) as ProjectTranslation[]) || [];

  // Merge static data with the translations for the current language.
  const projects = projectsData.map((project) => {
    const translation = translations.find((item) => item.id === project.id);
    return {
      ...project,
      title: translation?.title ?? '',
      description: translation?.description ?? '',
    };
  });

  // Show only a few primary tags for the filter bar to keep it clean
  const filterTags = ['All', 'React', 'Bootstrap', 'Vanilla Web', 'Astro', 'Tailwind', 'Next.js'];

  // Maps each filter button to the real project tags it should match.
  // - `all`:  every listed tag must be present in the project (AND logic).
  // - `any`:  at least one listed tag (or prefix) must match (OR logic).
  // Matching is case-insensitive and prefix-based, so "Bootstrap" matches
  // "Bootstrap 4" and "React" matches "React 18"/"React 19".
  const filterAliases: Record<string, { mode: 'all' | 'any'; tags: string[] }> = {
    'Vanilla Web': { mode: 'all', tags: ['HTML', 'CSS', 'JavaScript'] },
    'Bootstrap': { mode: 'any', tags: ['Bootstrap'] },
    'React': { mode: 'any', tags: ['React'] },
    'Astro': { mode: 'any', tags: ['Astro 5'] },
    'Tailwind': { mode: 'any', tags: ['Tailwind'] },
    'Next.js': { mode: 'any', tags: ['Next.js'] },
  };

  // True if `projectTags` satisfies the given `filter`.
  const matchesFilter = (projectTags: string[], filterName: string): boolean => {
    if (filterName === 'All') return true;

    const normalized = projectTags.map((tag) => tag.toLowerCase());
    const alias = filterAliases[filterName];

    // Fallback: no alias defined → exact (case-insensitive) tag match.
    const rules = alias ?? { mode: 'any' as const, tags: [filterName] };

    const hasTag = (needle: string) =>
      normalized.some((tag) => tag.startsWith(needle.toLowerCase()));

    return rules.mode === 'all'
      ? rules.tags.every(hasTag)
      : rules.tags.some(hasTag);
  };

  const filteredProjects = projects.filter((p) => matchesFilter(p.tags, filter));

  return (
    <section id="projects" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === tag 
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                  : 'bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {tag === 'All' ? t('projects.all') : tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Tilt 
                  tiltMaxAngleX={5} 
                  tiltMaxAngleY={5} 
                  scale={1.02} 
                  transitionSpeed={2000}
                  className="h-full"
                >
                  <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 border border-gray-100 dark:border-gray-800">
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                      <ProjectPreview
                        liveUrl={project.live}
                        fallbackImage={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs font-semibold px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full border border-primary-100 dark:border-primary-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                        <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                          <FiExternalLink /> {t('projects.liveDemo')}
                        </a>
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                          <FiGithub /> {t('projects.github')}
                        </a>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

