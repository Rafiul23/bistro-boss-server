// routes/someRoute.js
const express = require("express");
const {
  saveUser,
  getUsers,
  deleteUser,
  makeAdmin,
  postJWT,
  isAdmin,
} = require("../controllers/users.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");
const router = express.Router();

router.post("/users", saveUser);
router.get("/users", verifyToken, verifyAdmin, getUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/users/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.post("/jwt", postJWT);
router.get("/users/admin/:email", verifyToken, isAdmin);

module.exports = router;
