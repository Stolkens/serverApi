const mongoose = require('mongoose');

const testimonialsScheme = new mongoose.SchemaType({
  author: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model('Testimonials', testimonialsScheme);