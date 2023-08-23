const express = require('express');
const socket = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://maciejstolecki:BazaDanych1@newwavedb.4qrab1u.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const app = express();

const testimonialRoutes = require('././routes/testimonials.routes');
const concertRoutes = require('././routes/concerts.routes');
const seatsRoutes = require('././routes/seats.routes');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
});