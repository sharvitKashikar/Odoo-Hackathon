const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /api/user - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        reputation: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            answers: true
          }
        }
      },
      orderBy: { reputation: 'desc' }
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /api/user/:id - Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        reputation: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            answers: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// GET /api/user/:id/questions - Get user's questions
router.get("/:id/questions", async (req, res) => {
  try {
    const { id } = req.params;
    
    const questions = await prisma.question.findMany({
      where: { authorId: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            reputation: true
          }
        },
        _count: {
          select: {
            answers: true,
            votes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(questions);
  } catch (error) {
    console.error("Error fetching user questions:", error);
    res.status(500).json({ error: "Failed to fetch user questions" });
  }
});

// GET /api/user/:id/answers - Get user's answers
router.get("/:id/answers", async (req, res) => {
  try {
    const { id } = req.params;
    
    const answers = await prisma.answer.findMany({
      where: { authorId: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            reputation: true
          }
        },
        question: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(answers);
  } catch (error) {
    console.error("Error fetching user answers:", error);
    res.status(500).json({ error: "Failed to fetch user answers" });
  }
});

module.exports = router;
