# Specification: Portfolio Implementation with Carousels

This document outlines the design and implementation details for the Portfolio page of the CodRam website, as approved by the user.

## 1. Overview
The goal is to replace the current placeholder Portfolio page with a functional, visually appealing showcase of projects. Each project will support multiple images navigated via a carousel (slider) interface.

## 2. Data Management
Projects will be managed through a centralized JSON file to decouple content from component logic, making it easy to add or update projects.

- **File Path:** `frontend/src/data/projects.json`
- **Schema:**
  ```json
  [
    {
      "id": "unique-id",
      "titleKey": "portfolio.projects.project1.title",
      "descriptionKey": "portfolio.projects.project1.description",
      "images": ["/projects/p1-1.jpg", "/projects/p1-2.jpg"],
      "tags": ["React", "Tailwind", "Node.js"],
      "link": "https://example.com"
    }
  ]
  ```

## 3. UI/UX Design
The portfolio will consist of a vertical list of project "cards".

### Project Card Components:
- **Carousel Header:** A swipeable/clickable image slider showing project screenshots.
  - Interactive arrows (left/right).
  - Pagination dots (indicators).
  - Smooth transitions using `framer-motion`.
- **Content Body:**
  - Title and Description (translated via i18next).
  - Technology tags.
  - External link button (optional).

### Visual Style:
- Dark theme consistent with the rest of the site.
- Primary color accents (`#00f2ff` / `text-primary`).
- Glassmorphism effects for card containers.

## 4. Technical Stack
- **Framework:** React.
- **Styling:** Tailwind CSS.
- **Animations/Carousel:** `framer-motion` (already present in the project).
- **Internationalization:** `react-i18next`.

## 5. Implementation Steps
1. Create the `projects.json` data structure.
2. Update translation files (`en/translation.json`, `es/translation.json`) with project keys.
3. Develop the `ProjectCarousel` component.
4. Update `frontend/src/pages/Portfolio.jsx` (currently a placeholder in `App.jsx`) to map through the projects and render cards.
5. Ensure responsive design for mobile and desktop.

## 6. Success Criteria
- Users can navigate between multiple images for each project.
- Content is fully localized in English and Spanish.
- Adding a new project only requires updating the JSON and translation files.
- The UI is smooth and performance-optimized.
