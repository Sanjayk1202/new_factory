import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ date = new Date() }) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty days for the start of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Sample shift data - in real app, this would come from props
  const shiftDays = [3, 5, 8, 12, 15, 18, 20, 22, 25, 28];
  const today = date.getDate();

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800">
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const hasShift = day && shiftDays.includes(day);
          const isToday = day === today;
          
          return (
            <div
              key={index}
              className={`min-h-20 p-2 rounded-lg border ${
                isToday
                  ? 'bg-blue-50 border-blue-200'
                  : hasShift
                  ? 'bg-green-50 border-green-200'
                  : 'border-gray-200'
              }`}
            >
              {day && (
                <>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${
                      isToday ? 'text-blue-600' : 'text-gray-800'
                    }`}>
                      {day}
                    </span>
                    {hasShift && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  
                  {hasShift && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600">Morning Shift</div>
                      <div className="text-xs text-gray-500">08:00 - 16:00</div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Scheduled Shift</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;