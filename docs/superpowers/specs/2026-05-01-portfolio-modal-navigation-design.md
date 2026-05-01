# Especificación de Diseño: Navegación en Modal de Portafolio

**Fecha:** 2026-05-01
**Estado:** Borrador
**Autor:** Gemini CLI

## 1. Problema
Actualmente, el portafolio permite abrir una imagen en pantalla completa a través de `ImageModal`, pero para ver la siguiente imagen del mismo proyecto, el usuario debe cerrar el modal, avanzar el carrusel en la vista de lista y volver a abrir el modal. Esto rompe el flujo de navegación y es ineficiente.

## 2. Solución Propuesta
Mejorar `ImageModal` para que soporte la navegación interna entre las imágenes de un proyecto específico, permitiendo al usuario desplazarse sin salir de la vista de pantalla completa.

## 3. Cambios Técnicos

### 3.1. Estado en `Portfolio.jsx`
Se reemplazará `selectedImage` (un string) por un objeto de estado más robusto:
```javascript
const [modalConfig, setModalConfig] = useState({
  isOpen: false,
  images: [],
  currentIndex: 0
});
```

### 3.2. Actualización de `ProjectCarousel`
El componente `ProjectCarousel` deberá pasar tanto el array de imágenes como el índice actual cuando se haga clic en una imagen.
*   **Prop nueva:** `onImageClick(images, index)`

### 3.3. Refactorización de `ImageModal`
El componente ahora recibirá:
*   `images`: Array de strings (URLs).
*   `currentIndex`: El índice de la imagen a mostrar.
*   `onIndexChange`: Función para actualizar el índice desde el modal.
*   `onClose`: Para cerrar el modal.

**Nuevas características del modal:**
*   Botones laterales (`ChevronLeft`, `ChevronRight`) para navegar.
*   Soporte para flechas del teclado (`ArrowLeft`, `ArrowRight`).
*   Animaciones de transición entre imágenes usando `AnimatePresence` (deslizamiento lateral).
*   Contador visual opcional (ej. "1 / 5").

## 4. Diseño Visual (UI/UX)
*   Las flechas de navegación se ubicarán en los extremos laterales de la pantalla.
*   Tendrán un fondo circular semi-transparente para asegurar visibilidad sobre imágenes claras u oscuras.
*   El botón de cierre (`X`) permanecerá en la esquina superior derecha.

## 5. Casos de Prueba
1.  Abrir el modal desde la primera imagen y presionar "Siguiente" -> debe mostrar la segunda imagen.
2.  Llegar a la última imagen y presionar "Siguiente" -> debe volver a la primera (bucle).
3.  Usar las flechas del teclado -> la imagen debe cambiar correspondientemente.
4.  Cerrar el modal y abrir otro proyecto -> las imágenes mostradas deben ser las del nuevo proyecto.
