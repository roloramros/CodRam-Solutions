# Task 3 Core Layout Components Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix issues in Footer and Navbar components identified during spec compliance review.

**Architecture:** Minimal surgical changes to existing React components using Tailwind CSS and standard React hooks.

**Tech Stack:** React, Tailwind CSS, Lucide React (for icons)

---

### Task 1: Fix typo in Footer

**Files:**
- Modify: `frontend/src/components/Footer.jsx`

- [ ] **Step 1: Replace `md:row` with `md:flex-row` in Footer.jsx**

```jsx
// frontend/src/components/Footer.jsx

// OLD
<div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-xs text-gray/50">

// NEW
<div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray/50">
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/Footer.jsx
git commit -m "fix(footer): correct typo md:row to md:flex-row"
```

### Task 2: Fix Hardcoded Color in Navbar

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`

- [ ] **Step 1: Replace `#00AEEF` with `theme(colors.primary)` in Navbar.jsx**

```jsx
// frontend/src/components/Navbar.jsx

// OLD
<button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_#00AEEF] transition-all duration-300">

// NEW
<button className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_theme(colors.primary)] transition-all duration-300">
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/Navbar.jsx
git commit -m "refactor(navbar): use theme variable for cta button hover shadow"
```

### Task 3: Implement Mobile Navigation in Navbar

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`

- [ ] **Step 1: Add state for mobile menu and hamburger icon**

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-primary font-bold text-2xl tracking-tighter" onClick={() => setIsOpen(false)}>CodRam</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:block bg-primary text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_theme(colors.primary)] transition-all duration-300">
            Request Quote
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 py-6 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-white text-lg hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-primary text-black px-6 py-3 rounded-full font-bold">
            Request Quote
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/Navbar.jsx
git commit -m "feat(navbar): implement mobile navigation menu"
```

### Task 4: Final Verification

- [ ] **Step 1: Check for lint/type errors**

Run: `cd frontend && npm run lint` (or similar)

- [ ] **Step 2: Verify changes visually (Conceptual)**
- Footer uses `md:flex-row`
- Navbar CTA uses theme variable
- Mobile menu toggles correctly and shows links
