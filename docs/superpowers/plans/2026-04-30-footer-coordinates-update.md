# Footer Coordinates Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the physical location coordinates in the website footer and its corresponding Google Maps link in both English and Spanish.

**Architecture:** Update the internationalization (i18n) JSON files with the new address and map link keys. Verify the React component correctly renders these values.

**Tech Stack:** React, i18next, JSON.

---

### Task 1: Update Spanish Translations

**Files:**
- Modify: `frontend/src/locales/es/translation.json`

- [ ] **Step 1: Update the address and map link in Spanish**

Replace the existing `footer.address` and `footer.map_link` with the new coordinates and Google Maps search URL.

```json
{
  "footer": {
    "description": "Agencia de software premium especializada en soluciones digitales futuristas, escalables y de alto rendimiento.",
    "links": "Enlaces Rápidos",
    "services": "Servicios",
    "contact": "Contáctanos",
    "hq": "Sede Digital",
    "address": "20°00'51.2\"N 75°50'04.7\"W",
    "map_link": "https://www.google.com/maps/search/?api=1&query=20.014222,-75.834639",
    "rights": "Todos los derechos reservados."
  }
}
```

- [ ] **Step 2: Commit changes**

```bash
git add frontend/src/locales/es/translation.json
git commit -m "feat(i18n): update footer coordinates and map link in Spanish"
```

---

### Task 2: Update English Translations

**Files:**
- Modify: `frontend/src/locales/en/translation.json`

- [ ] **Step 1: Add the address and map link in English**

Add the missing `footer.address` and `footer.map_link` keys to the English translation file.

```json
{
  "footer": {
    "description": "Premium software agency specializing in futuristic, scalable, and high-performance digital solutions.",
    "links": "Quick Links",
    "services": "Services",
    "contact": "Contact Us",
    "hq": "Digital Headquarters",
    "address": "20°00'51.2\"N 75°50'04.7\"W",
    "map_link": "https://www.google.com/maps/search/?api=1&query=20.014222,-75.834639",
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 2: Commit changes**

```bash
git add frontend/src/locales/en/translation.json
git commit -m "feat(i18n): add footer coordinates and map link in English"
```

---

### Task 3: Verification

**Files:**
- Verify: `frontend/src/components/Footer.jsx`

- [ ] **Step 1: Verify Footer component logic**

Ensure the `Footer.jsx` component uses the translation keys correctly.

```jsx
// snippet from frontend/src/components/Footer.jsx
<a 
  href={t('footer.map_link')} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="flex items-start space-x-3 text-sm text-gray hover:text-primary transition-colors group"
>
  <MapPin size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
  <div className="flex flex-col">
    <span className="font-semibold text-white">{t('footer.hq')}</span>
    <span>{t('footer.address')}</span>
  </div>
</a>
```

- [ ] **Step 2: Manual Verification**

1. Run the frontend: `cd frontend && npm run dev` (or equivalent).
2. Check the footer in both English and Spanish.
3. Confirm text is: `20°00'51.2"N 75°50'04.7"W`.
4. Confirm clicking the link opens Google Maps at `20.014222, -75.834639`.
