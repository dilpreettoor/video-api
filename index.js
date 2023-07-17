const express = require('express');
const app = express();
const cors = require('cors');
const videoRoutes = require('./server/src/routes/videos');

// Middleware to parse JSON request body
app.use(express.json());

app.use(cors());

// Mount the video routes
app.use('/videos', videoRoutes);

// Start the server
const port = 5050;
app.listen(port, () => {
  console.log(`Welcome to Brainflix API, currently running on port:${port}`);
});
