# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a functional portfolio page with a carousel system for project images, managed via a centralized JSON file and localized in English and Spanish.

**Architecture:** 
- Centralized data in `frontend/src/data/projects.json`.
- Reusable `ProjectCarousel` component using `framer-motion` for transitions.
- `Portfolio.jsx` page to render the list of project cards.
- Localization handled via `react-i18next`.

**Tech Stack:** React, Tailwind CSS, Framer Motion, i18next.

---

### Task 1: Project Data Structure

**Files:**
- Create: `frontend/src/data/projects.json`

- [ ] **Step 1: Create the projects JSON file**

Create `frontend/src/data/projects.json` with initial placeholder data:
```json
[
  {
    "id": "ecommerce-futurista",
    "titleKey": "portfolio.projects.ecommerce.title",
    "descriptionKey": "portfolio.projects.ecommerce.description",
    "images": [
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
    ],
    "tags": ["React", "Tailwind", "Framer Motion"],
    "link": "https://example.com"
  },
  {
    "id": "app-logistica",
    "titleKey": "portfolio.projects.logistica.title",
    "descriptionKey": "portfolio.projects.logistica.description",
    "images": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519003722824-192d992a70df?q=80&w=1600&auto=format&fit=crop"
    ],
    "tags": ["React Native", "Node.js", "PostgreSQL"],
    "link": "https://example.com"
  }
]
```

- [ ] **Step 2: Commit data structure**

```bash
git add frontend/src/data/projects.json
git commit -m "feat(portfolio): add projects data structure"
```

---

### Task 2: Localization Keys

**Files:**
- Modify: `frontend/src/locales/es/translation.json`
- Modify: `frontend/src/locales/en/translation.json`

- [ ] **Step 1: Add Spanish translations**

Modify `frontend/src/locales/es/translation.json`:
```json
{
  "nav": { ... },
  "hero": { ... },
  "footer": { ... },
  "portfolio": {
    "title": "Nuestros Proyectos",
    "subtitle": "Explora nuestras soluciones digitales innovadoras.",
    "projects": {
      "ecommerce": {
        "title": "E-commerce Futurista",
        "description": "Plataforma de ventas de alto rendimiento con diseño cyberpunk y transiciones fluidas."
      },
      "logistica": {
        "title": "App de Logística",
        "description": "Sistema de gestión de flotas y seguimiento en tiempo real para optimizar entregas."
      }
    }
  }
}
```

- [ ] **Step 2: Add English translations**

Modify `frontend/src/locales/en/translation.json`:
```json
{
  "nav": { ... },
  "hero": { ... },
  "footer": { ... },
  "portfolio": {
    "title": "Our Projects",
    "subtitle": "Explore our innovative digital solutions.",
    "projects": {
      "ecommerce": {
        "title": "Futuristic E-commerce",
        "description": "High-performance sales platform with cyberpunk design and fluid transitions."
      },
      "logistica": {
        "title": "Logistics App",
        "description": "Fleet management system and real-time tracking to optimize deliveries."
      }
    }
  }
}
```

- [ ] **Step 3: Commit translations**

```bash
git add frontend/src/locales/es/translation.json frontend/src/locales/en/translation.json
git commit -m "fix(locales): add portfolio translation keys"
```

---

### Task 3: ProjectCarousel Component

**Files:**
- Create: `frontend/src/components/ProjectCarousel.jsx`

- [ ] **Step 1: Create the ProjectCarousel component**

Implement `frontend/src/components/ProjectCarousel.jsx` using `framer-motion`:
```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group w-full h-[300px] bg-black/20 rounded-t-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
```

- [ ] **Step 2: Commit the component**

```bash
git add frontend/src/components/ProjectCarousel.jsx
git commit -m "feat(components): add ProjectCarousel component"
```

---

### Task 4: Portfolio Page Implementation

**Files:**
- Create: `frontend/src/pages/Portfolio.jsx`
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Create the Portfolio page**

Create `frontend/src/pages/Portfolio.jsx`:
```jsx
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
```

- [ ] **Step 2: Update App.jsx routes**

Replace the placeholder `Portfolio` component in `frontend/src/App.jsx`:
```jsx
import Portfolio from './pages/Portfolio'; // Import the new component
// Remove: const Portfolio = () => <div className="min-h-screen flex items-center justify-center text-3xl">Portfolio Page (Coming Soon)</div>;
```

- [ ] **Step 3: Commit page changes**

```bash
git add frontend/src/pages/Portfolio.jsx frontend/src/App.jsx
git commit -m "feat(pages): implement portfolio page with project cards"
```

---

### Task 5: Final Polish and Verification

**Files:**
- Modify: `frontend/src/components/Footer.jsx` (optional: ensure links work)

- [ ] **Step 1: Verify all navigation links**

Ensure the Portfolio link in `Navbar.jsx` and `Footer.jsx` correctly points to `/portfolio`.

- [ ] **Step 2: Manual testing**

1. Run the frontend: `npm run dev` in `frontend/` directory.
2. Navigate to `/portfolio`.
3. Test carousel navigation (arrows and dots).
4. Toggle language and verify titles/descriptions change.
5. Check mobile responsiveness.

- [ ] **Step 3: Final commit**

```bash
git commit -m "docs: finalize portfolio implementation"
```
