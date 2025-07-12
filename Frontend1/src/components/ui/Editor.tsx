// Editor - Reusable rich text editor component
// TODO: Integrate with a rich text editor library like TinyMCE or Quill

import React, { useState, useRef } from 'react';
import { Bold, Italic, Link, Code, List, ListOrdered, Quote, Image, Eye } from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  showPreview?: boolean;
  className?: string;
}

export function Editor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  minHeight = "200px",
  showPreview = true,
  className = ""
}: EditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = '') => {
    // TODO: Implement proper markdown insertion logic
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
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Quote, action: () => insertMarkdown('> '), title: 'Quote' },
    { icon: List, action: () => insertMarkdown('- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), title: 'Numbered List' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
  ];

  // Simple markdown to HTML converter (basic implementation)
  const markdownToHtml = (markdown: string) => {
    // TODO: Use a proper markdown parser like marked or remark
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside">$1</ul>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={`border border-gray-300 rounded-2xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title={button.title}
                type="button"
              >
                <button.icon className="h-4 w-4 text-gray-600" />
              </button>
            ))}
          </div>
          
          {showPreview && (
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isPreview ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-600'
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
            className="p-4 prose max-w-none"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(value) || '<p class="text-gray-500">Nothing to preview...</p>' }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 resize-none focus:outline-none focus:ring-0 border-0"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Footer with formatting help */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="text-xs text-gray-500">
          Use <strong>**bold**</strong>, <em>*italic*</em>, `code`, and > quotes. 
          <button className="text-blue-600 hover:text-blue-800 ml-2">
            Formatting help
          </button>
        </div>
      </div>
    </div>
  );
}