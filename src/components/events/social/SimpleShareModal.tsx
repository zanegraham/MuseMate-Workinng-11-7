import React, { useState } from 'react';
import { X, Share2, Copy, Check, Instagram, Twitter, Download } from 'lucide-react';
import type { Event } from '../../../types';

interface SimpleShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export default function SimpleShareModal({ isOpen, onClose, event }: SimpleShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `https://musemate.app/e/${event.id}`; // Example URL
  const shareText = `${event.name} - ${new Date(event.date).toLocaleDateString()} ${event.venue ? `at ${event.venue}` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download the event image
    const element = document.createElement('a');
    element.href = '#'; // Would be actual image URL
    element.download = `${event.name}-event.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Share Event</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Preview */}
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200/50">
            <h4 className="font-medium text-gray-900 mb-1">{event.name}</h4>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()}
              {event.venue && ` • ${event.venue}`}
            </p>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 space-y-2">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 
                     transition-colors duration-200 group"
          >
            <div className="flex items-center gap-3">
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-900">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </div>
          </button>

          <a
            href={`https://instagram.com/create/story?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 
                     transition-colors duration-200 group"
          >
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Share to Instagram</span>
            </div>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 
                     transition-colors duration-200 group"
          >
            <div className="flex items-center gap-3">
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Share to Twitter</span>
            </div>
          </a>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 
                     transition-colors duration-200 group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Download Image</span>
            </div>
          </button>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            Share your event to reach more people!
          </p>
        </div>
      </div>
    </div>
  );
}