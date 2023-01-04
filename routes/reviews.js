const express = require("express");
const {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// require Auth for all reviews
router.use(requireAuth);
// GET all reviews
router.get("/", getAllReviews);

// GET a single review
router.get("/:id", getReview);

// POST a new review
router.post("/", createReview);

// DELETE a review
router.delete("/:id", deleteReview);

// UPDATE a review
router.patch("/:id", updateReview);

module.exports = router;
