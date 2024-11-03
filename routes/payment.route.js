// routes/someRoute.js
const express = require("express");
const { postPayment, savePayment } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares");
const router = express.Router();

router.post("/create-payment-intent", verifyToken, postPayment);
router.post('/payments', verifyToken, savePayment);

module.exports = router;
