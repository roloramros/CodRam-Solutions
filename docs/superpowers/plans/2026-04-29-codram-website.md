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

- [ ] **Step 1: Create root directory and initialize frontend with Vite**
Run: `npm create vite@latest frontend -- --template react`
Expected: `frontend` folder created with Vite + React boilerplate.

- [ ] **Step 2: Initialize backend directory**
Run: `mkdir backend && cd backend && npm init -y`
Expected: `backend` folder with `package.json`.

- [ ] **Step 3: Setup root package.json for workspace management**
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

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initial project structure"
```

---

### Task 2: Tailwind CSS & Theme Configuration

**Files:**
- Modify: `frontend/tailwind.config.js`
- Modify: `frontend/src/index.css`

- [ ] **Step 1: Install Tailwind CSS in frontend**
Run: `cd frontend && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`

- [ ] **Step 2: Configure CodRam Theme Colors**
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

- [ ] **Step 3: Add Tailwind directives and global dark mode styles**
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

- [ ] **Step 4: Commit**
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

- [ ] **Step 1: Implement Glassmorphism Navbar**
```jsx
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="text-primary font-bold text-2xl">CodRam</Link>
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <Link to="/services" className="hover:text-primary transition">Services</Link>
        <Link to="/portfolio" className="hover:text-primary transition">Portfolio</Link>
        <Link to="/contact" className="hover:text-primary transition">Contact</Link>
      </div>
      <button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_#00AEEF] transition">
        Request Quote
      </button>
    </div>
  </nav>
);

export default Navbar;
```

- [ ] **Step 2: Implement Layout wrapper with Framer Motion transitions**
```jsx
import { motion } from 'framer-motion';

const Layout = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="pt-20"
  >
    {children}
  </motion.div>
);

export default Layout;
```

- [ ] **Step 3: Commit**
```bash
git add frontend/src/components
git commit -m "feat: add navbar and layout components"
```

---

### Task 4: Home Page & Hero Section

**Files:**
- Create: `frontend/src/pages/Home.jsx`
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Implement Futuristic Hero Section**
```jsx
const Hero = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
    <div className="text-center z-10">
      <h1 className="text-5xl md:text-7xl mb-6">Your vision, transformed into <span className="text-primary">software</span></h1>
      <p className="text-xl max-w-2xl mx-auto mb-10 text-gray">We build custom digital solutions that help businesses grow faster.</p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button className="bg-primary text-black px-8 py-3 rounded-lg font-bold">View Services</button>
        <button className="border border-primary text-primary px-8 py-3 rounded-lg font-bold">Contact Now</button>
      </div>
    </div>
  </section>
);
```

- [ ] **Step 2: Commit**
```bash
git add frontend/src/pages/Home.jsx
git commit -m "feat: implement home page hero section"
```

---

### Task 5: Backend Contact API

**Files:**
- Create: `backend/server.js`
- Create: `backend/.env`

- [ ] **Step 1: Setup Express server with Nodemailer**
```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;
  // Basic validation
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  
  // Logic for email dispatch...
  res.status(200).json({ success: 'Message received' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

- [ ] **Step 2: Commit**
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
