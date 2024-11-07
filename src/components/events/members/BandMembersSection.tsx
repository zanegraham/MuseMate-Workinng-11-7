import React, { useState } from 'react';
import { Users, Plus, Bell, Music2, Calendar } from 'lucide-react';
import type { BandMember } from '../../../types';
import BandMembersList from './BandMembersList';
import AddMemberModal from './AddMemberModal';
import NotificationModal from './NotificationModal';

interface BandMembersSectionProps {
  members: BandMember[];
  onUpdate: (members: BandMember[]) => void;
  eventName: string;
  eventDate: Date;
  eventVenue?: string;
}

export default function BandMembersSection({
  members,
  onUpdate,
  eventName,
  eventDate,
  eventVenue,
}: BandMembersSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<BandMember | null>(null);

  const handleAddMember = (member: Omit<BandMember, 'id'>) => {
    onUpdate([...members, { ...member, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
  };

  const handleEditMember = (member: BandMember) => {
    onUpdate(members.map(m => m.id === member.id ? member : m));
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    onUpdate(members.filter(member => member.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Band Members & Crew
          </h2>
          <p className="text-sm text-gray-500">
            Manage your band members, crew, and their equipment
          </p>
        </div>
        <div className="flex gap-2 self-stretch sm:self-auto">
          {members.length > 0 && (
            <button
              onClick={() => setIsNotifyModalOpen(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Notify All
            </button>
          )}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* Event Summary */}
      {members.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-gray-700">
              {new Date(eventDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-gray-700">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </span>
          </div>
          {eventVenue && (
            <div className="flex items-center gap-2">
              <Music2 className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-gray-700">{eventVenue}</span>
            </div>
          )}
        </div>
      )}

      {members.length === 0 ? (
        <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-300">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No band members yet
          </h3>
          <p className="text-gray-500 mb-4">
            Add your band members to coordinate equipment and schedules
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            Add First Member
          </button>
        </div>
      ) : (
        <BandMembersList
          members={members}
          onEdit={setEditingMember}
          onDelete={handleDeleteMember}
        />
      )}

      <AddMemberModal
        isOpen={isAddModalOpen || !!editingMember}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMember(null);
        }}
        onAdd={handleAddMember}
        onEdit={handleEditMember}
        member={editingMember}
      />

      <NotificationModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
        members={members}
        eventName={eventName}
        eventDate={eventDate}
        eventVenue={eventVenue}
      />
    </div>
  );
}