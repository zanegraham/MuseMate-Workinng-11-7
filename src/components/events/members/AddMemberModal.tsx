import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: any) => void;
}

export default function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    equipment: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      equipment: formData.equipment.filter(Boolean),
    });
  };

  const addEquipmentField = () => {
    setFormData(prev => ({
      ...prev,
      equipment: [...prev.equipment, ''],
    }));
  };

  const updateEquipment = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.map((item, i) => i === index ? value : item),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Band Member</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              className="input-primary"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              required
              className="input-primary"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="">Select role</option>
              <option value="Vocalist">Vocalist</option>
              <option value="Guitarist">Guitarist</option>
              <option value="Bassist">Bassist</option>
              <option value="Drummer">Drummer</option>
              <option value="Keyboardist">Keyboardist</option>
              <option value="DJ">DJ</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="input-primary"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              className="input-primary"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment
            </label>
            <div className="space-y-2">
              {formData.equipment.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  className="input-primary"
                  value={item}
                  onChange={(e) => updateEquipment(index, e.target.value)}
                  placeholder="e.g., Guitar, Amp, Microphone"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addEquipmentField}
              className="text-sm text-indigo-600 hover:text-indigo-700 mt-2"
            >
              + Add Equipment
            </button>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}