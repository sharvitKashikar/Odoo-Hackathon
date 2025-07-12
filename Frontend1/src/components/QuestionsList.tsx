import React from 'react';
import { Plus, ChevronUp, ChevronDown, MessageCircle, Eye, Clock, TrendingUp, Zap, Star, Heart } from 'lucide-react';
import { Question, User } from '../types';

interface QuestionsListProps {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
  onAskQuestion: () => void;
  onVote: (questionId: number, voteType: 'up' | 'down') => void;
  currentUser: User | null;
  sortBy: 'newest' | 'active' | 'unanswered' | 'votes';
  onSortChange: (sort: 'newest' | 'active' | 'unanswered' | 'votes') => void;
  getUserVote: (questionId: number) => 'up' | 'down' | null;
}

export function QuestionsList({ 
  questions, 
  onQuestionClick, 
  onAskQuestion, 
  onVote, 
  currentUser,
  sortBy,
  onSortChange,
  getUserVote
}: QuestionsListProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getSortIcon = (sort: string) => {
    switch (sort) {
      case 'newest': return <Clock className="h-4 w-4" />;
      case 'active': return <TrendingUp className="h-4 w-4" />;
      case 'votes': return <ChevronUp className="h-4 w-4" />;
      case 'unanswered': return <MessageCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {sortBy === 'unanswered' ? 'Unanswered Questions' : 'All Questions'}
            </h1>
            <p className="text-gray-600">Discover and share knowledge with the community</p>
          </div>
        </div>
        
        <button
          onClick={onAskQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Ask Question</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          {[
            { key: 'newest', label: 'Newest' },
            { key: 'active', label: 'Active' },
            { key: 'unanswered', label: 'Unanswered' },
            { key: 'votes', label: 'Most Votes' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onSortChange(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                sortBy === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 bg-white border border-gray-200'
              }`}
            >
              {getSortIcon(key)}
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{questions.length} questions</span>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <MessageCircle className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No questions found</h3>
          <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
            {sortBy === 'unanswered' 
              ? "All questions have been answered! Great job community." 
              : "Be the first to ask a question in this community."
            }
          </p>
          <button
            onClick={onAskQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors font-medium"
          >
            Ask the first question
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question) => {
            const userVote = getUserVote(question.id);
            return (
              <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex space-x-6">
                  <div className="flex flex-col items-center space-y-3 min-w-0">
                    <button
                      onClick={() => onVote(question.id, 'up')}
                      disabled={!currentUser}
                      className={`p-2 rounded-lg transition-colors ${
                        userVote === 'up' 
                          ? 'bg-green-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 bg-white border border-gray-200'
                      } ${!currentUser ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <div className="text-xl font-bold text-gray-900">
                      {question.votes}
                    </div>
                    <button
                      onClick={() => onVote(question.id, 'down')}
                      disabled={!currentUser}
                      className={`p-2 rounded-lg transition-colors ${
                        userVote === 'down' 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-red-600 bg-white border border-gray-200'
                      } ${!currentUser ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2 text-sm min-w-0">
                    <div className={`px-3 py-2 rounded-lg font-bold text-center ${
                      question.answers > 0 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      <div className="text-lg">{question.answers}</div>
                      <div className="text-xs">answers</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2 text-sm min-w-0">
                    <div className="px-3 py-2 rounded-lg font-bold text-center bg-blue-100 text-blue-700 border border-blue-200">
                      <div className="text-lg">{formatNumber(question.views)}</div>
                      <div className="text-xs">views</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer mb-3 transition-colors"
                      onClick={() => onQuestionClick(question)}
                    >
                      {question.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4" />
                        <span>asked {formatDate(question.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg text-white text-xs flex items-center justify-center font-bold">
                          {question.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                          {question.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}