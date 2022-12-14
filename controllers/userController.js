const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRERT_KEY, { expiresIn: "2d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  console.log("Registering user ");
  const { email, firstname, lastname, dateOfBirth, password } = req.body;
  console.log("some error with body", dateOfBirth);
  try {
    const user = await User.signup(
      email,
      firstname,
      lastname,
      dateOfBirth,
      password
    );

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.log("user is not defined");
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
