import React, { useState } from 'react';
import { X, Music2, Users2, Calendar, Clock, MapPin, DollarSign, Sparkles, ArrowRight, Star } from 'lucide-react';
import type { Event } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Omit<Event, 'id'>) => void;
}

export default function CreateEventModal({ isOpen, onClose, onCreate }: CreateEventModalProps) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'concert' as Event['type'],
    venue: '',
    expectedAttendees: '',
    checklist: [],
    details: {
      setup: {
        loadIn: '',
        soundcheck: '',
        doors: '',
        showStart: '',
      },
      ticketing: {
        price: '',
        capacity: '',
      }
    }
  });

  const updateProgress = (newStep: number) => {
    const totalSteps = 4;
    setProgress((newStep / totalSteps) * 100);
    setStep(newStep);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...formData,
      date: new Date(formData.date),
      checklist: [],
      details: {
        ...formData.details,
        ticketing: {
          ...formData.details.ticketing,
          price: formData.details.ticketing.price ? parseFloat(formData.details.ticketing.price) : undefined,
          capacity: formData.details.ticketing.capacity ? parseInt(formData.details.ticketing.capacity) : undefined,
        }
      },
      expectedAttendees: formData.expectedAttendees ? parseInt(formData.expectedAttendees) : undefined,
    });

    // Reset form
    setFormData({
      name: '',
      date: '',
      type: 'concert',
      venue: '',
      expectedAttendees: '',
      checklist: [],
      details: {
        setup: {
          loadIn: '',
          soundcheck: '',
          doors: '',
          showStart: '',
        },
        ticketing: {
          price: '',
          capacity: '',
        }
      }
    });
    setStep(1);
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Let's Create Something Amazing!</h3>
              <p className="text-gray-500">What kind of event are you planning?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'concert', label: 'Concert', icon: Music2, color: 'from-pink-500 to-rose-500' },
                { value: 'festival', label: 'Festival', icon: Users2, color: 'from-purple-500 to-indigo-500' },
                { value: 'workshop', label: 'Workshop', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
                { value: 'party', label: 'Party', icon: Music2, color: 'from-orange-500 to-yellow-500' }
              ].map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, type: value as Event['type'] }));
                    updateProgress(2);
                  }}
                  className={`
                    relative overflow-hidden group p-6 rounded-xl border text-left
                    ${formData.type === value 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 
                                group-hover:opacity-5 transition-opacity duration-300`} />
                  <Icon className="w-6 h-6 mb-3 text-indigo-600" />
                  <h4 className="font-medium text-gray-900">{label}</h4>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Star className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Name Your Event</h3>
              <p className="text-gray-500">Make it catchy and memorable!</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  className="input-primary text-lg"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Summer Vibes Festival 2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  When is it happening?
                </label>
                <input
                  type="datetime-local"
                  required
                  className="input-primary"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Set the Stage</h3>
              <p className="text-gray-500">Where's the magic happening?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  className="input-primary"
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  placeholder="e.g., The Music Hall"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  className="input-primary"
                  value={formData.expectedAttendees}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedAttendees: e.target.value }))}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Set the Schedule</h3>
              <p className="text-gray-500">Plan your perfect timeline</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Load-in Time
                </label>
                <input
                  type="time"
                  className="input-primary"
                  value={formData.details.setup.loadIn}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: {
                      ...prev.details,
                      setup: {
                        ...prev.details.setup,
                        loadIn: e.target.value
                      }
                    }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soundcheck
                </label>
                <input
                  type="time"
                  className="input-primary"
                  value={formData.details.setup.soundcheck}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: {
                      ...prev.details,
                      setup: {
                        ...prev.details.setup,
                        soundcheck: e.target.value
                      }
                    }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doors Open
                </label>
                <input
                  type="time"
                  className="input-primary"
                  value={formData.details.setup.doors}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: {
                      ...prev.details,
                      setup: {
                        ...prev.details.setup,
                        doors: e.target.value
                      }
                    }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Show Start
                </label>
                <input
                  type="time"
                  className="input-primary"
                  value={formData.details.setup.showStart}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: {
                      ...prev.details,
                      setup: {
                        ...prev.details.setup,
                        showStart: e.target.value
                      }
                    }
                  }))}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Ticketing (Optional)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ticket Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="input-primary pl-7"
                      value={formData.details.ticketing.price}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          ticketing: {
                            ...prev.details.ticketing,
                            price: e.target.value
                          }
                        }
                      }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Tickets
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="input-primary"
                    value={formData.details.ticketing.capacity}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      details: {
                        ...prev.details,
                        ticketing: {
                          ...prev.details.ticketing,
                          capacity: e.target.value
                        }
                      }
                    }))}
                    placeholder="e.g., 200"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {step === 1 ? 'Event Type' : 
               step === 2 ? 'Basic Details' :
               step === 3 ? 'Location' : 'Schedule'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => updateProgress(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {step < 4 ? (
              <button
                type="button"
                onClick={() => updateProgress(step + 1)}
                className="btn-primary flex items-center gap-2"
                disabled={step === 2 && !formData.name}
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
              >
                Create Event
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}