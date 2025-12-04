import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const ShiftView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day'); // 'day', 'week', 'month'

  const shifts = [
    { id: 1, date: '2024-01-15', day: 'Monday', shift: 'Morning', time: '08:00 - 16:00', location: 'Production Line A', team: 'Production Team A', status: 'scheduled' },
    { id: 2, date: '2024-01-16', day: 'Tuesday', shift: 'Morning', time: '08:00 - 16:00', location: 'Production Line B', team: 'Production Team B', status: 'scheduled' },
    { id: 3, date: '2024-01-17', day: 'Wednesday', shift: 'Afternoon', time: '16:00 - 00:00', location: 'Quality Control', team: 'Quality Team', status: 'scheduled' },
    { id: 4, date: '2024-01-18', day: 'Thursday', shift: 'Morning', time: '08:00 - 16:00', location: 'Production Line A', team: 'Production Team A', status: 'pending' },
    { id: 5, date: '2024-01-19', day: 'Friday', shift: 'Morning', time: '08:00 - 16:00', location: 'Production Line C', team: 'Production Team C', status: 'scheduled' },
    { id: 6, date: '2024-01-20', day: 'Saturday', shift: 'Overtime', time: '08:00 - 12:00', location: 'Maintenance', team: 'Maintenance Team', status: 'optional' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayShift = shifts.find(shift => shift.date === today);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getShiftColor = (shiftType) => {
    switch (shiftType.toLowerCase()) {
      case 'morning': return 'bg-blue-100 text-blue-800';
      case 'afternoon': return 'bg-green-100 text-green-800';
      case 'night': return 'bg-purple-100 text-purple-800';
      case 'overtime': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'optional': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">My Shifts</h3>
          <p className="text-gray-600">View and manage your work schedule</p>
        </div>
        <div className="flex items-center space-x-2">
          {['day', 'week', 'month'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                view === v
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Shift Card */}
      {todayShift && (
        <div className="card p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-gray-800">Today's Shift</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{todayShift.time}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getShiftColor(todayShift.shift)}`}>
                    {todayShift.shift}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">{todayShift.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">{todayShift.team}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(todayShift.status)}`}>
                {todayShift.status}
              </div>
              <button className="mt-4 btn-primary">
                Check In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Shifts */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Upcoming Shifts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shifts
            .filter(shift => shift.date !== today)
            .map((shift) => (
              <div key={shift.id} className="card p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="font-bold text-gray-800">{formatDate(shift.date)}</h5>
                    <p className="text-sm text-gray-600">{shift.day}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getShiftColor(shift.shift)}`}>
                    {shift.shift}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{shift.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{shift.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{shift.team}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(shift.status)}`}>
                    {shift.status}
                  </span>
                  {shift.status === 'optional' && (
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Accept Shift
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Shift Calendar View */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-gray-800">Shift Calendar</h4>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="font-medium">January 2024</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days would go here */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const hasShift = day % 3 === 0;
            return (
              <div
                key={day}
                className={`text-center p-2 rounded-lg ${
                  hasShift ? 'bg-blue-50 border border-blue-200' : ''
                } ${day === 15 ? 'bg-blue-100 border-blue-300' : ''}`}
              >
                <div className="text-sm text-gray-800">{day}</div>
                {hasShift && (
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShiftView;