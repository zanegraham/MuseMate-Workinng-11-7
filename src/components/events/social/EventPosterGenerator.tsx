import React, { useState } from 'react';
import { Share2, Download, Instagram, Copy, Check, RefreshCw } from 'lucide-react';
import type { Event } from '../../../types';

interface EventPosterGeneratorProps {
  event: Event;
}

export default function EventPosterGenerator({ event }: EventPosterGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      name: 'Minimal',
      gradient: 'from-violet-600 to-indigo-600',
      textColor: 'text-white',
    },
    {
      name: 'Neon',
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      textColor: 'text-white',
    },
    {
      name: 'Sunset',
      gradient: 'from-orange-500 via-pink-500 to-purple-500',
      textColor: 'text-white',
    }
  ];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleCopyLink = () => {
    // In a real app, this would generate and copy a shareable link
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-600" />
          Share Event
        </h3>
        <button
          onClick={() => setSelectedTemplate((prev) => (prev + 1) % templates.length)}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Change Style
        </button>
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div 
          className={`w-[400px] h-[400px] rounded-lg overflow-hidden shadow-lg
                     bg-gradient-to-br ${templates[selectedTemplate].gradient}`}
        >
          <div className="w-full h-full p-8 flex flex-col justify-between backdrop-blur-sm">
            {/* Event Type Badge */}
            <div className="text-center">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium 
                            bg-white/20 backdrop-blur-sm ${templates[selectedTemplate].textColor}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>

            {/* Event Details */}
            <div className="text-center space-y-4">
              <h2 className={`text-3xl font-bold ${templates[selectedTemplate].textColor}`}>
                {event.name}
              </h2>
              
              <div className={`space-y-2 ${templates[selectedTemplate].textColor}`}>
                <p className="text-xl font-medium">{formatDate(event.date)}</p>
                <p className="text-lg">{formatTime(event.date)}</p>
                {event.venue && (
                  <p className="text-lg font-medium">{event.venue}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className={`text-center ${templates[selectedTemplate].textColor}`}>
              <p className="text-sm font-medium opacity-75">
                Powered by MuseMate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleCopyLink}
          className="btn-secondary flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>
        <a
          href={`https://instagram.com/create/story`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2"
        >
          <Instagram className="w-4 h-4" />
          Share to Instagram
        </a>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Tip: Share to Instagram Stories for maximum visibility
      </p>
    </div>
  );
}