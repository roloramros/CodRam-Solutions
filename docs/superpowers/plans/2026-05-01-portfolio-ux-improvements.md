# Portfolio UX Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the Portfolio page by adding an adaptive image modal for full-size viewing and expandable project descriptions with a "...ver más" button.

**Architecture:** 
- Update `ProjectCarousel` to support image clicks and use `object-contain` for better aspect ratio handling.
- Create a reusable `ImageModal` component using `framer-motion` for animations.
- Modify `Portfolio` page to manage state for expanded descriptions and the active modal image.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide React (icons).

---

### Task 1: Update ProjectCarousel for Adaptive Sizing and Interactivity

**Files:**
- Modify: `frontend/src/components/ProjectCarousel.jsx`

- [ ] **Step 1: Update styles to use `object-contain` and add click handler**

```javascript
// frontend/src/components/ProjectCarousel.jsx

// ... imports
const ProjectCarousel = ({ images, onImageClick }) => { // Add onImageClick prop
  // ... state and handlers

  return (
    <div className="relative group w-full aspect-video bg-black/40 rounded-t-xl overflow-hidden cursor-pointer" 
         onClick={() => onImageClick && onImageClick(images[currentIndex])}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full h-full relative flex items-center justify-center bg-black/60"
        >
          {/* Background blurred image for aesthetic fill */}
          <img 
            src={images[currentIndex]} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110"
          />
          <motion.img
            src={images[currentIndex]}
            alt={`Project image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Rest of the controls ... */}
    </div>
  );
};
```

- [ ] **Step 2: Commit changes**

```bash
git add frontend/src/components/ProjectCarousel.jsx
git commit -m "feat(portfolio): update ProjectCarousel to use object-contain and support image clicks"
```

### Task 2: Create ImageModal Component

**Files:**
- Create: `frontend/src/components/ImageModal.jsx`

- [x] **Step 1: Implement the ImageModal component**

```javascript
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

const ImageModal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            onClick={onClose}
          >
            <X size={32} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt="Full size project"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
```

- [x] **Step 2: Commit new component**

```bash
git add frontend/src/components/ImageModal.jsx
git commit -m "feat(portfolio): add ImageModal component for full-screen viewing"
```

### Task 3: Implement Expandable Description and Modal Logic in Portfolio

**Files:**
- Modify: `frontend/src/pages/Portfolio.jsx`

- [ ] **Step 1: Add state and logic for expansion and modal**

```javascript
// frontend/src/pages/Portfolio.jsx
import { useState } from 'react'; // Add useState
// ... other imports
import ImageModal from '../components/ImageModal';

const Portfolio = () => {
  const { t } = useTranslation();
  const [expandedProjects, setExpandedProjects] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleExpand = (id) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ... header */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.id} ... >
              <ProjectCarousel 
                images={project.images} 
                onImageClick={(img) => setSelectedImage(img)} 
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
                    {expandedProjects[project.id] ? t('portfolio.see_less') || 'Ver menos' : t('portfolio.see_more') || '... ver más'}
                  </button>
                </div>
                {/* ... tags */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};
```

- [ ] **Step 2: Add translation keys for "see more/less"**

Modify `frontend/src/locales/es/translation.json` and `frontend/src/locales/en/translation.json`.

- [ ] **Step 3: Commit changes**

```bash
git add frontend/src/pages/Portfolio.jsx frontend/src/locales/*/translation.json
git commit -m "feat(portfolio): implement expandable descriptions and image modal integration"
```

### Task 4: Verification

- [ ] **Step 1: Verify on local dev server**

1. Run `npm run dev` in `frontend` directory.
2. Navigate to Portafolio.
3. Confirm images are not cropped (use `object-contain`).
4. Click an image and verify the modal opens correctly.
5. Click "... ver más" and verify the text expands.
6. Verify translated strings for "Ver más" and "Ver menos".
