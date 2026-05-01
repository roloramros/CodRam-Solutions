import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import projects from '../data/projects.json';
import ProjectCarousel from '../components/ProjectCarousel';
import ImageModal from '../components/ImageModal';

const Portfolio = () => {
  const { t } = useTranslation();
  const [expandedProjects, setExpandedProjects] = useState({});
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  const toggleExpand = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (images, index) => {
    setModalConfig({
      isOpen: true,
      images: images,
      currentIndex: index
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleIndexChange = (newIndex) => {
    setModalConfig(prev => ({ ...prev, currentIndex: newIndex }));
  };

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
              <ProjectCarousel 
                images={project.images} 
                onImageClick={(images, index) => openModal(images, index)}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{t(project.titleKey)}</h3>
                <div>
                  <p className={`text-gray text-sm mb-4 transition-all duration-300 ${
                    expandedProjects[project.id] ? '' : 'line-clamp-2'
                  }`}>
                    {t(project.descriptionKey)}
                  </p>
                  <button 
                    onClick={() => toggleExpand(project.id)}
                    className="text-primary text-xs font-bold hover:underline mb-4 block"
                  >
                    {expandedProjects[project.id] ? t('portfolio.see_less') : t('portfolio.see_more')}
                  </button>
                </div>
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
      
      <ImageModal 
        isOpen={modalConfig.isOpen} 
        images={modalConfig.images} 
        currentIndex={modalConfig.currentIndex}
        onIndexChange={handleIndexChange}
        onClose={closeModal} 
      />
    </div>
  );
};

export default Portfolio;
