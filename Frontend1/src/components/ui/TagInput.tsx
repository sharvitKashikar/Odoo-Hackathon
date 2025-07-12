// TagInput - Multi-select tags with add/remove functionality
// TODO: Connect to backend for tag suggestions and validation

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Hash } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
  className?: string;
}

export function TagInput({ 
  tags, 
  onChange, 
  suggestions = [], 
  maxTags = 5,
  placeholder = "Add tags...",
  className = ""
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        suggestion => 
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions, tags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      // TODO: Validate tag against backend rules
      onChange([...tags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="border border-gray-300 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              <Hash className="h-3 w-3" />
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(filteredSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length >= maxTags ? `Maximum ${maxTags} tags` : placeholder}
            disabled={tags.length >= maxTags}
            className="flex-1 outline-none text-sm placeholder-gray-500 disabled:text-gray-400"
          />
          
          {inputValue && (
            <button
              onClick={() => addTag(inputValue)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add tag"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {tags.length}/{maxTags} tags • Press Enter or comma to add
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}