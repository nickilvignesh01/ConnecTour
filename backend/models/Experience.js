const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true }, // Make sure this is included
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
