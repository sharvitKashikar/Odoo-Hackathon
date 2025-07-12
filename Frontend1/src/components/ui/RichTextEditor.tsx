import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Link, Code, List, ListOrdered, Quote, Image, Eye, Type, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  showPreview?: boolean;
  className?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  minHeight = "200px",
  showPreview = true,
  className = ""
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newValue);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold', shortcut: 'Ctrl+B' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic', shortcut: 'Ctrl+I' },
    { icon: Underline, action: () => insertMarkdown('<u>', '</u>'), title: 'Underline', shortcut: 'Ctrl+U' },
    { icon: Strikethrough, action: () => insertMarkdown('~~', '~~'), title: 'Strikethrough' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Quote, action: () => insertMarkdown('> '), title: 'Quote' },
    { icon: List, action: () => insertMarkdown('- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), title: 'Numbered List' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
  ];

  // Enhanced markdown to HTML converter
  const markdownToHtml = (markdown: string) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-900 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-900 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Underline and Strikethrough
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500">$1</del>')
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-4" />')
      // Quotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">$1</blockquote>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-4">$1</ul>')
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          insertMarkdown('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', '*');
          break;
        case 'u':
          e.preventDefault();
          insertMarkdown('<u>', '</u>');
          break;
      }
    }
  };

  return (
    <div className={`border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-white ${className}`}>
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200 group"
                title={`${button.title} ${button.shortcut ? `(${button.shortcut})` : ''}`}
                type="button"
              >
                <button.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
              </button>
            ))}
          </div>
          
          {showPreview && (
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isPreview 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-white hover:shadow-md text-gray-600'
              }`}
              type="button"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isPreview ? 'Edit' : 'Preview'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-6 prose max-w-none min-h-[200px] bg-gradient-to-br from-white to-gray-50"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(value) || '<p class="text-gray-500 italic">Nothing to preview...</p>' 
            }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-6 resize-none focus:outline-none focus:ring-0 border-0 bg-gradient-to-br from-white to-gray-50 placeholder-gray-400"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Footer with formatting help */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Use <strong>**bold**</strong>, <em>*italic*</em>, `code`, and &gt; quotes. 
            <button className="text-blue-600 hover:text-blue-800 ml-2 font-medium">
              Formatting guide
            </button>
          </div>
          <div className="text-xs text-gray-400">
            {value.length} characters
          </div>
        </div>
      </div>
    </div>
  );
}