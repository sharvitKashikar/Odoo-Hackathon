const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/tags - Get all unique tags from questions
exports.getAllTags = async (req, res) => {
  try {
    // Get all questions and extract unique tags
    const questions = await prisma.question.findMany({
      select: { tags: true }
    });
    
    // Extract all tags and count occurrences
    const tagCounts = {};
    questions.forEach(question => {
      question.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Convert to array format
    const tags = Object.entries(tagCounts).map(([name, count]) => ({
      id: name, // Use tag name as ID for now
      name,
      count,
      createdAt: new Date(), // Placeholder
      updatedAt: new Date()  // Placeholder
    }));
    
    res.json(tags);
  } catch (err) {
    console.error("❌ getAllTags:", err);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

// GET /api/tags/popular - Get popular tags
exports.getPopularTags = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      select: { tags: true }
    });
    
    const tagCounts = {};
    questions.forEach(question => {
      question.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Sort by count and get top 10
    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({
        id: name,
        name,
        count,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    
    res.json(popularTags);
  } catch (err) {
    console.error("❌ getPopularTags:", err);
    res.status(500).json({ error: "Failed to fetch popular tags" });
  }
};

// GET /api/tags/:tag/questions - Get questions by tag
exports.getQuestionsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    
    const questions = await prisma.question.findMany({
      where: {
        tags: {
          has: tag
        }
      },
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
  } catch (err) {
    console.error("❌ getQuestionsByTag:", err);
    res.status(500).json({ error: "Failed to fetch questions by tag" });
  }
};
