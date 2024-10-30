// routes/someRoute.js
const express = require('express');
const { getMenuItems, addToCart, getCartItems, deletCartItems } = require('../controllers/products.controller');
const router = express.Router();

router.get('/menu', getMenuItems);
router.post('/carts', addToCart);
router.get('/carts', getCartItems);
router.delete('/carts/:id', deletCartItems);

module.exports = router;
