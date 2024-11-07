import React, { useState } from 'react';
import { X, Send, Clock, Calendar, MapPin } from 'lucide-react';
import type { BandMember } from '../../../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: BandMember[];
  eventName: string;
  eventDate: Date;
  eventVenue?: string;
}

export default function NotificationModal({
  isOpen,
  onClose,
  members,
  eventName,
  eventDate,
  eventVenue,
}: NotificationModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'email' | 'sms'>('email');

  const templates = [
    {
      title: 'Event Details',
      content: `Hi everyone,\n\nHere are the details for ${eventName}:\n\nDate: ${new Date(eventDate).toLocaleDateString()}\nTime: ${new Date(eventDate).toLocaleTimeString()}\n${eventVenue ? `Venue: ${eventVenue}\n` : ''}\nPlease confirm your availability.`
    },
    {
      title: 'Equipment Check',
      content: `Hi everyone,\n\nPlease confirm you have all necessary equipment for ${eventName}. Let me know if you need anything.`
    },
    {
      title: 'Schedule Update',
      content: `Hi everyone,\n\nThere's been an update to the schedule for ${eventName}. Please check the event details in MuseMate.`
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send notifications through your backend
    const recipientEmails = members
      .filter(member => selectedMembers.includes(member.id))
      .map(member => member.email)
      .join(', ');
    
    alert(`Notification would be sent to: ${recipientEmails}\n\nMessage: ${message}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Send Notification</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedMembers(members.map(m => m.id))}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Select All
              </button>
              {members.map(member => (
                <label key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedMembers.includes(member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers(prev => [...prev, member.id]);
                      } else {
                        setSelectedMembers(prev => prev.filter(id => id !== member.id));
                      }
                    }}
                  />
                  <span className="ml-2 text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="text-indigo-600 focus:ring-indigo-500"
                  checked={notificationType === 'email'}
                  onChange={() => setNotificationType('email')}
                />
                <span className="ml-2 text-gray-700">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="text-indigo-600 focus:ring-indigo-500"
                  checked={notificationType === 'sms'}
                  onChange={() => setNotificationType('sms')}
                />
                <span className="ml-2 text-gray-700">SMS</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Templates
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMessage(template.content)}
                  className="p-2 text-left text-sm border border-gray-200 rounded hover:border-indigo-500 hover:bg-indigo-50"
                >
                  {template.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              required
              className="input-primary min-h-[150px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
            />
          </div>

          <div className="bg-gray-50 -mx-6 -mb-6 p-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedMembers.length === 0 || !message}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}