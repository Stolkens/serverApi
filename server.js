const express = require('express');
const path = require('path');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonial = db.find((item) => item.id === testimonialId);

  if (testimonial) {
    res.json(testimonial);
  }
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const randomTestimonial = db[randomIndex];
  
  res.json(randomTestimonial);
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});