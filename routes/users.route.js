// routes/someRoute.js
const express = require('express');
const { saveUser, getUsers } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.get('/users', getUsers);


module.exports = router;
