const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Experience = require('./models/Experience');
const Place = require('./models/Place');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// MongoDB connection
mongoose.connect('mongodb+srv://vineesh:Vineesh%4010@tourconnect.c6ihfmz.mongodb.net/connectour?retryWrites=true&w=majority&appName=tourconnect', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Setup file storage with Multer for image uploads
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

const upload = multer({ storage: storage });

// Admin credentials (Hardcoded for demo)
const admins = [
    { email: 'vineesh10@gmail.com', password: 'vineesh' },
    { email: 'vignesh@gmail.com', password: 'vignesh' }
];

// User schema and model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Routes

// Fetch all experiences
app.get('/api/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find();
        const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/';
        const experiencesWithFullUrl = experiences.map(experience => ({
            ...experience._doc,
            imageUrl: baseUrl + experience.imageUrl.split('/').pop(), // Combine base URL with the image filename
        }));
        res.json(experiencesWithFullUrl);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experiences.' });
    }
});

// Add a new experience
app.post('/api/experiences', upload.single('image'), async (req, res) => {
    try {
        const { title, description, rating, email } = req.body; // Include email in the request
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // Full URL for the image

        // Check if required fields are present
        if (!title || !description || !rating || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create the new experience including email
        const newExperience = new Experience({ title, description, rating, imageUrl, email });
        await newExperience.save();
        res.status(201).json({ message: 'Experience added successfully', experience: newExperience });
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Send back the error message
    }
});


// Fetch place details by placeId
app.get('/api/places/:placeId', async (req, res) => {
    const placeId = req.params.placeId;

    try {
        const place = await Place.findOne({ name: { $regex: placeId, $options: 'i' } });
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        console.error('Error fetching place:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new place
app.post('/api/places', async (req, res) => {
    const { name, description, imageUrl, hotels, foods, guides, hiddenPlaces } = req.body;

    try {
        const newPlace = new Place({ name, description, imageUrl, hotels, foods, guides, hiddenPlaces });
        await newPlace.save();
        res.status(201).json({ message: 'Place created successfully', place: newPlace });
    } catch (error) {
        console.error('Error creating place:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a place
app.put('/api/places/:placeId', async (req, res) => {
    const placeId = req.params.placeId;
    const updates = req.body;

    try {
        const updatedPlace = await Place.findOneAndUpdate({ name: { $regex: placeId, $options: 'i' } }, updates, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json({ message: 'Place updated successfully', place: updatedPlace });
    } catch (error) {
        console.error('Error updating place:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a place
app.delete('/api/places/:placeId', async (req, res) => {
    const placeId = req.params.placeId;

    try {
        const deletedPlace = await Place.findOneAndDelete({ name: { $regex: placeId, $options: 'i' } });
        if (!deletedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json({ message: 'Place deleted successfully' });
    } catch (error) {
        console.error('Error deleting place:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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

// In your Express server
app.get('/api/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
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

// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
