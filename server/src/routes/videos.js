const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read the existing video data from the file
function readVideoData(callback) {
  fs.readFile('./server/src/data/videodata.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }
    const videos = JSON.parse(data);
    callback(null, videos);
  });
}

// Save video data to the file
function saveVideoData(videos, callback) {
  fs.writeFile('./server/src/data/videodata.json', JSON.stringify(videos), 'utf8', (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

// GET /videos endpoint
router.get('/', (req, res) => {
  readVideoData((err, videos) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error reading videos data');
    }
    res.json(videos);
  });
});

// GET /videos/:id endpoint
router.get('/:id', (req, res) => {
  readVideoData((err, videos) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error getting video with the provided ID');
    }

    const video = videos.find((v) => v.id === req.params.id);

    if (!video) {
      return res.status(404).send('Video not found');
    }

    res.json(video);
  });
});

// POST /videos endpoint to create a new video
router.post('/', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send('Title and description are required fields.');
  }

  readVideoData((err, videos) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error reading videos data');
    }

    const newVideo = {
      id: uuidv4(),
      title,
      description,
      image: "https://i.imgur.com/5qyCZrD.jpg",
      likes: "1,000,000",
      views: "1,000,000",
      duration: "1:00",
      channel: "dilpreet",
      timestamp: 1625158995000,
      video: "https://project-2-api.herokuapp.com/stream",
      comments: []
    };

    videos.push(newVideo);

    saveVideoData(videos, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error saving video data');
      }

      res.status(201).json(newVideo);
    });
  });
});

module.exports = router;
