const express = require('express');
const Request = require('../models/Request'); // Adjust if necessary
const multer = require('multer');
const router = express.Router();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST route to store form data
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { type, name, place, description } = req.body;
    const image = req.file ? req.file.path : null; // Check if an image is uploaded

    const newRequest = new Request({
      type,
      name,
      place,
      description,
      image
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request added successfully!' });
  } catch (error) {
    console.error('Error adding request:', error); // Log error for debugging
    res.status(500).json({ error: 'Error adding request' });
  }
});

router.get('/all', async (req, res) => {
  try {
      const requests = await Request.find();
      res.json(requests);
  } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
