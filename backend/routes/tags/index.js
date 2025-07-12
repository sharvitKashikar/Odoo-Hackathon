const express = require("express");
const router = express.Router();
const { getAllTags, createTag } = require("../../controllers/tagController");

// GET /api/tags
router.get("/", getAllTags);

// POST /api/tags
router.post("/", createTag); // Optional: add authMiddleware if needed

module.exports = router;
