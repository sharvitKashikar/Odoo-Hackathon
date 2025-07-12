const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .replace(/\s+/g, '-')     // replace whitespace with hyphens
    .slice(0, 60);            // optional: truncate

// POST /api/question
exports.createQuestion = async (req, res) => {
  const { title, description, tags, authorId } = req.body;

  if (!title || !description || !tags || !authorId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const slug = slugify(title);
    const question = await prisma.question.create({
      data: {
        title,
        description,
        slug,
        tags,
        authorId,
      },
    });

    res.status(201).json(question);
  } catch (err) {
    console.error("❌ createQuestion:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
};

// GET /api/question
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(questions);
  } catch (err) {
    console.error("❌ getAllQuestions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// GET /api/question/:slug
exports.getQuestionBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const question = await prisma.question.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error("❌ getQuestionBySlug:", err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

// PATCH /api/question/:id
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const updated = await prisma.question.update({
      where: { id },
      data: {
        title,
        description,
        tags,
        slug: slugify(title),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ updateQuestion:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
};

// DELETE /api/question/:id
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.question.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (err) {
    console.error("❌ deleteQuestion:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
};
