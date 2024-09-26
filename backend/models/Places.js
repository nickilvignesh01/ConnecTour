// models/Place.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    locationUrl: { type: String, required: true }, // Added locationUrl for hotels
    description: { type: String, required: true }  // Added description for hotels
});

const foodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    locationUrl: { type: String, required: true }, // Added locationUrl for foods
    description: { type: String, required: true }  // Added description for foods
});

const guideSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    locationUrl: { type: String, required: true }, // Added locationUrl for guides
    description: { type: String, required: true }  // Added description for guides
});

const hiddenPlaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    locationUrl: { type: String, required: true }, // Added locationUrl for hidden places
    description: { type: String, required: true }  // Added description for hidden places
});

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    hotels: [hotelSchema],           // Updated to include hotels schema
    foods: [foodSchema],             // Updated to include foods schema
    guides: [guideSchema],           // Updated to include guides schema
    hiddenPlaces: [hiddenPlaceSchema] // Updated to include hidden places schema
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
