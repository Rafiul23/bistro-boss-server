// routes/someRoute.js
const express = require('express');
const { getMenuItems } = require('../controllers/menu.controller');
const router = express.Router();

router.get('/menu', getMenuItems);

module.exports = router;
