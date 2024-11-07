import React from 'react';
import { Mail, Phone, Music2, Trash2, Edit2, Clock } from 'lucide-react';
import type { BandMember } from '../../../types';

interface BandMembersListProps {
  members: BandMember[];
  onEdit: (member: BandMember) => void;
  onDelete: (id: string) => void;
}

export default function BandMembersList({ members, onEdit, onDelete }: BandMembersListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <div 
          key={member.id}
          className="group relative overflow-hidden bg-white rounded-lg border border-gray-200 p-6 
                   hover:border-indigo-200 transition-all duration-200"
        >
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 
                       group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-300" />

          <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{member.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                             bg-indigo-100 text-indigo-800">
                  {member.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(member)}
                  className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(member.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                {member.email}
              </a>
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </a>
              )}
            </div>

            {/* Equipment */}
            {member.equipment && member.equipment.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Music2 className="w-4 h-4 text-indigo-600" />
                  Equipment
                </h4>
                <ul className="space-y-1">
                  {member.equipment.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Availability */}
            {member.availability && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Availability
                </h4>
                <div className="flex flex-wrap gap-1">
                  {member.availability.preferred.length > 0 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {member.availability.preferred.length} preferred times
                    </span>
                  )}
                  {member.availability.unavailable.length > 0 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      {member.availability.unavailable.length} conflicts
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {member.notes && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">{member.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}