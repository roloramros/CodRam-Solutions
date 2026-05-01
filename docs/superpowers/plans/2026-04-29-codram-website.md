# CodRam Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, multi-page software agency website for CodRam with a React frontend and Express backend, optimized for performance and production deployment.

**Architecture:** Monorepo-style structure with separate `frontend` and `backend` directories. Uses React Router for MPA navigation and Framer Motion for high-end animations. Backend handles contact form submissions and email dispatch.

**Tech Stack:** React (Vite), Tailwind CSS, Framer Motion, Express.js, Nodemailer.

---

### Task 1: Project Initialization & Directory Structure

**Files:**
- Create: `package.json` (Root)
- Create: `frontend/package.json`
- Create: `backend/package.json`

- [x] **Step 1: Create root directory and initialize frontend with Vite**
Run: `npm create vite@latest frontend -- --template react`
Expected: `frontend` folder created with Vite + React boilerplate.

- [x] **Step 2: Initialize backend directory**
Run: `mkdir backend && cd backend && npm init -y`
Expected: `backend` folder with `package.json`.

- [x] **Step 3: Setup root package.json for workspace management**
```json
{
  "name": "codram-web",
  "private": true,
  "scripts": {
    "install-all": "npm install && cd frontend && npm install && cd ../backend && npm install",
    "dev-frontend": "cd frontend && npm run dev",
    "dev-backend": "cd backend && npm run dev"
  }
}
```

- [x] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initial project structure"
```

---

### Task 2: Tailwind CSS & Theme Configuration

**Files:**
- Modify: `frontend/tailwind.config.js`
- Modify: `frontend/src/index.css`

- [x] **Step 1: Install Tailwind CSS in frontend**
Run: `cd frontend && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`

- [x] **Step 2: Configure CodRam Theme Colors**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00AEEF",
        navy: "#071426",
        black: "#020812",
        white: "#FFFFFF",
        gray: "#BFC9D4",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [x] **Step 3: Add Tailwind directives and global dark mode styles**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-black text-gray antialiased;
}

h1, h2, h3, h4 {
  @apply text-white font-bold;
}
```

- [x] **Step 4: Commit**
```bash
git add frontend/tailwind.config.js frontend/src/index.css
git commit -m "style: configure tailwind theme and dark mode"
```

---

### Task 3: Core Layout Components (Navbar & Footer)

**Files:**
- Create: `frontend/src/components/Navbar.jsx`
- Create: `frontend/src/components/Footer.jsx`
- Create: `frontend/src/components/Layout.jsx`

- [x] **Step 1: Implement Glassmorphism Navbar**
- [x] **Step 2: Implement Layout wrapper with Framer Motion transitions**
- [x] **Step 3: Commit**
```bash
git add frontend/src/components
git commit -m "feat: add navbar and layout components"
```

---

### Task 4: Home Page & Hero Section

**Files:**
- Create: `frontend/src/pages/Home.jsx`
- Modify: `frontend/src/App.jsx`

- [x] **Step 1: Implement Futuristic Hero Section**
- [x] **Step 2: Commit**
```bash
git add frontend/src/pages/Home.jsx
git commit -m "feat: implement home page hero section"
```

---

### Task 5: Backend Contact API

**Files:**
- Create: `backend/server.js`
- Create: `backend/.env`

- [x] **Step 1: Setup Express server with Nodemailer**
- [x] **Step 2: Commit**
```bash
git add backend/
git commit -m "feat: setup backend api for contact form"
```

---

### Task 6: Deployment Config (Nginx & PM2)

**Files:**
- Create: `deployment/nginx.conf`
- Create: `ecosystem.config.js`

- [ ] **Step 1: Write Nginx Reverse Proxy Example**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/codram/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] **Step 2: Commit**
```bash
git add deployment/ ecosystem.config.js
git commit -m "deploy: add nginx and pm2 configurations"
```
