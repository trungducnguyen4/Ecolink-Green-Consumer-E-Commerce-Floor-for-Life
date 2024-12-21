const express = require('express');
const app = express();
const reviewRoutes = require('./routes/review_routes');

// ...existing code...

app.use('/reviews', reviewRoutes);

// ...existing code...
