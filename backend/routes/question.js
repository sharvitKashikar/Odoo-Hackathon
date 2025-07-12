const express = require("express");
const router = express.Router();
const { getAllQuestions, addQuestion } = require("../controllers/questionController");

router.get("/", getAllQuestions);
router.put("/", addQuestion);

module.exports = router;
