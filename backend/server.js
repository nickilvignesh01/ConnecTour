const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://vineesh:Vineesh%4010@tourconnect.c6ihfmz.mongodb.net/connectour?retryWrites=true&w=majority&appName=tourconnect', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Place schema and model
const PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    hotels: [{
        name: String,
        description: String,
        image: String,
        price: String
    }],
    foods: [{
        name: String,
        description: String,
        image: String,
        price: String
    }],
    guides: [{
        name: String,
        description: String,
        image: String,
        price: String
    }],
    hiddenPlaces: [{
        name: String,
        description: String,
        image: String
    }]
});

const Place = mongoose.model('Place', PlaceSchema);

// Define User schema and model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Hardcoded admin credentials
const admins = [
    {
        email: 'vineesh10@gmail.com',
        password: 'vineesh'
    },
    {
        email: 'vignesh@gmail.com',
        password: 'vignesh'
    }
];


// Route to fetch place details by placeId
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

// Route to add a new place
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

// Route to update a place
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

// Route to delete a place
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

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Admin login check
        if (email === admin.email && password === admin.password) {
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

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
