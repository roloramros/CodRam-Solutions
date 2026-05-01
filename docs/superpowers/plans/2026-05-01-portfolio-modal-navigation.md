# Plan de Implementación: Navegación en Modal de Portafolio

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir a los usuarios navegar entre las imágenes de un proyecto directamente desde el modal de pantalla completa mediante controles visuales y teclado.

**Architecture:** Se centralizará el estado de la navegación en `Portfolio.jsx` para evitar redundancia de datos. `ImageModal` se convertirá en un componente de visualización puro que recibe la lista de imágenes y el índice actual, notificando cambios de índice hacia arriba.

**Tech Stack:** React, Framer Motion, Lucide React (iconos), Tailwind CSS.

---

### Task 1: Refactorizar el estado en Portfolio.jsx

**Files:**
- Modify: `frontend/src/pages/Portfolio.jsx`

- [ ] **Step 1: Reemplazar el estado `selectedImage` por `modalConfig`**

```javascript
// Antes
const [selectedImage, setSelectedImage] = useState(null);

// Después
const [modalConfig, setModalConfig] = useState({
  isOpen: false,
  images: [],
  currentIndex: 0
});
```

- [ ] **Step 2: Actualizar la función de apertura del modal**

```javascript
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
```

- [ ] **Step 3: Actualizar el renderizado de ImageModal en Portfolio.jsx**

```jsx
<ImageModal 
  isOpen={modalConfig.isOpen} 
  images={modalConfig.images} 
  currentIndex={modalConfig.currentIndex}
  onIndexChange={handleIndexChange}
  onClose={closeModal} 
/>
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Portfolio.jsx
git commit -m "refactor: update portfolio state for modal navigation"
```

---

### Task 2: Actualizar ProjectCarousel para pasar datos del modal

**Files:**
- Modify: `frontend/src/components/ProjectCarousel.jsx`

- [ ] **Step 1: Modificar `onImageClick` para pasar el array y el índice**

```javascript
// En el div contenedor
<div 
  className="..."
  onClick={() => onImageClick && onImageClick(images, currentIndex)}
>
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/ProjectCarousel.jsx
git commit -m "feat: pass image array and index from carousel to modal"
```

---

### Task 3: Refactorizar ImageModal con controles de navegación

**Files:**
- Modify: `frontend/src/components/ImageModal.jsx`

- [ ] **Step 1: Actualizar props e importar iconos**

```javascript
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const ImageModal = ({ isOpen, images, currentIndex, onIndexChange, onClose }) => {
```

- [ ] **Step 2: Implementar lógica de navegación (teclado y funciones)**

```javascript
const nextImage = () => {
  onIndexChange((currentIndex + 1) % images.length);
};

const prevImage = () => {
  onIndexChange((currentIndex - 1 + images.length) % images.length);
};

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex, images, onClose]);
```

- [ ] **Step 3: Implementar UI con flechas y animaciones de deslizamiento**

```jsx
// Dentro del AnimatePresence
<motion.div ... onClick={onClose}>
  {/* Botón Cerrar */}
  <button onClick={onClose} className="absolute top-6 right-6 ..."><X size={32} /></button>

  {/* Flecha Izquierda */}
  {images.length > 1 && (
    <button 
      onClick={(e) => { e.stopPropagation(); prevImage(); }}
      className="absolute left-4 md:left-10 p-3 rounded-full bg-black/50 text-white hover:bg-primary/50 transition-colors z-[110]"
    >
      <ChevronLeft size={40} />
    </button>
  )}

  {/* Imagen con animación de slide */}
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="..."
      onClick={(e) => e.stopPropagation()}
    >
      <img src={images[currentIndex]} className="..." />
      
      {/* Contador */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-mono">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  </AnimatePresence>

  {/* Flecha Derecha */}
  {images.length > 1 && (
    <button 
      onClick={(e) => { e.stopPropagation(); nextImage(); }}
      className="absolute right-4 md:right-10 p-3 rounded-full bg-black/50 text-white hover:bg-primary/50 transition-colors z-[110]"
    >
      <ChevronRight size={40} />
    </button>
  )}
</motion.div>
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/ImageModal.jsx
git commit -m "feat: add navigation controls and animations to ImageModal"
```

---

### Task 4: Verificación Final

- [ ] **Step 1: Probar navegación cíclica** (Primera -> Última -> Primera)
- [ ] **Step 2: Probar teclado** (Flechas y Esc)
- [ ] **Step 3: Verificar que el contador se actualiza correctamente**
- [ ] **Step 4: Verificar que no hay errores de consola al cerrar**
