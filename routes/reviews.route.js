// routes/someRoute.js
const express = require('express');
const { getReviewss } = require('../controllers/review.controller');
const router = express.Router();

router.get('/reviews', getReviewss);

module.exports = router;
