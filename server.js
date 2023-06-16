const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonial = db.testimonials.find((item) => item.id === testimonialId);

  if (testimonial) {
    res.json(testimonial);
  }
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  
  res.json(randomTestimonial);
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  const newTestimonial = {
    id: uuidv4(), 
    author, 
    text,
  };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'ok!' });
});

app.put('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const { author, text } = req.body;

  const testimonial = db.testimonials.find((item) => item.id === testimonialId);

  if (testimonial) {
    testimonial.author = author;
    testimonial.text = text;

    res.json({ message: 'ok!' });
  } else {
    res.status(404).send('Testimonial not found');
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.findIndex((item) => item.id === testimonialId);

  if (testimonialIndex !== -1) {
    db.testimonials.splice(testimonialIndex, 1); // Usunięcie jednego elementu z tablicy na indeksie testimonialIndex
    res.json({ message: 'ok!' }); 
  } else {
    res.status(404).send('Testimonial not found');
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});