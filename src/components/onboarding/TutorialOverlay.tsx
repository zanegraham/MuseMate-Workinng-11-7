import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ArrowRight, Sparkles, Calendar, Package2, Music2, Zap } from 'lucide-react';

interface Step {
  target: string;
  title: string;
  description: string;
  icon: React.ElementType;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export default function TutorialOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  const steps: Step[] = [
    {
      target: '[data-tutorial="dashboard"]',
      title: 'Welcome to MuseMate!',
      description: 'Your all-in-one solution for event planning and management. Let\'s take a quick tour!',
      icon: Sparkles,
      position: 'bottom'
    },
    {
      target: '[data-tutorial="events"]',
      title: 'Event Management',
      description: 'Create and manage your events, from concerts to exhibitions. Track every detail in one place.',
      icon: Calendar,
      position: 'right'
    },
    {
      target: '[data-tutorial="inventory"]',
      title: 'Inventory Tracking',
      description: 'Keep track of all your equipment and merchandise. Never double-book gear again!',
      icon: Package2,
      position: 'right'
    },
    {
      target: '[data-tutorial="production"]',
      title: 'Craybo Production',
      description: 'Access professional event production services and equipment rentals directly through the app.',
      icon: Music2,
      position: 'right'
    }
  ];

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      // Small delay to ensure the UI is ready
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] cursor-pointer"
        onClick={handleComplete}
      />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`absolute pointer-events-auto bg-white rounded-lg shadow-xl p-6 max-w-md
            ${currentStepData.position === 'top' ? 'bottom-[120%]' :
              currentStepData.position === 'bottom' ? 'top-[120%]' :
              currentStepData.position === 'left' ? 'right-[120%]' :
              'left-[120%]'}`}
          style={{
            transform: `translate(${currentStepData.target === '[data-tutorial="dashboard"]' ? '50%, 50%' : '0, 0'})`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <currentStepData.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={handleComplete}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            {currentStepData.description}
          </p>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className={`text-sm font-medium ${
                currentStep === 0
                  ? 'text-gray-300'
                  : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleComplete();
                } else {
                  setCurrentStep(prev => prev + 1);
                }
              }}
              className="btn-primary flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <Zap className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}