const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/question/:id/upvote
exports.upvoteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.question.update({
      where: { id },
      data: {
        upvotes: { increment: 1 },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ upvoteQuestion:", err);
    res.status(500).json({ error: "Failed to upvote" });
  }
};

// POST /api/question/:id/downvote
exports.downvoteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.question.update({
      where: { id },
      data: {
        downvotes: { increment: 1 },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ downvoteQuestion:", err);
    res.status(500).json({ error: "Failed to downvote" });
  }
};
