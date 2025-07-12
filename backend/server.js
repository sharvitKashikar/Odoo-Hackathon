require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

// Middleware (should come before routes)
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ✅ Route Imports
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const voteRoutes = require("./routes/question/vote");
const tagRoutes = require("./routes/tags");
const userRoutes = require("./routes/user");
const answerRoutes = require("./routes/answer");

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/question", voteRoutes); // for /:id/upvote etc
app.use("/api/tags", tagRoutes);
app.use("/api/user", userRoutes);
app.use("/api/answer", answerRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});
