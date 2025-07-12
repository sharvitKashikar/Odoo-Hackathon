# Odoo Hackathon - StackIt Q&A Platform

A modern, full-stack Q&A platform built for the Odoo Hackathon, featuring a Next.js backend with authentication and a React frontend with real-time interactions.

## 🚀 Project Overview

StackIt is a comprehensive Q&A platform inspired by Stack Overflow, designed to help developers ask questions, share knowledge, and build communities. The project consists of two main applications:

- **Backend (StackIt)**: A Next.js 14 application with authentication, database management, and API endpoints
- **Frontend**: A React + TypeScript application with modern UI components and real-time features

## 🏗️ Architecture

### Backend (StackIt)
- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS with shadcn/ui components
- **Real-time**: Pusher for notifications
- **File Upload**: UploadThing for media handling
- **Rich Text**: TipTap editor for content creation

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks and local state
- **Icons**: Lucide React

## ✨ Features

### Core Q&A Functionality
- **Ask Questions**: Rich text editor with code formatting, images, and links
- **Answer Questions**: Provide detailed answers with markdown support
- **Voting System**: Upvote/downvote questions and answers
- **Comments**: Add comments to questions and answers
- **Tags**: Categorize questions with relevant tags
- **Search**: Full-text search across questions, tags, and content

### User Management
- **Authentication**: Secure login/register with email or username
- **User Profiles**: Detailed user profiles with reputation system
- **Role-based Access**: Guest, User, and Admin roles
- **Reputation System**: Earn reputation through helpful contributions

### Community Features
- **User Mentions**: Mention other users in comments and answers
- **Notifications**: Real-time notifications for interactions
- **User Activity**: Track questions asked, answers given, and reputation
- **Popular Tags**: Discover trending topics and categories

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Theme support (planned)
- **Accessibility**: WCAG compliant components
- **Loading States**: Smooth loading and error handling

## 📁 Project Structure

```
Odoo-Hackathon/
├── backendfolder/
│   └── stackit/                 # Next.js Backend Application
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   │   ├── (auth)/     # Authentication pages
│       │   │   ├── (protected)/ # Protected routes
│       │   │   └── api/        # API endpoints
│       │   ├── components/     # Reusable UI components
│       │   ├── lib/           # Utilities and configurations
│       │   └── types/         # TypeScript type definitions
│       ├── prisma/            # Database schema and migrations
│       └── package.json
├── Frontend/                   # React Frontend Application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── data/             # Mock data for development
│   │   ├── types/            # TypeScript interfaces
│   │   └── App.tsx           # Main application component
│   └── package.json
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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Backend Setup (StackIt)

1. **Clone and navigate to backend**
   ```bash
   cd backendfolder/stackit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/stackit"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   PUSHER_APP_ID="your-pusher-app-id"
   PUSHER_KEY="your-pusher-key"
   PUSHER_SECRET="your-pusher-secret"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🛠️ Development

### Backend Development

- **API Routes**: Located in `src/app/api/`
- **Database Operations**: Use Prisma Client in `src/lib/prisma.ts`
- **Authentication**: Configured in `src/lib/auth.ts`
- **Components**: Reusable UI components in `src/components/`

### Frontend Development

- **State Management**: Uses React hooks and local state
- **Routing**: Component-based routing with state management
- **Data**: Mock data in `src/data/` for development
- **Components**: Modular component architecture

### Key Scripts

**Backend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Environment Variables

**Backend (.env.local):**
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for JWT tokens
- `NEXTAUTH_URL`: Application URL
- `PUSHER_*`: Pusher configuration for real-time features
- `UPLOADTHING_*`: File upload service configuration

### Database Configuration

The application uses Prisma with PostgreSQL. Key configurations:

- **Migrations**: Located in `prisma/migrations/`
- **Schema**: Defined in `prisma/schema.prisma`
- **Client**: Generated in `node_modules/.prisma/client`

## 🎨 UI Components

The project uses a custom component library built with:
- **shadcn/ui**: Base component library
- **Radix UI**: Accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

### Key Components
- **Forms**: Login, registration, question asking
- **Cards**: Question display, user profiles
- **Navigation**: Header, sidebar, breadcrumbs
- **Modals**: Login, confirmation dialogs
- **Rich Text Editor**: TipTap-based content editor

## 🔐 Authentication & Security

- **NextAuth.js**: JWT-based authentication
- **bcrypt**: Password hashing
- **Role-based Access**: User roles and permissions
- **Protected Routes**: Route groups for authenticated users
- **Session Management**: Secure session handling

## 📱 Responsive Design

Both applications are fully responsive with:
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch-friendly**: Optimized for touch interactions
- **Progressive Enhancement**: Works without JavaScript

## 🧪 Testing

### Backend Testing
- Unit tests for utilities and helpers
- API endpoint testing
- Database integration tests

### Frontend Testing
- Component testing with React Testing Library
- User interaction testing
- Responsive design testing

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to Vercel, Netlify, or your preferred platform

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Database Deployment
1. Set up PostgreSQL database
2. Run migrations: `npx prisma migrate deploy`
3. Update environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Odoo Hackathon and is licensed under the MIT License.

## 🙏 Acknowledgments

- **Odoo**: For hosting the hackathon
- **Next.js Team**: For the amazing framework
- **Prisma**: For the excellent ORM
- **shadcn/ui**: For the beautiful component library
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

For questions or support:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the Odoo Hackathon** 
