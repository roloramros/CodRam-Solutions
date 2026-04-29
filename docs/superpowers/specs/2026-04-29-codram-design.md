# Design Specification: CodRam – Custom Software Solutions Website

**Date:** 2026-04-29
**Project:** CodRam Web (Premium Software Agency Website)
**Status:** Approved Design

## 1. Project Overview
CodRam is a custom software development company. The goal is to build a premium, modern, and futuristic Multi-Page Application (MPA) that establishes professional trust and converts visitors into clients.

## 2. Technical Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Router.
- **Backend:** Node.js, Express.js.
- **Tools:** Nodemailer (Contact form), Lucide React (Icons).
- **Deployment:** Linux VPS (Ubuntu), Nginx (Reverse Proxy), PM2 (Process Manager).

## 3. Visual Identity & UI/UX
- **Theme:** Dark Mode (Futuristic/Corporate).
- **Colors:**
  - Primary Blue: `#00AEEF` (Glows, Buttons, Accents)
  - Dark Navy: `#071426` (Secondary backgrounds)
  - Deep Black: `#020812` (Main background)
  - White: `#FFFFFF` (Headings)
  - Soft Gray: `#BFC9D4` (Body text)
- **Style Elements:**
  - Glassmorphism for cards and navbar.
  - Circuit-line background effects.
  - Smooth page transitions and scroll-reveal animations via Framer Motion.
  - Mobile-first, fully responsive design (360px to 1920px).

## 4. Site Structure (Multi-Page)
1.  **Home:** Impactful Hero, Services overview, Why Choose Us, Final CTA.
2.  **Services:** Detailed cards for Desktop, Mobile, Web, Automation, Bots, etc.
3.  **Portfolio:** Showcase of projects (Inventory systems, Apps, Dashboards).
4.  **About:** Company mission and development process (Timeline).
5.  **Benefits:** Key value propositions (Security, Scalability, Delivery).
6.  **Contact:** Professional form with backend validation and email notifications.

## 5. Backend Logic
- **API Endpoint:** `/api/contact` (POST).
- **Functionality:** Input validation, sanitization, and automated email delivery.
- **Scalability:** JSON-based data structure prepared for future PostgreSQL integration.

## 6. SEO & Performance
- Semantic HTML tags.
- Dynamic Meta titles and descriptions per page.
- Image optimization and lazy loading.
- Clean URL structure.

## 7. Deployment Configuration
- Nginx configuration for reverse proxy.
- PM2 configuration for process management.
- `.env` file for environment variables management.

## 8. Development Phases
- **Phase 1:** Environment setup and Tailwind configuration.
- **Phase 2:** Core components (Navbar, Footer, Layout).
- **Phase 3:** Frontend page development (Home, Services, etc.).
- **Phase 4:** Backend API and Email integration.
- **Phase 5:** Final styling, animations, and SEO.
- **Phase 6:** Deployment readiness (Nginx/PM2 configs).
