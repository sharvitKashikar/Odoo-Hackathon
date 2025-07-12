const express = require("express");
const router = express.Router();

const {
  upvoteQuestion,
  downvoteQuestion,
} = require("../../controllers/voteController"); // ✅ Make sure this exists

const { authMiddleware } = require("../../middleware/jwtMiddleware"); // Optional: protect votes

// Optional auth middleware here:
router.post("/:id/upvote", authMiddleware, upvoteQuestion);
router.post("/:id/downvote", authMiddleware, downvoteQuestion);

module.exports = router;
