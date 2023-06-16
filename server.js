const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');




const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(morgan('dev'));

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

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  const newTestimonial = {
    id: uuidv4(), 
    author, 
    text,
  };
  db.push(newTestimonial);
  res.status(201).json(newTestimonial)
});

app.put('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const { author, text } = req.body;

  const testimonial = db.find((item) => item.id === testimonialId);

  if (testimonial) {
    testimonial.author = author;
    testimonial.text = text;

    res.json(testimonial);
  } else {
    res.status(404).send('Testimonial not found');
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.findIndex((item) => item.id === testimonialId);

  if (testimonialIndex !== -1) {
    db.splice(testimonialIndex, 1); // Usunięcie jednego elementu z tablicy na indeksie testimonialIndex
    res.status(204).send('OK'); 
  } else {
    res.status(404).send('Testimonial not found');
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});