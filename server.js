const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS to allow requests from your frontend
app.use(cors());

// Serve static files from the frontend build folder (adjust 'frontend/dist' to your actual path)
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API Routes
// ...existing code...

// Handle React/Vue client-side routing by returning index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

module.exports = app;