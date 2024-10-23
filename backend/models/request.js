const mongoose = require('mongoose');

// Define the Request schema
const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // This field is mandatory
  },
  name: {
    type: String,
    required: true, // This field is mandatory
  },
  place: {
    type: String,
    required: true, // This field is mandatory
  },
  description: {
    type: String,
    required: true, // This field is mandatory
  },
  image: {
    type: String, // Store image path or base64 string
    required: true, // This field is mandatory
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time when the request is created
  },
});

// Export the model
module.exports = mongoose.model('Request', RequestSchema);
