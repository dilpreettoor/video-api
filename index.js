const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Middleware to parse JSON request body
app.use(express.json());

app.use(cors());

// /videos endpoint
app.get('/videos', (req, res) => {
  fs.readFile('./server/src/data/videodata.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error reading videos data');
    }
    res.json(JSON.parse(data));
  });
});

// /videos/:id endpoint
app.get('/videos/:id', (req, res) => {
  fs.readFile('./server/src/data/videodata.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error getting video with the provided ID');
    }

    const videos = JSON.parse(data);
    const video = videos.find((v) => v.id === req.params.id);

    if (!video) {
      return res.status(404).send('Video not found');
    }

    res.json(video);
  });
});

// Start the server
const port = 5050; 
app.listen(port, () => {
  console.log(`Welcome to Brainflix API, currently running on port:${port}`);
});
