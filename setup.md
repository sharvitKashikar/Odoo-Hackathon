# 🚀 Full-Stack Q&A Platform Setup Guide

This guide will help you set up and run the complete Q&A platform with both backend and frontend applications.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn** package manager
- **Git**

## 🗄️ Database Setup

1. **Install PostgreSQL** (if not already installed)
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Create a new database named `stackit`

2. **Set up the database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE stackit;
   
   # Exit psql
   \q
   ```

## 🔧 Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your database credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/stackit"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=3000
   FRONTEND_URL="http://localhost:5173"
   ```

4. **Set up database schema**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will be available at `http://localhost:3000`

## 🎨 Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Frontend1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🔗 Integration Features

### ✅ What's Integrated

- **Authentication System**
  - JWT-based authentication
  - User registration and login
  - Protected routes
  - Session management

- **Questions & Answers**
  - Create, read, update, delete questions
  - Add answers to questions
  - Vote on questions and answers
  - Accept answers
  - Search and filter questions

- **User Management**
  - User profiles
  - Reputation system
  - Role-based access control
  - User activity tracking

- **Real-time Features**
  - Live updates for votes
  - Real-time notifications (planned)
  - WebSocket integration (planned)

### 🔌 API Endpoints

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Questions:**
- `GET /api/question` - Get all questions
- `POST /api/question` - Create question
- `GET /api/question/:slug` - Get question by slug
- `PATCH /api/question/:id` - Update question
- `DELETE /api/question/:id` - Delete question
- `POST /api/question/:id/upvote` - Upvote question
- `POST /api/question/:id/downvote` - Downvote question

**Answers:**
- `POST /api/answer` - Create answer
- `PATCH /api/answer/:id` - Update answer
- `DELETE /api/answer/:id` - Delete answer
- `POST /api/answer/:id/accept` - Accept answer
- `POST /api/answer/:id/upvote` - Upvote answer
- `POST /api/answer/:id/downvote` - Downvote answer

**Users:**
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `PATCH /api/user/:id` - Update user profile

**Tags:**
- `GET /api/tags` - Get all tags
- `GET /api/tags/popular` - Get popular tags

## 🧪 Testing the Integration

1. **Start both servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd Frontend1 && npm run dev
   ```

2. **Test the application**
   - Open `http://localhost:5173` in your browser
   - Register a new account
   - Create a question
   - Add answers
   - Test voting functionality
   - Test search and filtering

## 🔧 Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd Frontend1
npm run dev  # Start Vite dev server
```

### Database Management
```bash
cd backend
npx prisma studio  # Open Prisma Studio for database management
npx prisma migrate dev  # Create new migration
npx prisma generate  # Regenerate Prisma client
```

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Database Deployment
1. Set up PostgreSQL database in production
2. Run migrations: `npx prisma migrate deploy`
3. Update environment variables

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Ensure frontend is running on the correct port

3. **JWT Token Issues**
   - Verify `JWT_SECRET` is set in backend `.env`
   - Check token expiration

4. **Port Conflicts**
   - Backend: Change `PORT` in `.env` (default: 3000)
   - Frontend: Change port in `vite.config.ts` (default: 5173)

### Debug Mode

**Backend:**
```bash
DEBUG=* npm run dev
```

**Frontend:**
```bash
npm run dev -- --debug
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy coding! 🎉** 