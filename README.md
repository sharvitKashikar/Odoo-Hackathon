# Odoo Hackathon - StackIt Q&A Platform

A modern, full-stack Q&A platform built for the Odoo Hackathon, featuring a React frontend with TypeScript and an Express.js backend with PostgreSQL database.

## 🚀 Project Overview

StackIt is a comprehensive Q&A platform inspired by Stack Overflow, designed to help developers ask questions, share knowledge, and build communities. The project consists of two main applications:

- **Frontend (Frontend1)**: A React 18 + TypeScript application with modern UI components and real-time features
- **Backend**: An Express.js application with authentication, database management, and RESTful API endpoints

## 🏗️ Architecture

### Frontend (Frontend1)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context API
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Framework**: Express.js with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Joi for request validation
- **Security**: Helmet, CORS, Rate limiting
- **File Structure**: MVC pattern with routes, controllers, and middleware

## ✨ Features

### Core Q&A Functionality
- **Ask Questions**: Create detailed questions with tags and rich text
- **Answer Questions**: Provide comprehensive answers with markdown support
- **Voting System**: Upvote/downvote questions and answers
- **Comments**: Add comments to questions and answers
- **Tags**: Categorize questions with relevant tags
- **Search**: Full-text search across questions, tags, and content

### User Management
- **Authentication**: Secure JWT-based login/register system
- **User Profiles**: Detailed user profiles with reputation system
- **Role-based Access**: Guest, User, and Admin roles
- **Reputation System**: Earn reputation through helpful contributions

### Community Features
- **User Activity**: Track questions asked, answers given, and reputation
- **Popular Tags**: Discover trending topics and categories
- **Real-time Updates**: Live updates for votes and interactions

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth loading and error handling
- **Accessibility**: WCAG compliant components

## 📁 Project Structure

```
Odoo-Hackathon/
├── Frontend1/                   # React Frontend Application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── contexts/          # React contexts (AuthContext)
│   │   ├── services/          # API services
│   │   ├── types/             # TypeScript interfaces
│   │   └── App.tsx            # Main application component
│   ├── package.json
│   └── vite.config.ts
├── backend/                    # Express.js Backend Application
│   ├── routes/                # API route handlers
│   │   ├── auth/              # Authentication routes
│   │   ├── question/          # Question routes
│   │   ├── answer/            # Answer routes
│   │   ├── user/              # User routes
│   │   └── tags/              # Tag routes
│   ├── controllers/           # Business logic
│   ├── middleware/            # Custom middleware
│   ├── prisma/                # Database schema and migrations
│   ├── server.js              # Main server file
│   └── package.json
├── setup.md                   # Detailed setup guide
├── package.json               # Root package.json with scripts
└── README.md
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts with authentication and profiles
- **Questions**: Q&A posts with titles, descriptions, and tags
- **Answers**: Responses to questions with acceptance status
- **Votes**: Upvote/downvote system for questions and answers
- **Comments**: User comments on questions and answers
- **Notifications**: Real-time notifications for user interactions
- **Mentions**: User mention system for engagement

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### 1. Install Dependencies
```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all
```

### 2. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio for database management
npm run db:studio
```

### 3. Environment Configuration
```bash
# Backend environment
cd backend
cp env.example .env
# Edit .env with your database credentials and JWT secret
```

### 4. Start Development Servers
```bash
# Start both backend and frontend simultaneously
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Questions
- `GET /api/question` - Get all questions with filtering
- `POST /api/question` - Create question
- `GET /api/question/:slug` - Get question by slug
- `PATCH /api/question/:id` - Update question
- `DELETE /api/question/:id` - Delete question
- `POST /api/question/:id/upvote` - Upvote question
- `POST /api/question/:id/downvote` - Downvote question

### Answers
- `POST /api/answer` - Create answer
- `PATCH /api/answer/:id` - Update answer
- `DELETE /api/answer/:id` - Delete answer
- `POST /api/answer/:id/accept` - Accept answer
- `POST /api/answer/:id/upvote` - Upvote answer
- `POST /api/answer/:id/downvote` - Downvote answer

### Users & Tags
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `GET /api/tags` - Get all tags
- `GET /api/tags/popular` - Get popular tags

## 🛠️ Development

### Available Scripts

**Root Level:**
```bash
npm run dev              # Start both frontend and backend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend
npm run build            # Build both applications
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
```

**Backend:**
```bash
cd backend
npm run dev              # Start with nodemon
npm start                # Start production server
```

**Frontend:**
```bash
cd Frontend1
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/stackit"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

### Database Configuration

The application uses Prisma with PostgreSQL:
- **Migrations**: Located in `backend/prisma/migrations/`
- **Schema**: Defined in `backend/prisma/schema.prisma`
- **Client**: Generated in `backend/node_modules/.prisma/client`

## 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **bcrypt**: Password hashing with salt rounds
- **Role-based Access**: User roles and permissions
- **Protected Routes**: Middleware for route protection
- **Rate Limiting**: API rate limiting for security
- **CORS**: Cross-origin resource sharing configuration

## 📱 Responsive Design

Both applications are fully responsive with:
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch-friendly**: Optimized for touch interactions

## 🧪 Testing

### Backend Testing
- Unit tests for controllers and utilities
- API endpoint testing
- Database integration tests

### Frontend Testing
- Component testing with React Testing Library
- User interaction testing
- API integration testing

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

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

## 📚 Additional Resources

- [Detailed Setup Guide](./setup.md) - Complete setup instructions
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

## 📄 License

This project is part of the Odoo Hackathon and is licensed under the MIT License.

## 🙏 Acknowledgments

- **Odoo**: For hosting the hackathon
- **Express.js Team**: For the amazing framework
- **Prisma**: For the excellent ORM
- **React Team**: For the powerful frontend framework
- **Tailwind CSS**: For the utility-first CSS framework

---

**Built with ❤️ for the Odoo Hackathon** 
