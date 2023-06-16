const express = require('express');
const morgan = require('morgan');
const db = require('./db');

const app = express();

const testimonialRoutes = require('././routes/testimonials.routes');
const concertRoutes = require('././routes/concerts.routes');
const seatsRoutes = require('././routes/seats.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});