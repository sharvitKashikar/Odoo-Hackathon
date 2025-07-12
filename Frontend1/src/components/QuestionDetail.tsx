import React from 'react';
import { Question, User, Answer } from '../types';
import { ChevronUp, ChevronDown, MessageCircle, Eye, Clock, Share2, Edit, Flag, Plus } from 'lucide-react';
import { RichTextEditor } from './ui/RichTextEditor';
import { AnswerBlock } from './ui/AnswerBlock';

interface QuestionDetailProps {
  question: Question;
  onBack: () => void;
  onVote: (questionId: number, voteType: 'up' | 'down') => void;
  onAddAnswer: (questionId: number, answerText: string) => void;
  currentUser: User | null;
  onUserClick: (user: User) => void;
  userVote: 'up' | 'down' | null;
}

export function QuestionDetail({ question, onBack, onVote, onAddAnswer, currentUser, onUserClick, userVote }: QuestionDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="text-blue-600 hover:underline mb-4">
        &larr; Back to Questions
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
      <p className="text-gray-700 mb-6">{question.body}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {question.tags.map(tag => (
          <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">Asked by {question.author} on {new Date(question.createdAt).toLocaleDateString()}</p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Answers ({question.answers})</h2>
        {question.answersList && question.answersList.length > 0 ? (
          question.answersList.map(answer => (
            <div key={answer.id} className="border-t border-gray-200 pt-4 mt-4">
              <p>{answer.body}</p>
              <p className="text-sm text-gray-500">Answered by {answer.author}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No answers yet. Be the first to answer!</p>
        )}
      </div>

      {currentUser && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Answer</h2>
          <RichTextEditor
            value=""
            onChange={(text) => { /* handle change */ }}
            placeholder="Write your answer here..."
            minHeight="150px"
          />
          <button
            onClick={() => onAddAnswer(question.id, "Placeholder Answer")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Post Your Answer
          </button>
        </div>
      )}
    </div>
  );
}