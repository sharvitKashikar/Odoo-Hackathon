import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Users, 
  ThumbsUp, 
  Eye, 
  Coffee, 
  Github, 
  Zap, 
  Globe,
  Cpu
} from 'lucide-react';
import { Question, User } from '../types';

interface HomePageProps {
  onNavigateToQuestions: () => void;
  onAskQuestion: () => void;
  recentQuestions: Question[];
  onQuestionClick: (question: Question) => void;
  currentUser: User | null;
  onUserClick: (user: User) => void;
  topContributors: User[];
}

export function HomePage({ 
  onNavigateToQuestions, 
  onAskQuestion, 
  recentQuestions = [], 
  onQuestionClick, 
  currentUser,
  onUserClick,
  topContributors = []
}: HomePageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Get help from the community by asking detailed questions with code snippets and examples."
    },
    {
      icon: Users,
      title: "Share Knowledge",
      description: "Answer questions and help others learn while building your reputation in the community."
    },
    {
      icon: ThumbsUp,
      title: "Vote & Rate",
      description: "Vote on questions and answers to help the best content rise to the top."
    },
    {
      icon: Eye,
      title: "Track Progress",
      description: "Monitor your reputation, badges, and contributions as you grow in the community."
    }
  ];

  const technologies = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", 
    "Java", "C++", "Go", "Rust", "PHP", "Ruby", "Swift"
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const formatReputation = (rep: number) => {
    if (rep >= 1000000) return `${(rep / 1000000).toFixed(1)}M`;
    if (rep >= 1000) return `${(rep / 1000).toFixed(1)}k`;
    return rep.toString();
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">StackIt</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The community-driven platform where developers ask questions, share knowledge, and build their careers together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onAskQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Ask a Question
          </button>
          <button
            onClick={onNavigateToQuestions}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Questions
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{recentQuestions.length}</div>
          <div className="text-gray-600">Questions</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {recentQuestions.reduce((sum, q) => sum + q.answers, 0)}
          </div>
          <div className="text-gray-600">Answers</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{topContributors.length}</div>
          <div className="text-gray-600">Contributors</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {recentQuestions.reduce((sum, q) => sum + q.votes, 0)}
          </div>
          <div className="text-gray-600">Votes</div>
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Built for Developers</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you're debugging code at 2 AM or learning a new framework, our community is here to help.
          </p>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-3">
              <Coffee className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">24/7 community support</span>
            </div>
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Open source friendly</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Career advancement opportunities</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-2 font-mono">terminal</span>
          </div>
          <div className="font-mono text-sm space-y-2">
            <div className="text-green-400">$ npm install stackit-knowledge</div>
            <div className="text-gray-400">✓ Installing community wisdom...</div>
            <div className="text-gray-400">✓ Connecting to expert network...</div>
            <div className="text-blue-400">Welcome to StackIt! 🚀</div>
            <div className="text-gray-500">$ _</div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      {topContributors.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Top Contributors</h2>
            <button
              onClick={() => onNavigateToQuestions()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <span>view all contributors</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topContributors.slice(0, 4).map((contributor) => (
              <div
                key={contributor.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => onUserClick(contributor)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg text-white text-lg flex items-center justify-center font-bold">
                    {contributor.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{contributor.name || 'Anonymous'}</h3>
                    <div className="text-blue-600 text-sm">{formatReputation(contributor.reputation || 0)} rep</div>
                  </div>
                </div>
                
                <div className="text-gray-600 text-sm mb-4">
                  {contributor.bio?.substring(0, 80) || 'No bio available'}...
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{contributor.questionsAsked || 0} questions</span>
                  <span className="text-gray-500">{contributor.answersGiven || 0} answers</span>
                </div>
                
                {contributor.topTags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {contributor.topTags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 border border-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Developers Choose StackIt
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Technologies */}
      <section className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Technologies</h2>
          <p className="text-gray-600">Find answers for the technologies you use every day</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <Cpu className="h-4 w-4 mr-2 text-blue-600" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Questions Preview */}
      {recentQuestions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Questions</h2>
            <button
              onClick={onNavigateToQuestions}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <span>view all questions</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentQuestions.slice(0, 3).map((question) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => onQuestionClick(question)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="text-lg font-bold text-blue-600">{question.votes}</div>
                    <div className="text-xs text-gray-500">votes</div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className={`text-lg font-bold ${question.answers > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {question.answers}
                    </div>
                    <div className="text-xs text-gray-500">answers</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                      {question.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {question.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 border border-blue-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>by {question.author}</span>
                      <span>{formatDate(question.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      {!currentUser && (
        <section className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Join the StackIt Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with thousands of developers, share your knowledge, and accelerate your career growth.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
            Get Started Today
          </button>
        </section>
      )}
    </div>
  );
}