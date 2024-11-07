import React, { useState } from 'react';
import { Plus, Calendar, Sparkles } from 'lucide-react';
import type { Event } from '../../types';
import { useStore } from '../../store';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';
import EventDetails from './EventDetails';

export default function EventList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, items, addEvent, updateEvent } = useStore();

  const handleCreateEvent = (newEvent: Omit<Event, 'id'>) => {
    addEvent(newEvent);
    setIsCreateModalOpen(false);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    updateEvent(updatedEvent);
    setSelectedEvent(updatedEvent);
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        onUpdateEvent={handleUpdateEvent}
        items={items}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Events
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage your creative events
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary group flex items-center gap-2 self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
          <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-300">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
          <p className="text-gray-500 mb-4">Start by creating your first event</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      )}

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}