const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import Models
const Experience = require('./models/Experience');
const Place = require('./models/Places');
const User = require('./models/User');
const Request = require('./models/Request');
const RequestModel = require('./models/Request'); // Ensure this line is present at the top

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const requestRoutes = require('./routes/requests');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// MongoDB connection
mongoose.connect(
  'mongodb+srv://vineesh:Vineesh%4010@tourconnect.c6ihfmz.mongodb.net/connectour?retryWrites=true&w=majority&appName=tourconnect',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Setup Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin credentials (Hardcoded for demo)
const admins = [
  { email: 'vineesh10@gmail.com', password: 'vineesh' },
  { email: 'vignesh@gmail.com', password: 'vignesh' }
];

// Experience Routes
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/';

    const experiencesWithFullUrl = experiences.map(experience => {
      const imageUrl = experience.imageUrl || '';
      return {
        ...experience._doc,
        imageUrl: baseUrl + path.basename(imageUrl)
      };
    });

    res.json(experiencesWithFullUrl);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences.' });
  }
});

app.post('/api/experiences', upload.single('image'), async (req, res) => {
  try {
    const { title, description, rating, email } = req.body;

    if (!title || !description || !rating || !email || !req.file) {
      return res.status(400).json({ message: 'All fields are required, including image.' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const newExperience = new Experience({ title, description, rating, imageUrl, email });
    await newExperience.save();
    res.status(201).json({ message: 'Experience added successfully', experience: newExperience });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Place Routes
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Error fetching places' });
  }
});

app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/places', async (req, res) => {
  try {
    const { name, description, location, imageUrl, category, hotels, foods, guides, hiddenPlaces } = req.body;

    if (!name || !description || !imageUrl || !location || !category) {
      return res.status(400).json({ message: 'Name, description, location, imageUrl, and category are required.' });
    }

    const newPlace = new Place({
      name,
      description,
      location,
      imageUrl,
      category,
      hotels,
      foods,
      guides,
      hiddenPlaces
    });
    await newPlace.save();
    res.status(201).json({ message: 'Place added successfully', place: newPlace });
  } catch (error) {
    console.error('Error adding place:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
app.delete('/api/requests/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRequest = await RequestModel.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ message: 'Error deleting request' });
  }
});

// User Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Fetch User by Email
app.get('/api/users/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
      return res.json({ message: 'Admin login successful', role: 'admin' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'User login successful', role: 'user' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

// Contact and Booking Routes
app.use('/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/requests', requestRoutes); 

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
