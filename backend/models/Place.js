const mongoose = require('mongoose');

// Define the Place schema
const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    hotels: [
        {
            name: { type: String, required: true },
            description: { type: String },
            imageUrl: { type: String },
        }
    ],
    foods: [
        {
            name: { type: String, required: true },
            description: { type: String },
            imageUrl: { type: String },
        }
    ],
    guides: [
        {
            name: { type: String, required: true },
            contact: { type: String },
        }
    ],
    hiddenPlaces: [
        {
            name: { type: String, required: true },
            description: { type: String },
            imageUrl: { type: String },
        }
    ]
}, { timestamps: true });

// Create the Place model
const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
