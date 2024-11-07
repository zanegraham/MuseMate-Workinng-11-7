import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Users, MapPin, Edit2, ShoppingBag, Package, CheckSquare, Share2, MessageCircle, Music } from 'lucide-react';
import type { Event, Item } from '../../types';
import ChecklistSection from './checklist/ChecklistSection';
import AddItemsModal from './checklist/AddItemsModal';
import EventNotesSection from './notes/EventNotesSection';
import EditEventModal from './EditEventModal';
import MerchandiseSection from './merchandise/MerchandiseSection';
import EquipmentSection from './equipment/EquipmentSection';
import BandMembersSection from './members/BandMembersSection';
import ShareEventModal from './social/ShareEventModal';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onUpdateEvent: (updatedEvent: Event) => void;
  items: Item[];
}

export default function EventDetails({ event, onBack, onUpdateEvent, items }: EventDetailsProps) {
  const [isAddItemsModalOpen, setIsAddItemsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'notes' | 'members' | 'merch' | 'equipment'>('checklist');

  const handleToggleItem = (itemId: string) => {
    const updatedChecklist = event.checklist.map(item => 
      item.itemId === itemId ? { ...item, completed: !item.completed } : item
    );
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedChecklist = event.checklist.filter(item => item.itemId !== itemId);
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const handleAddItems = (selectedItemIds: string[]) => {
    const newItems = selectedItemIds
      .filter(id => !event.checklist.some(item => item.itemId === id))
      .map(id => ({ itemId: id, completed: false }));
    
    onUpdateEvent({
      ...event,
      checklist: [...event.checklist, ...newItems],
    });
    setIsAddItemsModalOpen(false);
  };

  const handleUpdateNotes = (notes: string) => {
    onUpdateEvent({ ...event, notes });
  };

  const handleUpdateDetails = (details: Record<string, any>) => {
    onUpdateEvent({ ...event, details });
  };

  const handleUpdateMerchandise = (merchandise: Event['merchandise']) => {
    onUpdateEvent({ ...event, merchandise });
  };

  const handleUpdateEquipment = (equipment: Event['equipment']) => {
    onUpdateEvent({ ...event, equipment });
  };

  const handleUpdateMembers = (members: Event['members']) => {
    onUpdateEvent({ ...event, members });
  };

  const tabs = [
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'members', label: 'Band & Crew', icon: Users },
    { id: 'merch', label: 'Merchandise', icon: ShoppingBag },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'notes', label: 'Notes', icon: MessageCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(event.date).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </div>
                  )}
                  {event.type === 'concert' && (
                    <div className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      Concert
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Event
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                         transition-colors duration-200 ${
                           activeTab === id
                             ? 'bg-indigo-50 text-indigo-700'
                             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                         }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg my-6">
          {activeTab === 'checklist' && (
            <>
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={() => setIsAddItemsModalOpen(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Items
                </button>
              </div>
              <ChecklistSection
                checklist={event.checklist}
                items={items}
                onToggleItem={handleToggleItem}
                onRemoveItem={handleRemoveItem}
              />
            </>
          )}

          {activeTab === 'notes' && (
            <EventNotesSection
              notes={event.notes || ''}
              onUpdateNotes={handleUpdateNotes}
              details={event.details || {}}
              onUpdateDetails={handleUpdateDetails}
            />
          )}

          {activeTab === 'members' && (
            <BandMembersSection
              members={event.members || []}
              onUpdate={handleUpdateMembers}
              eventName={event.name}
              eventDate={event.date}
              eventVenue={event.venue}
            />
          )}

          {activeTab === 'merch' && (
            <MerchandiseSection
              merchandise={event.merchandise || []}
              onUpdate={handleUpdateMerchandise}
            />
          )}

          {activeTab === 'equipment' && (
            <EquipmentSection
              equipment={event.equipment || []}
              onUpdate={handleUpdateEquipment}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddItemsModal
        isOpen={isAddItemsModalOpen}
        onClose={() => setIsAddItemsModalOpen(false)}
        onAdd={handleAddItems}
        items={items}
        existingItemIds={event.checklist.map(item => item.itemId)}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onUpdate={onUpdateEvent}
      />

      <ShareEventModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={event}
      />
    </div>
  );
}