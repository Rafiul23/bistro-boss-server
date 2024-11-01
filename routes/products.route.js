// routes/someRoute.js
const express = require('express');
const { getMenuItems, addToCart, getCartItems, deletCartItems, postRecipe, deleteRecipe } = require('../controllers/products.controller');
const { verifyToken, verifyAdmin } = require('../middlewares');
const router = express.Router();

router.get('/menu', getMenuItems);
router.post('/carts', addToCart);
router.get('/carts', getCartItems);
router.delete('/carts/:id', deletCartItems);
router.post('/menu', verifyToken, verifyAdmin, postRecipe);
router.delete('/menu/:id', verifyToken, verifyAdmin, deleteRecipe);

module.exports = router;
