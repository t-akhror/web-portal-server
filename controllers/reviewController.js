const { json } = require("express");
const { mongoose } = require("mongoose");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

// GET all reviews belong to a User
const getAllReviews = async (req, res) => {
  const user_id = req.user._id;
  const { q } = req.query;

  const reviews = await Review.find({ user: user_id }).sort({
    createdAt: -1,
  });
  if (!reviews) {
    return res.status(404).json({ error: "There is not any reviews" });
  }
  // filter function
  const keys = ["title", "category", "description"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };
  res.status(200).json(search(reviews));
};
// GET all reviews
const someReviews = async (req, res) => {
  const someReviews = await Review.find()
    .populate("user")
    .sort({ createdAt: -1 });
  res.status(200).json(someReviews);
};

// GET a single review
const getReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not such review" });
  }

  const review = await Review.findById(id).populate("user");

  if (!review) {
    return res.status(404).json({ error: "Not such review" });
  }

  res.status(200).json(review);
};

// POST a new review
const createReview = async (req, res) => {
  const user_id = req.user._id;
  const { title, brand, category, description, rating, numOfReviews, user } =
    req.body;
  const reviewImage = req.file.path;

  try {
    const review = await Review.create({
      title,
      reviewImage,
      brand,
      category,
      description,
      rating,
      numOfReviews,
      user,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Not such review" });
  }

  const review = await Review.findOneAndDelete({ _id: id });
  if (!review) {
    return res.status(404).json({ msg: "Not such review" });
  }
  res.status(200).json(review);
};

// UPDATE a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "not such review" });
  }

  const review = await Review.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!review) {
    return res.status(404).json({ msg: "Not such review" });
  }
  res.status(200).json(review);
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
  someReviews,
};
