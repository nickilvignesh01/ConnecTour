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
    name: String,
    description: String,
    imageUrl: String, // URL for the main place image
    hotels: [{
        name: String,
        description: String,
        image: String,
        price: String // Optional field for price
    }],
    foods: [{
        name: String,
        description: String,
        image: String,
        price: String // Optional field for price
    }],
    guides: [{
        name: String,
        description: String,
        image: String,
        price: String // Optional field for guide price
    }],
    hiddenPlaces: [{ // Hidden places array
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
const admin = {
    email: 'vineesh10@gmail.com',
    password: 'vineesh'
};

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


// Route to add a new item (hotel, food, guide, or hidden place) to a place
app.post('/api/add', async (req, res) => {
    const { placeId, type, name, description, image, price } = req.body;

    try {
        // Find the place by name (case-insensitive)
        const place = await Place.findOne({ name: { $regex: placeId, $options: 'i' } });
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        // Add the new item to the appropriate array based on type
        if (type === 'hotel') {
            place.hotels.push({ name, description, image, price });
        } else if (type === 'food') {
            place.foods.push({ name, description, image, price });
        } else if (type === 'guide') {
            place.guides.push({ name, description, image, price });
        } else if (type === 'hiddenPlace') {
            place.hiddenPlaces.push({ name, description, image });
        } else {
            return res.status(400).json({ message: 'Invalid type' });
        }

        // Save the updated place
        await place.save();
        res.status(201).json({ message: 'Item added successfully', place });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'An error occurred while adding the item' });
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
