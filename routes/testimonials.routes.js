const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  
  res.json(randomTestimonial);
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonial = db.testimonials.find((item) => item.id === testimonialId);

  if (testimonial) {
    res.json(testimonial);
  }
});

router.route('/testimonials').post ((req, res) => {
  const {author, text} = req.body;
  const newTestimonial = {
    id: uuidv4(), 
    author, 
    text,
  };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'ok!' });
});

router.route('/testimonials/:id').put ((req, res) => {
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

router.route('/testimonials/:id').delete ((req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.findIndex((item) => item.id === testimonialId);

  if (testimonialIndex !== -1) {
    db.testimonials.splice(testimonialIndex, 1); // Usunięcie jednego elementu z tablicy na indeksie testimonialIndex
    res.json({ message: 'ok!' }); 
  } else {
    res.status(404).send('Testimonial not found');
  }
});

module.exports = router;