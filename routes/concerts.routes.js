const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all concerts

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concertId = parseInt(req.params.id);
  const concert = db.concerts.find((item) => item.id === concertId);

  if (concert) {
    res.json(concert);
  }
});

router.route('/concerts').post ((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const newconcert = {
    id: uuidv4(), 
    performer,
    genre,
    price,
    day,
    image
  };
  db.concerts.push(newconcert);
  res.json({ message: 'ok!' });
});

router.route('/concerts/:id').put ((req, res) => {
  const concertId = parseInt(req.params.id);
  const { performer, genre, price, day, image } = req.body;

  const concert = db.concerts.find((item) => item.id === concertId);

  if (concert) {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;

    res.json({ message: 'ok!' });
  } else {
    res.status(404).send('concert not found');
  }
});

router.route('/concerts/:id').delete ((req, res) => {
  const concertId = parseInt(req.params.id);
  const concertIndex = db.concerts.findIndex((item) => item.id === concertId);

  if (concertIndex !== -1) {
    db.concerts.splice(concertIndex, 1); // Usunięcie jednego elementu z tablicy na indeksie concertIndex
    res.json({ message: 'ok!' }); 
  } else {
    res.status(404).send('concert not found');
  }
});

module.exports = router;