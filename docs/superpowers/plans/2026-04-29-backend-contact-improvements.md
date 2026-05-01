# Backend Contact API Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the backend contact API with validation, sanitization, and actual email dispatching.

**Architecture:** Use `express-validator` for middleware-based validation/sanitization and `nodemailer` for SMTP email delivery. Centralized error handling for robustness.

**Tech Stack:** Node.js, Express, express-validator, nodemailer, dotenv.

---

### Task 1: Install Dependencies

**Files:**
- Modify: `backend/package.json`

- [ ] **Step 1: Install express-validator**

Run: `npm install express-validator` in `backend` directory.

- [ ] **Step 2: Verify installation**

Check `backend/package.json` for `express-validator`.

- [ ] **Step 3: Commit**

```bash
git add backend/package.json backend/package-lock.json
git commit -m "chore: install express-validator"
```

### Task 2: Update Environment Example

**Files:**
- Modify: `backend/.env.example`

- [ ] **Step 1: Add email environment variables**

```text
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@example.com
```

- [ ] **Step 2: Commit**

```bash
git add backend/.env.example
git commit -m "docs: update .env.example with email variables"
```

### Task 3: Setup Nodemailer Transporter

**Files:**
- Modify: `backend/server.js`

- [ ] **Step 1: Update imports and initialize transporter**

```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this or make it configurable via env
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add backend/server.js
git commit -m "feat: setup nodemailer transporter"
```

### Task 4: Implement Validation and Email Logic

**Files:**
- Modify: `backend/server.js`

- [ ] **Step 1: Update /api/contact route with validation and email sending**

```javascript
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').escape(),
    body('service').optional().trim().escape(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, service, message } = req.body;

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `New Contact Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Service: ${service || 'Not specified'}
          Message: ${message}
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      res.status(200).json({ success: 'Message sent successfully. We will contact you soon.' });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
);
```

- [ ] **Step 2: Commit**

```bash
git add backend/server.js
git commit -m "feat: add validation and email dispatch to contact route"
```

### Task 5: Add Global Error Handler

**Files:**
- Modify: `backend/server.js`

- [ ] **Step 1: Add error handling middleware at the end**

```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

- [ ] **Step 2: Commit**

```bash
git add backend/server.js
git commit -m "feat: add global error handler"
```

### Task 6: Verification

- [ ] **Step 1: Start the server**

Run: `node server.js` in `backend` directory.
Expected: "Server running on port 5000"

- [ ] **Step 2: Verify validation (Failure Case)**

Use a tool like `curl` or Postman to send an invalid request.
Run: `curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d '{"name": ""}'`
Expected: `400 Bad Request` with error details.
