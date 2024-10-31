// routes/someRoute.js
const express = require('express');
const { saveUser, getUsers, deleteUser, makeAdmin, postJWT } = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares');
const router = express.Router();

router.post('/users', saveUser);
router.get('/users', verifyToken, getUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/admin/:id', makeAdmin);
router.post('/jwt', postJWT);


module.exports = router;
