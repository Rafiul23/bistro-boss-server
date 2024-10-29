// routes/someRoute.js
const express = require('express');
const { getMenuItems, addToCart, getCartItems } = require('../controllers/products.controller');
const router = express.Router();

router.get('/menu', getMenuItems);
router.post('/carts', addToCart);
router.get('/carts', getCartItems);

module.exports = router;
