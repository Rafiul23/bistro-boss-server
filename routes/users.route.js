// routes/someRoute.js
const express = require('express');
const { saveUser, getUsers, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);


module.exports = router;
