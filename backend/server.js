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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
