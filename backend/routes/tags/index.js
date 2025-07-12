const express = require("express");
const router = express.Router();
const { getAllTags, getPopularTags, getQuestionsByTag } = require("../../controllers/tagController");

// GET /api/tags - Get all tags
router.get("/", getAllTags);

// GET /api/tags/popular - Get popular tags
router.get("/popular", getPopularTags);

// GET /api/tags/:tag/questions - Get questions by tag
router.get("/:tag/questions", getQuestionsByTag);

module.exports = router;
