// routes/someRoute.js
const express = require("express");
const { postPayment, savePayment, getPaymentHistory } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares");
const router = express.Router();

router.post("/create-payment-intent", verifyToken, postPayment);
router.post('/payments', verifyToken, savePayment);
router.get('/payments/:email', verifyToken, getPaymentHistory );
module.exports = router;
