const express = require('express');
const router = express.Router();
const Places = require('./models/Places');

// Get all places
router.get('/', async (req, res) => {
    try {
        const places = await Places.find();
        res.json(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a place by ID
router.get('/:id', async (req, res) => {
    try {
        const place = await Places.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        console.error('Error fetching place:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new place
router.post('/', async (req, res) => {
    const { name, description, location, imageUrl, category } = req.body;

    const newPlace = new Places({
        name,
        description,
        location,
        imageUrl,
        category,
    });

    try {
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (error) {
        console.error('Error adding place:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a place
router.put('/:id', async (req, res) => {
    try {
        const updatedPlace = await Places.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(updatedPlace);
    } catch (error) {
        console.error('Error updating place:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a place
router.delete('/:id', async (req, res) => {
    try {
        const deletedPlace = await Places.findByIdAndRemove(req.params.id);
        if (!deletedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json({ message: 'Place removed' });
    } catch (error) {
        console.error('Error deleting place:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;
