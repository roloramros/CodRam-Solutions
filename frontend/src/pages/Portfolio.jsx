import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import projects from '../data/projects.json';
import ProjectCarousel from '../components/ProjectCarousel';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('portfolio.title')}</h1>
          <p className="text-gray text-xl">{t('portfolio.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <ProjectCarousel images={project.images} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{t(project.titleKey)}</h3>
                <p className="text-gray text-sm mb-4 line-clamp-2">{t(project.descriptionKey)}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
