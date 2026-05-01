# Diseño: Mejoras de Visualización en Portafolio

Este documento detalla el diseño para mejorar la experiencia del portafolio, solucionando el problema de la proporción de las imágenes y la limitación de las descripciones.

## 1. Problemas Identificados
- **Imágenes:** El uso de `object-cover` en un ratio 16:9 corta imágenes verticales (móvil), ocultando contenido importante.
- **Descripciones:** Las descripciones largas están truncadas permanentemente a 2 líneas (`line-clamp-2`), impidiendo que el usuario lea los detalles técnicos de los proyectos.

## 2. Solución Propuesta

### A. Adaptabilidad de Imágenes (Miniatura y Modal)
- **Miniaturas (`ProjectCarousel.jsx`):** 
  - Se mantendrá el contenedor de tamaño fijo para preservar la estética de la cuadrícula.
  - Se usará `object-contain` en lugar de `object-cover`.
  - Se añadirá un efecto de fondo (imagen desenfocada o fondo oscuro) para rellenar los espacios vacíos en imágenes con proporciones distintas al contenedor.
  - Al hacer clic en la imagen, se abrirá un modal.
- **Modal de Imagen (`ImageModal.jsx`):**
  - Componente nuevo para mostrar la imagen en su tamaño y proporción original.
  - Soporte para navegación entre imágenes (si el proyecto tiene varias).
  - Cierre mediante clic fuera, botón de cerrar o tecla `Esc`.

### B. Descripciones Expandibles (`Portfolio.jsx`)
- Se implementará un estado local para rastrear qué proyectos están expandidos.
- El texto mostrará el botón "...ver más" (o "ver menos") que alternará la clase `line-clamp-2`.
- Transición suave al expandir/contraer.

## 3. Especificaciones Técnicas

### Componentes y Cambios
1. **`frontend/src/components/ProjectCarousel.jsx`**
   - Añadir prop `onImageClick` para abrir el modal.
   - Ajustar estilos CSS para `object-contain`.
2. **`frontend/src/components/ImageModal.jsx` (NUEVO)**
   - Utilizar `framer-motion` para animaciones.
   - Implementar controles de navegación y cierre.
3. **`frontend/src/pages/Portfolio.jsx`**
   - Añadir lógica de estado para `expandedProjects` (un Set o un objeto de IDs).
   - Añadir lógica de estado para `selectedImage` para el modal.
   - Renderizar `ImageModal` cuando una imagen esté seleccionada.

### Estilos (Tailwind)
- Modal Overlay: `fixed inset-0 bg-black/90 z-50 flex items-center justify-center`
- Botón Expandir: `text-primary hover:underline cursor-pointer ml-1 inline-block font-medium`

## 4. Criterios de Aceptación
- Las imágenes de móvil se ven completas dentro de la tarjeta del portafolio.
- Al hacer clic en cualquier imagen, se abre un modal con la imagen a tamaño completo.
- El botón "...ver más" permite leer la descripción completa de los proyectos de instrumentación y logística.
- La navegación en el carrusel sigue funcionando tanto en la miniatura como en el modal (opcional, pero recomendado).
