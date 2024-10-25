// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const menuRouter = require('./routes/menu.route');
const reviewsRouter = require('./routes/reviews.route');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Define routes
app.use(menuRouter);
app.use(reviewsRouter);

app.get('/', (req, res) => {
  res.send('Boss is running');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
