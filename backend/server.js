// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors()); // Allow all origins currently
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get("/api/question", async (req, res) => {
  const questions = await prisma.question.findMany({
    include: { tags: true, user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(questions);
});

app.put("/api/question", async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).min(1).required(),
    userId: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title, description, tags, userId } = value;

  const question = await prisma.question.create({
    data: {
      title,
      description,
      userId,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });

  res.status(201).json(question);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});