const mongoose = require('mongoose');

const seatsScheme = new mongoose.SchemaType({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Seats', seatsScheme);