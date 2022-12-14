const { mongoose } = require("mongoose");
const Review = require("../models/reviewModel");

// GET all reviews
const getAllReviews = async (req, res) => {
  const user_id = req.user._id;
  const reviews = await Review.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};
const someReviews = async (req, res) => {
  const someReviews = await Review.find({}).sort({ createdAt: -1 });
  res.status(200).json(someReviews);
};

// GET a single review
const getReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "Not such review" });
  }

  res.status(200).json(review);
};

// POST a new review
const createReview = async (req, res) => {
  const user_id = req.user._id;
  const { title, image, brand, category, description, rating, numOfReviews } =
    req.body;
  try {
    const review = await Review.create({
      title,
      image,
      brand,
      category,
      description,
      rating,
      numOfReviews,
      user_id,
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
