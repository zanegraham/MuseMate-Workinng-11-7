import React, { useState, useRef } from 'react';
import { X, Share2, Download, Instagram, Copy, Check, RefreshCw, Sparkles } from 'lucide-react';
import type { Event } from '../../../types';
import html2canvas from 'html2canvas';

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const backgroundImages = [
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    label: 'Concert',
  },
  {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    label: 'Party',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    label: 'DJ',
  },
  {
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    label: 'Art',
  },
];

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
  },
];

export default function ShareEventModal({ isOpen, onClose, event }: ShareEventModalProps) {
  const [selectedBg, setSelectedBg] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `${event.name}-event.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleShareToInstagram = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      const imageUrl = canvas.toDataURL('image/png');
      const shareUrl = `instagram://library?AssetPath=${encodeURIComponent(imageUrl)}`;
      window.location.href = shareUrl;
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-medium text-gray-900">Share Your Event</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Preview */}
          <div 
            ref={previewRef}
            className="relative aspect-[3/4] max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${backgroundImages[selectedBg].url})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${templates[selectedTemplate].gradient} 
                          opacity-75 transition-all duration-300`} />
            
            <div className="relative h-full p-8 flex flex-col justify-between">
              <div className="text-center">
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-white/20 
                             backdrop-blur-sm text-white">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white">{event.name}</h2>
                <div className="space-y-2 text-white">
                  <p className="text-xl">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-lg">
                    {new Date(event.date).toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                  {event.venue && (
                    <p className="text-lg font-medium">{event.venue}</p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 
                             backdrop-blur-sm text-white text-sm">
                  <Sparkles className="w-4 h-4" />
                  Powered by MuseMate
                </div>
              </div>
            </div>
          </div>

          {/* Style Options */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {backgroundImages.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBg(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2
                              transition-all duration-200
                              ${selectedBg === index ? 'border-indigo-500 scale-105' : 'border-transparent'}`}
                  >
                    <img
                      src={bg.url}
                      alt={bg.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <div className="flex gap-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTemplate(index)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200
                              ${selectedTemplate === index
                                ? 'bg-indigo-100 text-indigo-800 scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center gap-2 flex-1"
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

            <button
              onClick={handleShareToInstagram}
              className="btn-primary flex items-center gap-2 flex-1"
            >
              <Instagram className="w-4 h-4" />
              Share to Instagram
            </button>

            <button 
              onClick={handleDownload}
              className="btn-secondary flex items-center gap-2 flex-1"
            >
              <Download className="w-4 h-4" />
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}