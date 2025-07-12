const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Validation schema
const answerSchema = Joi.object({
  content: Joi.string().min(10).required(),
  questionId: Joi.string().required(),
});

// POST /api/answer - Create a new answer
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { error, value } = answerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { content, questionId } = value;

    // Check if question exists
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Create answer
    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        authorId: req.user.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            reputation: true,
          },
        },
      },
    });

    res.status(201).json(answer);
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/answer/:id - Update an answer
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.length < 10) {
      return res.status(400).json({ error: "Content must be at least 10 characters" });
    }

    // Check if answer exists and user owns it
    const existingAnswer = await prisma.answer.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!existingAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    if (existingAnswer.authorId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to edit this answer" });
    }

    // Update answer
    const updatedAnswer = await prisma.answer.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            reputation: true,
          },
        },
      },
    });

    res.json(updatedAnswer);
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/answer/:id - Delete an answer
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if answer exists and user owns it
    const existingAnswer = await prisma.answer.findUnique({
      where: { id },
    });

    if (!existingAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    if (existingAnswer.authorId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to delete this answer" });
    }

    // Delete answer
    await prisma.answer.delete({
      where: { id },
    });

    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/answer/:id/accept - Accept an answer
router.post("/:id/accept", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if answer exists
    const answer = await prisma.answer.findUnique({
      where: { id },
      include: { question: true },
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if user owns the question
    if (answer.question.authorId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to accept this answer" });
    }

    // Update question to mark this answer as accepted
    await prisma.question.update({
      where: { id: answer.questionId },
      data: { acceptedAnswerId: id },
    });

    // Update answer to mark as accepted
    const updatedAnswer = await prisma.answer.update({
      where: { id },
      data: { isAccepted: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            reputation: true,
          },
        },
      },
    });

    res.json(updatedAnswer);
  } catch (error) {
    console.error("Error accepting answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/answer/:id/upvote - Upvote an answer
router.post("/:id/upvote", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if answer exists
    const answer = await prisma.answer.findUnique({
      where: { id },
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_answerId: {
          userId: req.user.userId,
          answerId: id,
        },
      },
    });

    if (existingVote) {
      if (existingVote.type === "UPVOTE") {
        // Remove upvote
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      } else {
        // Change downvote to upvote
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { type: "UPVOTE" },
        });
      }
    } else {
      // Create new upvote
      await prisma.vote.create({
        data: {
          type: "UPVOTE",
          userId: req.user.userId,
          answerId: id,
        },
      });
    }

    res.json({ message: "Vote updated successfully" });
  } catch (error) {
    console.error("Error upvoting answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/answer/:id/downvote - Downvote an answer
router.post("/:id/downvote", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if answer exists
    const answer = await prisma.answer.findUnique({
      where: { id },
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_answerId: {
          userId: req.user.userId,
          answerId: id,
        },
      },
    });

    if (existingVote) {
      if (existingVote.type === "DOWNVOTE") {
        // Remove downvote
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      } else {
        // Change upvote to downvote
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { type: "DOWNVOTE" },
        });
      }
    } else {
      // Create new downvote
      await prisma.vote.create({
        data: {
          type: "DOWNVOTE",
          userId: req.user.userId,
          answerId: id,
        },
      });
    }

    res.json({ message: "Vote updated successfully" });
  } catch (error) {
    console.error("Error downvoting answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
