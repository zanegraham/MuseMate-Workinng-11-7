import React from 'react';
import { Check, Star, Trophy, Zap, Award, Trash2 } from 'lucide-react';
import type { Item } from '../../../types';

interface ChecklistSectionProps {
  checklist: { itemId: string; completed: boolean; }[];
  items: Item[];
  onToggleItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
}

export default function ChecklistSection({ 
  checklist, 
  items, 
  onToggleItem,
  onRemoveItem 
}: ChecklistSectionProps) {
  const categories = [...new Set(items
    .filter(item => checklist.some(cl => cl.itemId === item.id))
    .map(item => item.category)
  )];

  const completedItems = checklist.filter(item => item.completed).length;
  const totalItems = checklist.length;
  const progress = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  // Gamification elements
  const getProgressLevel = () => {
    if (progress === 100) return { 
      icon: Trophy, 
      label: 'All Set!', 
      color: 'text-yellow-500',
      message: '🎉 Everything is ready to go!'
    };
    if (progress >= 75) return { 
      icon: Star, 
      label: 'Almost There!', 
      color: 'text-indigo-500',
      message: '⭐ Just a few more items to go!'
    };
    if (progress >= 50) return { 
      icon: Award, 
      label: 'Halfway There!', 
      color: 'text-purple-500',
      message: '🏆 Making great progress!'
    };
    if (progress >= 25) return { 
      icon: Zap, 
      label: 'Getting Started', 
      color: 'text-blue-500',
      message: '⚡ Keep up the momentum!'
    };
    return { 
      icon: Zap, 
      label: 'Just Beginning', 
      color: 'text-gray-500',
      message: '🎯 Let\'s get started!'
    };
  };

  const progressInfo = getProgressLevel();
  const ProgressIcon = progressInfo.icon;

  return (
    <div>
      {/* Progress Header */}
      {totalItems > 0 && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${progressInfo.color} bg-opacity-10`}>
                <ProgressIcon className={`w-5 h-5 ${progressInfo.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{progressInfo.label}</h3>
                <p className="text-sm text-gray-500">
                  {completedItems} of {totalItems} tasks completed
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Progress Message */}
          <div className="text-center text-sm font-medium text-gray-600 mb-4">
            {progressInfo.message}
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 
                       transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="divide-y divide-gray-200">
        {categories.map(category => {
          const categoryItems = items.filter(item => 
            item.category === category && 
            checklist.some(cl => cl.itemId === item.id)
          );

          const categoryProgress = categoryItems.filter(
            item => checklist.find(cl => cl.itemId === item.id)?.completed
          ).length / categoryItems.length * 100;

          return (
            <div key={category} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{category}</h3>
                <span className="text-sm text-gray-500">
                  {Math.round(categoryProgress)}% Complete
                </span>
              </div>

              <div className="space-y-3">
                {categoryItems.map(item => {
                  const checklistItem = checklist.find(cl => cl.itemId === item.id)!;
                  
                  return (
                    <div
                      key={item.id}
                      className={`group flex items-center justify-between p-3 rounded-lg 
                               transition-all duration-200 ${
                                checklistItem.completed
                                  ? 'bg-green-50'
                                  : 'hover:bg-gray-50'
                              }`}
                    >
                      <div className="flex items-center flex-1">
                        <button
                          onClick={() => onToggleItem(item.id)}
                          className={`w-5 h-5 rounded border mr-3 flex items-center justify-center 
                                   transition-all duration-200 ${
                                    checklistItem.completed
                                      ? 'bg-green-500 border-green-500'
                                      : 'border-gray-300 group-hover:border-indigo-500'
                                  }`}
                        >
                          {checklistItem.completed && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </button>
                        <div>
                          <p className={`font-medium transition-all duration-200 ${
                            checklistItem.completed 
                              ? 'text-green-700 line-through' 
                              : 'text-gray-900'
                          }`}>
                            {item.name}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">
                              Available: {item.available}/{item.quantity}
                            </span>
                            {item.location && (
                              <span className="text-sm text-gray-500">
                                Location: {item.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Indicators */}
                        {item.maintenanceStatus && item.maintenanceStatus !== 'good' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            {item.maintenanceStatus.replace('-', ' ')}
                          </span>
                        )}

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                                   transition-all duration-200"
                          title="Remove from checklist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {checklist.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No items in checklist. Click "Add Items" to get started.
          </div>
        )}
      </div>
    </div>
  );
}