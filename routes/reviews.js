const express = require("express");
const {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  updateReview,
  someReviews,
} = require("../controllers/reviewController");
const requireAuth = require("../middleware/requireAuth");
const upload = require("../middleware/upload");

const router = express.Router();
// require Auth for all reviews
router.get("/allreviews", someReviews);
router.use(requireAuth);
// GET all reviews
router.get("/", getAllReviews);

// GET a single review
router.get("/:id", getReview);

// POST a new review
router.post("/", upload.single("reviewImage"), createReview);

// DELETE a review
router.delete("/:id", deleteReview);

// UPDATE a review
router.patch("/:id", updateReview);

module.exports = router;
