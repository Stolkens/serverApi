const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all seats

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seatId = parseInt(req.params.id);
  const seat = db.seats.find((item) => item.id === seatId);

  if (seat) {
    res.json(seat);
  }
});

router.route('/seats').post ((req, res) => {
  const {day, seat, client, email } = req.body;
  const newseat = {
    id: uuidv4(),
    day,
    seat, 
    client, 
    email
  };
  db.seats.push(newseat);
  res.json({ message: 'ok!' });
});

router.route('/seats/:id').put ((req, res) => {
  const seatId = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;

  const seatData = db.seats.find((item) => item.id === seatId);

  if (seatData) {
    seatData.day = day;
    seatData.seat = seat;
    seatData.client = client;
    seatData.email = email;
    
    res.json({ message: 'ok!' });
  } else {
    res.status(404).send('seat not found');
  }
});

router.route('/seats/:id').delete ((req, res) => {
  const seatId = parseInt(req.params.id);
  const seatIndex = db.seats.findIndex((item) => item.id === seatId);

  if (seatIndex !== -1) {
    db.seats.splice(seatIndex, 1); // Usunięcie jednego elementu z tablicy na indeksie seatIndex
    res.json({ message: 'ok!' }); 
  } else {
    res.status(404).send('seat not found');
  }
});

module.exports = router;