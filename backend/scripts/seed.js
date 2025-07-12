const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: await bcrypt.hash('password123', 12),
        bio: 'Full-stack developer passionate about React and Node.js',
        reputation: 1250,
        role: 'USER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        username: 'janesmith',
        password: await bcrypt.hash('password123', 12),
        bio: 'Python developer and data scientist',
        reputation: 890,
        role: 'USER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'mike@example.com' },
      update: {},
      create: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        username: 'mikejohnson',
        password: await bcrypt.hash('password123', 12),
        bio: 'DevOps engineer and cloud specialist',
        reputation: 2100,
        role: 'USER'
      }
    })
  ]);

  console.log('✅ Users created:', users.length);

  // Create questions
  const questions = await Promise.all([
    prisma.question.create({
      data: {
        title: 'How to center a div horizontally and vertically in CSS?',
        description: 'I\'m trying to center a div both horizontally and vertically on the page. I\'ve tried various methods but nothing seems to work properly. Can someone help me with the best approach?',
        tags: ['css', 'html', 'flexbox', 'centering'],
        slug: 'how-to-center-div-css',
        authorId: users[0].id,
        views: 1234,
        upvotes: 42,
        downvotes: 2
      }
    }),
    prisma.question.create({
      data: {
        title: 'What\'s the difference between let, const, and var in JavaScript?',
        description: 'I\'m confused about when to use let, const, and var in JavaScript. Can someone explain the differences and when to use each one?',
        tags: ['javascript', 'variables', 'es6', 'scope'],
        slug: 'difference-let-const-var-javascript',
        authorId: users[1].id,
        views: 5678,
        upvotes: 156,
        downvotes: 8
      }
    }),
    prisma.question.create({
      data: {
        title: 'How to handle async/await errors in JavaScript?',
        description: 'I\'m working with async/await in JavaScript and I\'m not sure about the best practices for error handling. What are the recommended approaches?',
        tags: ['javascript', 'async-await', 'error-handling', 'promises'],
        slug: 'handle-async-await-errors-javascript',
        authorId: users[2].id,
        views: 2341,
        upvotes: 89,
        downvotes: 3
      }
    }),
    prisma.question.create({
      data: {
        title: 'React useState not updating immediately',
        description: 'I\'m calling setState in React but the state doesn\'t seem to update immediately. What\'s happening and how can I fix this?',
        tags: ['react', 'hooks', 'usestate', 'state-management'],
        slug: 'react-usestate-not-updating-immediately',
        authorId: users[0].id,
        views: 3456,
        upvotes: 73,
        downvotes: 5
      }
    }),
    prisma.question.create({
      data: {
        title: 'How to properly use Git branches for feature development?',
        description: 'I\'m working on a team project and we need to implement proper Git branching strategy. What are the best practices for feature development?',
        tags: ['git', 'version-control', 'branching', 'workflow'],
        slug: 'git-branches-feature-development',
        authorId: users[1].id,
        views: 1789,
        upvotes: 34,
        downvotes: 1
      }
    })
  ]);

  console.log('✅ Questions created:', questions.length);

  // Create answers
  const answers = await Promise.all([
    prisma.answer.create({
      data: {
        content: 'You can use flexbox to center a div both horizontally and vertically. Here\'s the CSS:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.centered-div {\n  /* Your div content */\n}\n```\n\nThis is the most modern and flexible approach.',
        questionId: questions[0].id,
        authorId: users[1].id,
        isAccepted: true
      }
    }),
    prisma.answer.create({
      data: {
        content: 'Here are the key differences:\n\n- **var**: Function-scoped, can be redeclared and reassigned\n- **let**: Block-scoped, can be reassigned but not redeclared\n- **const**: Block-scoped, cannot be reassigned or redeclared\n\nUse `const` by default, `let` when you need to reassign, and avoid `var`.',
        questionId: questions[1].id,
        authorId: users[2].id,
        isAccepted: true
      }
    }),
    prisma.answer.create({
      data: {
        content: 'Use try-catch blocks with async/await:\n\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch(\'/api/data\');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\'Error fetching data:\', error);\n    throw error;\n  }\n}\n```',
        questionId: questions[2].id,
        authorId: users[0].id,
        isAccepted: false
      }
    })
  ]);

  console.log('✅ Answers created:', answers.length);

  // Create some votes
  await Promise.all([
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: users[1].id,
        questionId: questions[0].id
      }
    }),
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: users[2].id,
        questionId: questions[0].id
      }
    }),
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: users[0].id,
        questionId: questions[1].id
      }
    })
  ]);

  console.log('✅ Votes created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
