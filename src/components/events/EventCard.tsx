import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, Users, MapPin, Music, Share2 } from 'lucide-react';
import type { Event } from '../../types';
import SimpleShareModal from './social/SimpleShareModal';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const completedItems = event.checklist.filter(item => item.completed).length;
  const totalItems = event.checklist.length;
  const progress = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  return (
    <>
      <div 
        onClick={onClick}
        className="group relative w-full text-left overflow-hidden rounded-2xl border border-gray-200/50 
                  hover:border-transparent transition-all duration-300 cursor-pointer"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-purple-600/0 to-pink-600/0 
                     group-hover:from-indigo-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 
                     transition-all duration-500" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">{event.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                  {event.type}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-gray-600 
                       hover:text-indigo-600 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Checklist Progress</span>
                <span>{completedItems}/{totalItems} tasks</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              {event.venue && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.venue}
                </div>
              )}
              {event.expectedAttendees && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {event.expectedAttendees} attendees
                </div>
              )}
              {event.type === 'concert' && (
                <div className="flex items-center text-sm text-gray-600">
                  <Music className="w-4 h-4 mr-2" />
                  Live Music
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SimpleShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={event}
      />
    </>
  );
}