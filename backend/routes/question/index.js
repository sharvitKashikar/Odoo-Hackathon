const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionBySlug,
  updateQuestion,
  deleteQuestion,
} = require("../../controllers/questionController");

const {
  upvoteQuestion,
  downvoteQuestion,
} = require("../../controllers/voteController");

// CRUD Routes
router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:slug", getQuestionBySlug);
router.patch("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

// Voting Routes
router.post("/:id/upvote", upvoteQuestion);
router.post("/:id/downvote", downvoteQuestion);

module.exports = router;
