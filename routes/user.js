const express = require("express");

//controller functions
const {
  loginUser,
  signupUser,
  user_detail,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();
// get all users
router.get("/", getAllUsers);
// Login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

// Find user by email
router.post("/find", user_detail);

module.exports = router;
