import React, { useState } from 'react';
import { X, HelpCircle, Lightbulb, AlertCircle, Sparkles, Zap } from 'lucide-react';
import { User } from '../types';
import { RichTextEditor } from './ui/RichTextEditor';

interface AskQuestionProps {
  onSubmit: (question: {
    title: string;
    body: string;
    tags: string[];
    author: int;
  }) => void;
  onCancel: () => void;
  currentUser: User | null;
}

export function AskQuestion({ onSubmit, onCancel, currentUser }: AskQuestionProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    onSubmit({
      title,
      body,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: currentUser.name
    });
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 text-center shadow-xl">
          <AlertCircle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Login Required</h2>
          <p className="text-yellow-700 mb-6 text-lg">You must be logged in to ask a question.</p>
          <button
            onClick={onCancel}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Ask a Public Question
          </h1>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Lightbulb className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3 text-lg">Writing a great question</h3>
                <p className="text-blue-800 mb-4">
                  You're ready to ask a programming-related question and this form will help guide you through the process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Be specific</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Include examples</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Add relevant tags</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label htmlFor="title" className="block text-lg font-bold text-gray-900 mb-3">
                Title
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Be specific and imagine you're asking a question to another person.
              </p>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                required
                minLength={15}
              />
              <div className="mt-3 text-sm text-gray-500">
                {title.length < 15 && title.length > 0 && (
                  <span className="text-red-500 font-medium">Title must be at least 15 characters.</span>
                )}
                {title.length >= 15 && (
                  <span className="text-green-500 font-medium">✓ Good title length</span>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label htmlFor="body" className="block text-lg font-bold text-gray-900 mb-3">
                What are the details of your problem?
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Introduce the problem and expand on what you put in the title. Minimum 30 characters.
              </p>
              
              <RichTextEditor
                value={body}
                onChange={setBody}
                placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened."
                minHeight="300px"
              />
              
              <div className="mt-3 text-sm text-gray-500">
                {body.length < 30 && body.length > 0 && (
                  <span className="text-red-500 font-medium">Body must be at least 30 characters.</span>
                )}
                {body.length >= 30 && (
                  <span className="text-green-500 font-medium">✓ Good description length</span>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label htmlFor="tags" className="block text-lg font-bold text-gray-900 mb-3">
                Tags
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
              </p>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. javascript, python, react (comma separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <div className="mt-3 text-sm text-gray-500">
                Separate multiple tags with commas. At least 1 tag required, maximum 5 tags.
              </div>
              
              {tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.split(',').map((tag, index) => {
                    const trimmedTag = tag.trim();
                    if (!trimmedTag) return null;
                    return (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-100 text-blue-800 border border-blue-200 font-medium">
                        {trimmedTag}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors font-medium text-lg"
                disabled={title.length < 15 || body.length < 30 || !tags.trim()}
              >
                Post Your Question
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-600 hover:text-gray-900 px-6 py-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 shadow-lg">
            <div className="flex items-start space-x-3">
              <HelpCircle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Step 1: Draft your question</h4>
                <p className="text-sm text-yellow-700">
                  The community is here to help you with specific programming problems, but we expect you to do your homework first.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              How to Ask
            </h4>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Search, and research</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Write a title that summarizes the specific problem</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Describe the problem before any code</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Help others reproduce the problem</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include all relevant tags</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Proof-read before posting</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-green-800 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• Include error messages</li>
              <li>• Show what you've tried</li>
              <li>• Use code formatting</li>
              <li>• Be respectful and patient</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}