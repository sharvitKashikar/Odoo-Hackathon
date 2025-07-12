const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
    res.json(tags);
  } catch (err) {
    console.error("❌ getAllTags:", err);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

// POST /api/tags
exports.createTag = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid tag name" });
  }

  try {
    const existing = await prisma.tag.findUnique({ where: { name } });
    if (existing) return res.status(409).json({ error: "Tag already exists" });

    const tag = await prisma.tag.create({ data: { name } });
    res.status(201).json(tag);
  } catch (err) {
    console.error("❌ createTag:", err);
    res.status(500).json({ error: "Failed to create tag" });
  }
};
