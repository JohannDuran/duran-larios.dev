import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI, secure payments, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    live: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'AI Dashboard',
    description: 'Analytics dashboard featuring real-time data visualization and AI-powered insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Python', 'Tailwind'],
    live: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Social Network App',
    description: 'Real-time social application with chat, video sharing, and customizable profiles.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Firebase', 'Tailwind'],
    live: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Fintech Mobile App',
    description: 'Cross-platform mobile wallet for tracking expenses and managing cryptocurrency.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    tags: ['React Native', 'TypeScript', 'Node.js'],
    live: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Portfolio Generator',
    description: 'SaaS tool for developers to generate beautiful portfolios based on their GitHub profile.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue', 'Express', 'MongoDB'],
    live: '#',
    github: '#'
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  // Show only 4 primary tags for the filter bar to keep it clean
  const filterTags = ['All', 'React', 'TypeScript', 'Node.js', 'Tailwind'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.tags.includes(filter));

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
            {t('projects.title') || 'My Projects'}
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
              {tag === 'All' ? (t('projects.all') || 'All') : tag}
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
                      <img 
                        src={project.image} 
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
                          <FiExternalLink /> Live Demo
                        </a>
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                          <FiGithub /> Source Code
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
