// routes/someRoute.js
const express = require("express");
const {
  getMenuItems,
  addToCart,
  getCartItems,
  deletCartItems,
  postRecipe,
  deleteRecipe,
  getSingleMenuItem,
  updateMenuItem,
  getStatsInfo,
  getOrderStats,
} = require("../controllers/products.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");
const router = express.Router();

router.get("/menu", getMenuItems);
router.post("/carts", addToCart);
router.get("/carts", getCartItems);
router.delete("/carts/:id", deletCartItems);
router.post("/menu", verifyToken, verifyAdmin, postRecipe);
router.delete("/menu/:id", verifyToken, verifyAdmin, deleteRecipe);
router.get("/menu/:id", getSingleMenuItem);
router.patch('/menu/:id', verifyToken, verifyAdmin, updateMenuItem);
router.get('/admin-stats', verifyToken, verifyAdmin, getStatsInfo);
router.get('/order-stats', verifyToken, verifyAdmin, getOrderStats)

module.exports = router;
