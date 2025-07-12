const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Fishy Dev",
      email: "fishy@dev.com",
    },
  });

  await prisma.question.create({
    data: {
      title: "How to connect Prisma with Neon?",
      description: "Trying to link Prisma ORM to Neon DB in a Node backend.",
      slug: "how-to-connect-prisma-with-neon",
      tags: ["prisma", "neon", "postgres"],
      authorId: user.id,
    },
  });

  console.log("🌱 Seeded successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
