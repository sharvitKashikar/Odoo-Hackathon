import { Question } from '../types';

export const questionsData: Question[] = [
  {
    id: 1,
    title: "How to implement JWT authentication with refresh tokens in Node.js and React?",
    body: "I'm building a full-stack application and need to implement secure JWT authentication with automatic token refresh. I want to store the access token in memory and refresh token in httpOnly cookies. How can I handle token expiration gracefully on the frontend and implement a secure refresh mechanism on the backend?",
    author: "Arjun Sharma",
    createdAt: new Date('2024-01-15'),
    votes: 42,
    answers: 8,
    views: 1234,
    tags: ["javascript", "node.js", "react", "jwt", "authentication", "security"]
  },
  {
    id: 2,
    title: "What's the difference between let, const, and var in JavaScript ES6+?",
    body: "I'm confused about when to use let, const, and var in JavaScript. Can someone explain the differences in scope, hoisting behavior, and best practices? Also, when should I use const vs let for objects and arrays?",
    author: "Priya Patel",
    createdAt: new Date('2024-01-14'),
    votes: 156,
    answers: 12,
    views: 5678,
    tags: ["javascript", "variables", "es6", "scope", "hoisting"]
  },
  {
    id: 3,
    title: "How to optimize React performance with useMemo, useCallback, and React.memo?",
    body: "My React application is experiencing performance issues with unnecessary re-renders. I've heard about useMemo, useCallback, and React.memo but I'm not sure when and how to use them effectively. Can someone provide practical examples and explain the performance implications?",
    author: "Vikram Singh",
    createdAt: new Date('2024-01-13'),
    votes: 89,
    answers: 5,
    views: 2341,
    tags: ["react", "performance", "hooks", "optimization", "memoization"]
  },
  {
    id: 4,
    title: "React useState not updating immediately - understanding asynchronous state updates",
    body: "I'm calling setState in React but the state doesn't seem to update immediately. I'm trying to use the updated state value right after setting it, but it shows the old value. What's happening and how can I work with the updated state?",
    author: "Sneha Gupta",
    createdAt: new Date('2024-01-12'),
    votes: 73,
    answers: 9,
    views: 3456,
    tags: ["react", "hooks", "usestate", "state-management", "asynchronous"]
  },
  {
    id: 5,
    title: "How to implement CI/CD pipeline with Docker, Jenkins, and Kubernetes for microservices?",
    body: "I'm working on a microservices architecture and need to set up a robust CI/CD pipeline. The stack includes Docker for containerization, Jenkins for automation, and Kubernetes for orchestration. How can I implement automated testing, building, and deployment across multiple environments?",
    author: "Rajesh Kumar",
    createdAt: new Date('2024-01-11'),
    votes: 34,
    answers: 6,
    views: 1789,
    tags: ["devops", "docker", "jenkins", "kubernetes", "ci-cd", "microservices"]
  },
  {
    id: 6,
    title: "Python pandas: How to efficiently process large datasets with memory optimization?",
    body: "I'm working with a 10GB CSV file using pandas and running into memory issues. The dataset has millions of rows and I need to perform groupby operations, filtering, and aggregations. What are the best practices for memory-efficient data processing in pandas?",
    author: "Kavya Reddy",
    createdAt: new Date('2024-01-10'),
    votes: 67,
    answers: 4,
    views: 2890,
    tags: ["python", "pandas", "performance", "memory-optimization", "big-data"]
  },
  {
    id: 7,
    title: "SQL query optimization: JOIN vs subquery performance in PostgreSQL",
    body: "I have a complex query that can be written using either JOINs or subqueries. The query involves multiple tables with millions of records. Which approach is more efficient in PostgreSQL and how can I analyze query execution plans to make the right choice?",
    author: "Amit Agarwal",
    createdAt: new Date('2024-01-09'),
    votes: 28,
    answers: 3,
    views: 1567,
    tags: ["sql", "postgresql", "query-optimization", "joins", "performance"]
  },
  {
    id: 8,
    title: "TypeScript: Advanced type patterns with conditional types and mapped types",
    body: "I'm learning TypeScript and struggling with advanced type patterns. How do conditional types work with 'extends' keyword? Can someone explain mapped types and provide practical examples of when to use utility types like Pick, Omit, and Record?",
    author: "Ananya Iyer",
    createdAt: new Date('2024-01-08'),
    votes: 91,
    answers: 7,
    views: 4123,
    tags: ["typescript", "types", "conditional-types", "mapped-types", "utility-types"]
  },
  {
    id: 9,
    title: "How to implement real-time chat with Socket.io, Redis, and horizontal scaling?",
    body: "I'm building a real-time chat application that needs to support thousands of concurrent users. I'm using Socket.io for WebSocket connections, but I need to implement horizontal scaling across multiple server instances. How can I use Redis for message broadcasting and session management?",
    author: "Rohit Mehta",
    createdAt: new Date('2024-01-07'),
    votes: 112,
    answers: 6,
    views: 3789,
    tags: ["socket.io", "redis", "websockets", "scaling", "real-time", "node.js"]
  },
  {
    id: 10,
    title: "AWS Lambda cold start optimization and performance tuning strategies",
    body: "My AWS Lambda functions are experiencing high cold start latencies, especially for Java and .NET runtimes. What are the best practices for minimizing cold starts? Should I consider provisioned concurrency, and how can I optimize my function code and dependencies?",
    author: "Deepika Joshi",
    createdAt: new Date('2024-01-06'),
    votes: 58,
    answers: 4,
    views: 2156,
    tags: ["aws", "lambda", "serverless", "performance", "cold-start", "optimization"]
  },
  {
    id: 11,
    title: "How to implement OAuth 2.0 with PKCE for mobile apps using React Native?",
    body: "I'm developing a React Native app that needs to integrate with Google and Facebook OAuth. I've heard about PKCE (Proof Key for Code Exchange) for mobile security. How do I implement this flow properly and handle token storage securely on mobile devices?",
    author: "Arjun Sharma",
    createdAt: new Date('2024-01-05'),
    votes: 45,
    answers: 5,
    views: 1876,
    tags: ["react-native", "oauth", "pkce", "mobile", "security", "authentication"]
  },
  {
    id: 12,
    title: "Machine Learning model deployment with MLflow, Docker, and Kubernetes",
    body: "I've trained a machine learning model using scikit-learn and want to deploy it to production. How can I use MLflow for model versioning and tracking, containerize it with Docker, and deploy it on Kubernetes with auto-scaling capabilities?",
    author: "Priya Patel",
    createdAt: new Date('2024-01-04'),
    votes: 76,
    answers: 3,
    views: 2543,
    tags: ["machine-learning", "mlflow", "docker", "kubernetes", "deployment", "python"]
  },
  {
    id: 13,
    title: "GraphQL vs REST API: When to choose which approach for microservices?",
    body: "I'm designing APIs for a microservices architecture and debating between GraphQL and REST. What are the trade-offs in terms of performance, caching, complexity, and team adoption? When does GraphQL make sense over traditional REST APIs?",
    author: "Vikram Singh",
    createdAt: new Date('2024-01-03'),
    votes: 63,
    answers: 8,
    views: 3210,
    tags: ["graphql", "rest", "api-design", "microservices", "architecture"]
  },
  {
    id: 14,
    title: "How to handle race conditions in concurrent Go applications?",
    body: "I'm building a concurrent application in Go and running into race conditions when multiple goroutines access shared data. How do I properly use channels, mutexes, and sync package primitives? What are the best practices for designing thread-safe code in Go?",
    author: "Sneha Gupta",
    createdAt: new Date('2024-01-02'),
    votes: 84,
    answers: 6,
    views: 2987,
    tags: ["go", "concurrency", "goroutines", "race-conditions", "synchronization"]
  },
  {
    id: 15,
    title: "Implementing event sourcing pattern with Apache Kafka and Spring Boot",
    body: "I want to implement event sourcing in my Spring Boot application using Apache Kafka as the event store. How do I design event schemas, handle event versioning, and implement event replay functionality? What are the challenges with eventual consistency?",
    author: "Rajesh Kumar",
    createdAt: new Date('2024-01-01'),
    votes: 39,
    answers: 4,
    views: 1654,
    tags: ["event-sourcing", "kafka", "spring-boot", "microservices", "architecture"]
  }
];