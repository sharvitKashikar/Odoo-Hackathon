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
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ✅ Route Imports
const questionRoutes = require("./routes/question");
const voteRoutes = require("./routes/question/vote");
const tagRoutes = require("./routes/tags");
const userRoutes = require("./routes/user");

// ✅ Register Routes
app.use("/api/question", questionRoutes);
app.use("/api/question", voteRoutes); // for /:id/upvote etc
app.use("/api/tags", tagRoutes);
app.use("/api/user", userRoutes);     // 🧠 this was missing!

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
