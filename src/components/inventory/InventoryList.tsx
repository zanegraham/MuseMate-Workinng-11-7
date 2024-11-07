import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import type { Item } from '../../types';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import InventoryFilters from './InventoryFilters';
import { useStore } from '../../store';

export default function InventoryList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  const { items, addItem, updateItem } = useStore();

  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    addItem(newItem);
    setIsAddModalOpen(false);
  };

  const handleUpdateItem = (updatedItem: Item) => {
    updateItem(updatedItem.id, updatedItem);
    setEditingItem(null);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && item.available > 0) ||
      (availabilityFilter === 'low' && item.available < item.quantity * 0.2);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728')] bg-cover bg-center opacity-10"></div>
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Inventory</h1>
            <p className="text-indigo-100">Track your gear and equipment</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl 
                     border border-white/20 text-white font-medium transition-all duration-200
                     hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Item
              <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </span>
          </button>
        </div>
      </div>

      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availabilityFilter={availabilityFilter}
        onAvailabilityChange={setAvailabilityFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/50 
                     shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-purple-600/0 to-pink-600/0 
                          group-hover:from-indigo-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 
                          transition-all duration-500"></div>
            
            <div className="relative p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
                  {item.category}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Available</span>
                    <span>{item.available}/{item.quantity}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        item.available === 0
                          ? 'bg-red-500'
                          : item.available < item.quantity * 0.2
                          ? 'bg-yellow-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${(item.available / item.quantity) * 100}%` }}
                    />
                  </div>
                </div>

                {item.location && (
                  <p className="text-sm text-gray-500">
                    Location: {item.location}
                  </p>
                )}

                {item.maintenanceStatus && item.maintenanceStatus !== 'good' && (
                  <p className="text-sm font-medium text-yellow-600">
                    Status: {item.maintenanceStatus.replace('-', ' ')}
                  </p>
                )}

                {item.notes && (
                  <p className="text-sm text-gray-500 italic">
                    Note: {item.notes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-end">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Edit Details →
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-300">
            <Sparkles className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500 text-center mb-4">
              {searchQuery || selectedCategory 
                ? "Try adjusting your filters"
                : "Start by adding some items to your inventory"}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
            >
              Add First Item
            </button>
          </div>
        )}
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {editingItem && (
        <EditItemModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdateItem}
          item={editingItem}
        />
      )}
    </div>
  );
}