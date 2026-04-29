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
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message)' });
  }
  
  // In a real scenario, you'd configure Nodemailer here.
  // For now, we'll log the submission and return success.
  console.log('New Contact Submission:', { name, email, service, message });
  
  res.status(200).json({ success: 'Message received successfully. We will contact you soon.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
