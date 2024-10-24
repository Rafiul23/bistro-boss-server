// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const someRoute = require('./routes/someRoute');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Define routes
// app.use('/api', someRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
