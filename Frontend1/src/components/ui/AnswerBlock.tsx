// AnswerBlock - Individual answer display with voting and formatting
// TODO: Connect to backend for answer voting and acceptance

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check, Flag, Share2, Edit, User } from 'lucide-react';

interface AnswerBlockProps {
  answer: {
    id: string;
    content: string;
    votes: number;
    isAccepted: boolean;
    author: {
      name: string;
      reputation: number;
      avatar?: string;
    };
    createdAt: Date;
    editedAt?: Date;
  };
  canAccept?: boolean;
  canEdit?: boolean;
  onVote?: (id: string, direction: 'up' | 'down') => void;
  onAccept?: (id: string) => void;
  onEdit?: (id: string) => void;
  onFlag?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function AnswerBlock({ 
  answer, 
  canAccept = false, 
  canEdit = false,
  onVote, 
  onAccept, 
  onEdit, 
  onFlag, 
  onShare 
}: AnswerBlockProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    // TODO: Connect to backend voting system
    setUserVote(userVote === direction ? null : direction);
    onVote?.(answer.id, direction);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`border-l-4 pl-6 py-6 ${
      answer.isAccepted ? 'border-green-500 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex gap-6">
        {/* Vote Column */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => handleVote('up')}
            className={`p-2 rounded-full transition-colors ${
              userVote === 'up' 
                ? 'bg-orange-100 text-orange-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Vote up"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          
          <span className="text-xl font-semibold text-gray-900">{answer.votes}</span>
          
          <button
            onClick={() => handleVote('down')}
            className={`p-2 rounded-full transition-colors ${
              userVote === 'down' 
                ? 'bg-orange-100 text-orange-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Vote down"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
          
          {canAccept && (
            <button
              onClick={() => onAccept?.(answer.id)}
              className={`p-2 rounded-full transition-colors ${
                answer.isAccepted 
                  ? 'bg-green-100 text-green-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label={answer.isAccepted ? 'Accepted answer' : 'Accept answer'}
            >
              <Check className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {answer.isAccepted && (
            <div className="flex items-center space-x-2 mb-4 text-green-600">
              <Check className="h-5 w-5" />
              <span className="font-medium text-sm">Accepted Answer</span>
            </div>
          )}
          
          <div className="prose max-w-none mb-6">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: answer.content }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onShare?.(answer.id)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              {canEdit && (
                <button
                  onClick={() => onEdit?.(answer.id)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
              
              <button
                onClick={() => onFlag?.(answer.id)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Flag className="h-4 w-4" />
                <span>Flag</span>
              </button>
            </div>
            
            <div className={`p-3 rounded-lg ${
              answer.isAccepted ? 'bg-green-100 border border-green-200' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="text-sm text-gray-600 mb-1">
                answered {formatTimeAgo(answer.createdAt)}
                {answer.editedAt && (
                  <span className="ml-2">• edited {formatTimeAgo(answer.editedAt)}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {answer.author.avatar ? (
                  <img 
                    src={answer.author.avatar} 
                    alt={answer.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full text-white text-sm flex items-center justify-center font-semibold">
                    {answer.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                    {answer.author.name}
                  </div>
                  <div className="text-xs text-gray-500">{answer.author.reputation} reputation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}