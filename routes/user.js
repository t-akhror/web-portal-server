const express = require("express");

//controller functions
const {
  loginUser,
  signupUser,
  user_detail,
} = require("../controllers/userController");

const router = express.Router();
// Login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

// Find user by email
router.get("/find", user_detail);

module.exports = router;
