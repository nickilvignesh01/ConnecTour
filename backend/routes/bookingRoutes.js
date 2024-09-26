// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// API to handle booking submission
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, date, packageName } = req.body;

        // Create and save the booking in the database
        const newBooking = new Booking({ name, email, phone, date, packageName });

        await newBooking.save();
        res.status(201).json({ message: 'Booking saved successfully' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ error: 'Failed to save booking' });
    }
});

// Route to get all bookings
router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
