import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { BandMember } from '../../../types';

interface MemberAvailabilityCalendarProps {
  member: BandMember;
  onUpdateAvailability: (availability: BandMember['availability']) => void;
}

export default function MemberAvailabilityCalendar({ 
  member, 
  onUpdateAvailability 
}: MemberAvailabilityCalendarProps) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const isPreferred = (day: string, time: string) => {
    return member.availability?.preferred.includes(`${day}-${time}`);
  };

  const isUnavailable = (day: string, time: string) => {
    return member.availability?.unavailable.includes(`${day}-${time}`);
  };

  const toggleTimeSlot = (day: string, time: string) => {
    const timeSlot = `${day}-${time}`;
    const newAvailability = { ...member.availability } || { preferred: [], unavailable: [] };

    if (isPreferred(day, time)) {
      newAvailability.preferred = newAvailability.preferred.filter(slot => slot !== timeSlot);
      newAvailability.unavailable = [...newAvailability.unavailable, timeSlot];
    } else if (isUnavailable(day, time)) {
      newAvailability.unavailable = newAvailability.unavailable.filter(slot => slot !== timeSlot);
    } else {
      newAvailability.preferred = [...newAvailability.preferred, timeSlot];
    }

    onUpdateAvailability(newAvailability);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Availability Schedule</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            <div className="bg-gray-50 p-2">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            {daysOfWeek.map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center font-medium text-gray-700">
                {day}
              </div>
            ))}
            {timeSlots.map(time => (
              <React.Fragment key={time}>
                <div className="bg-white p-2 text-sm text-gray-500">
                  {time}
                </div>
                {daysOfWeek.map(day => (
                  <button
                    key={`${day}-${time}`}
                    onClick={() => toggleTimeSlot(day, time)}
                    className={`
                      bg-white p-2 transition-colors
                      ${isPreferred(day, time) 
                        ? 'bg-green-100 hover:bg-green-200' 
                        : isUnavailable(day, time)
                        ? 'bg-red-100 hover:bg-red-200'
                        : 'hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="sr-only">
                      {day} at {time}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 rounded" />
          <span className="text-gray-600">Preferred</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 rounded" />
          <span className="text-gray-600">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border rounded" />
          <span className="text-gray-600">Available</span>
        </div>
      </div>
    </div>
  );
}