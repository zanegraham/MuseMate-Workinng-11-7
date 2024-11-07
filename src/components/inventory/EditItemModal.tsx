import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Item } from '../../types';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (item: Item) => void;
  item: Item;
}

export default function EditItemModal({ isOpen, onClose, onUpdate, item }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    description: item.description || '',
    quantity: item.quantity,
    available: item.available,
    notes: item.notes || '',
    lastUsed: item.lastUsed || '',
    location: item.location || '',
    maintenanceStatus: item.maintenanceStatus || 'good',
    serialNumber: item.serialNumber || '',
    purchaseDate: item.purchaseDate || '',
    purchasePrice: item.purchasePrice || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...item,
      ...formData,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                className="input-primary"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                required
                className="input-primary"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select category</option>
                <option value="Audio">Audio</option>
                <option value="Lighting">Lighting</option>
                <option value="Stage">Stage</option>
                <option value="Instruments">Instruments</option>
                <option value="DJ Equipment">DJ Equipment</option>
                <option value="Cables">Cables</option>
                <option value="Cases">Cases</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="input-primary"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity</label>
              <input
                type="number"
                min="1"
                required
                className="input-primary"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
              <input
                type="number"
                min="0"
                required
                className="input-primary"
                value={formData.available}
                onChange={(e) => setFormData(prev => ({ ...prev, available: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
              <input
                type="text"
                className="input-primary"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="input-primary"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Storage Room A"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <input
                type="date"
                className="input-primary"
                value={formData.purchaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-primary"
                value={formData.purchasePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Status</label>
            <select
              className="input-primary"
              value={formData.maintenanceStatus}
              onChange={(e) => setFormData(prev => ({ ...prev, maintenanceStatus: e.target.value }))}
            >
              <option value="good">Good Condition</option>
              <option value="needs-maintenance">Needs Maintenance</option>
              <option value="under-repair">Under Repair</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="input-primary"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Maintenance history, special handling instructions, etc."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}