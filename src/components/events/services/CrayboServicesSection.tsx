import React, { useState } from 'react';
import { Palette, Truck, Music, Zap, ArrowRight } from 'lucide-react';
import type { Event } from '../../../types';

interface CrayboServicesSectionProps {
  event: Event;
  onUpdateEvent: (event: Event) => void;
}

export default function CrayboServicesSection({ event, onUpdateEvent }: CrayboServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'production',
      icon: Palette,
      name: 'Production Services',
      description: 'Professional event production, staging, and technical support',
      features: [
        'Stage design and setup',
        'Professional lighting',
        'Sound engineering',
        'On-site technical support'
      ]
    },
    {
      id: 'rental',
      icon: Truck,
      name: 'Equipment Rental',
      description: 'High-quality audio, lighting, and stage equipment rentals',
      features: [
        'Professional audio systems',
        'Stage lighting packages',
        'DJ equipment',
        'Delivery and setup available'
      ]
    },
    {
      id: 'talent',
      icon: Music,
      name: 'Talent Booking',
      description: 'Connect with local artists and performers',
      features: [
        'Local band booking',
        'DJ services',
        'Performance coordination',
        'Technical rider support'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Craybo Services</h2>
        </div>
        <p className="text-sm text-gray-500">
          Enhance your event with professional services from Craybo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => {
          const isSelected = selectedService === service.id;
          const ServiceIcon = service.icon;

          return (
            <div
              key={service.id}
              className={`
                relative overflow-hidden group cursor-pointer
                rounded-lg border transition-all duration-200
                ${isSelected 
                  ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50' 
                  : 'border-gray-200/50 hover:border-indigo-200 bg-white/50'
                }
              `}
              onClick={() => setSelectedService(isSelected ? null : service.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${isSelected 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                    }
                  `}>
                    <ServiceIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {service.description}
                </p>

                <div className={`
                  grid gap-2 transition-all duration-200
                  ${isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}>
                  <div className="overflow-hidden">
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`
                  mt-4 pt-4 border-t border-gray-200/50
                  ${isSelected ? 'block' : 'hidden'}
                `}>
                  <a
                    href={`https://craybo.com/services/${service.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Need help planning your event?
            </h3>
            <p className="text-sm text-gray-600">
              Get in touch with our team for personalized support
            </p>
          </div>
          <a
            href="https://craybo.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Contact Craybo
          </a>
        </div>
      </div>
    </div>
  );
}