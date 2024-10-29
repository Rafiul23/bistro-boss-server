// routes/someRoute.js
const express = require('express');
const { getMenuItems, addToCart } = require('../controllers/products.controller');
const router = express.Router();

router.get('/menu', getMenuItems);
router.post('/carts', addToCart);

module.exports = router;
