// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'selvavineesh4@gmail.com', // Admin's email
        pass: 'osip hwmd azwj nymt'   // Admin's email password
    }
});

// API route to handle contact form submissions
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save the contact details to the database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send an email to the admin
        const mailOptions = {
            from: email,
            to: 'connectour10@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Failed to save contact and send message.' });
    }
});

module.exports = router;
