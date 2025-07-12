// QuestionCard - Summary card for displaying question overview
// TODO: Connect to backend for real question data and voting

import React from 'react';
import { MessageCircle, ChevronUp, Eye, Clock, User } from 'lucide-react';

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    excerpt?: string;
    tags: string[];
    votes: number;
    answers: number;
    views: number;
    author: {
      name: string;
      reputation: number;
      avatar?: string;
    };
    createdAt: Date;
    hasAcceptedAnswer?: boolean;
  };
  onQuestionClick?: (id: string) => void;
  onVote?: (id: string, direction: 'up' | 'down') => void;
  onTagClick?: (tag: string) => void;
}

export function QuestionCard({ question, onQuestionClick, onVote, onTagClick }: QuestionCardProps) {
  const handleVote = (direction: 'up' | 'down') => {
    // TODO: Connect to backend voting system
    onVote?.(question.id, direction);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex gap-6">
        {/* Vote and Stats Column */}
        <div className="flex flex-col items-center space-y-4 min-w-0">
          <div className="flex flex-col items-center space-y-1">
            <button
              onClick={() => handleVote('up')}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors group"
              aria-label="Vote up"
            >
              <ChevronUp className="h-5 w-5 text-gray-600 group-hover:text-orange-600" />
            </button>
            <span className="font-semibold text-lg text-gray-900">{question.votes}</span>
            <span className="text-xs text-gray-500">votes</span>
          </div>
          
          <div className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg ${
            question.hasAcceptedAnswer 
              ? 'bg-green-100 text-green-800' 
              : question.answers > 0 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span className="font-semibold">{question.answers}</span>
            </div>
            <span className="text-xs">answers</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-1 text-gray-600">
              <Eye className="h-4 w-4" />
              <span className="font-medium">{formatNumber(question.views)}</span>
            </div>
            <span className="text-xs text-gray-500">views</span>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <h3 
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer leading-relaxed mb-3 line-clamp-2"
            onClick={() => onQuestionClick?.(question.id)}
          >
            {question.title}
          </h3>
          
          {question.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {question.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>asked {formatTimeAgo(question.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {question.author.avatar ? (
                  <img 
                    src={question.author.avatar} 
                    alt={question.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {question.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                  {question.author.name}
                </span>
                <span className="text-gray-400">({question.author.reputation})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}