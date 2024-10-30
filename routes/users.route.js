// routes/someRoute.js
const express = require('express');
const { saveUser, getUsers, deleteUser, makeAdmin } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/admin/:id', makeAdmin);


module.exports = router;
