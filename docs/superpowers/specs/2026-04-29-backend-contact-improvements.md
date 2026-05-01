# Design Doc: Backend Contact API Improvements

## 1. Overview
Enhance the existing `/api/contact` endpoint to include input validation, sanitization, and actual email dispatching using Nodemailer.

## 2. Architecture
- **Framework:** Express.js
- **Validation:** `express-validator`
- **Email Service:** `nodemailer`
- **Error Handling:** Centralized middleware

## 3. Implementation Details

### 3.1 Validation & Sanitization
Using `express-validator`, the following rules will be applied:
- `name`: `.trim().notEmpty().escape()`
- `email`: `.isEmail().normalizeEmail().trim()`
- `message`: `.trim().notEmpty().escape()`

### 3.2 Email Configuration
- **Transporter:** SMTP setup using environment variables.
- **Variables:**
  - `EMAIL_USER`: SMTP username
  - `EMAIL_PASS`: SMTP password
  - `EMAIL_TO`: Recipient address

### 3.3 Data Flow
1. Request received at `POST /api/contact`.
2. `express-validator` middleware checks and sanitizes body.
3. If validation fails, return `400` with errors.
4. Nodemailer attempts to send email.
5. If successful, return `200 Success`.
6. If email fails or other error occurs, pass to global error handler.

### 3.4 Error Handling
A global error handler middleware will be added:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

## 4. Verification Plan
- Start the server and ensure it listens on the configured port.
- Test validation by sending incomplete or malformed data.
- (Manual) Verify email dispatch with real credentials if available, or mock the transporter.
