const express = require('express'); // Express
const cors = require('cors') // CORS

// Mongoose and models 
const mongoose = require('mongoose');
const Note = require('./models/Note');
const { getNotes, addNote, editNote, deleteNote, } = require('./controllers/notefieldController');

// Create express app 
const app = express();

// Retrieve from .env files
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connect to MongoDB, if successful, starts listening to the port
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {

    // Listen to the port
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

    // Logs
    console.log('Connected to DB')
  })
  .catch((err) => {
    console.log(err)
  });

// Routes
app.get('/api/notes', getNotes);
app.post('/api/notes', addNote);
app.put('/api/notes', editNote);
app.delete('/api/notes', deleteNote);
