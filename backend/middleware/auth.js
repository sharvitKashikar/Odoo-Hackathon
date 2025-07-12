const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to check if user exists in database
const authenticateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        reputation: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.currentUser.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Middleware to check if user owns a resource
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      let resource;

      switch (resourceType) {
        case "question":
          resource = await prisma.question.findUnique({
            where: { id: resourceId },
            select: { authorId: true },
          });
          break;
        case "answer":
          resource = await prisma.answer.findUnique({
            where: { id: resourceId },
            select: { authorId: true },
          });
          break;
        case "user":
          resource = await prisma.user.findUnique({
            where: { id: resourceId },
            select: { id: true },
          });
          break;
        default:
          return res.status(400).json({ error: "Invalid resource type" });
      }

      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      if (resourceType === "user") {
        if (resource.id !== req.currentUser.id && req.currentUser.role !== "ADMIN") {
          return res.status(403).json({ error: "Not authorized" });
        }
      } else {
        if (resource.authorId !== req.currentUser.id && req.currentUser.role !== "ADMIN") {
          return res.status(403).json({ error: "Not authorized" });
        }
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = {
  authenticateToken,
  authenticateUser,
  requireAdmin,
  requireOwnership,
}; 