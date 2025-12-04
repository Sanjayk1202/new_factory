import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Calendar, User, Filter, Search } from 'lucide-react';

const Approvals = () => {
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, type: 'leave', employee: 'John Doe', period: 'Jan 20-22, 2024', reason: 'Family vacation', status: 'pending' },
    { id: 2, type: 'shift-swap', employee: 'Sarah Johnson', period: 'Jan 18, 2024', reason: 'Medical appointment', status: 'pending' },
    { id: 3, type: 'overtime', employee: 'Mike Wilson', period: 'Jan 15, 2024', reason: 'Project deadline', status: 'pending' },
    { id: 4, type: 'leave', employee: 'Robert Chen', period: 'Jan 25-26, 2024', reason: 'Personal', status: 'pending' },
  ]);

  const [filter, setFilter] = useState('all');

  const getRequestIcon = (type) => {
    switch (type) {
      case 'leave': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'shift-swap': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'overtime': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return <User className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRequestTypeColor = (type) => {
    switch (type) {
      case 'leave': return 'bg-blue-100 text-blue-800';
      case 'shift-swap': return 'bg-purple-100 text-purple-800';
      case 'overtime': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    // In real app, you would send API request here
  };

  const handleReject = (id) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    // In real app, you would send API request here
  };

  const filteredRequests = filter === 'all' 
    ? pendingRequests 
    : pendingRequests.filter(req => req.type === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Approvals Dashboard</h3>
          <p className="text-gray-600">Review and approve team requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search requests..."
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-800">{pendingRequests.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Leave Requests</p>
              <p className="text-2xl font-bold text-gray-800">
                {pendingRequests.filter(r => r.type === 'leave').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'leave', 'shift-swap', 'overtime'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.replace('-', ' ')}
            {type !== 'all' && (
              <span className="ml-2 bg-white bg-opacity-20 px-1.5 py-0.5 rounded text-xs">
                {pendingRequests.filter(r => r.type === type).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="card p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">No Pending Requests</h4>
            <p className="text-gray-600">All requests have been processed.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    {getRequestIcon(request.type)}
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-800">
                          {request.type.replace('-', ' ').toUpperCase()} Request
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRequestTypeColor(request.type)}`}>
                          {request.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            <span className="font-medium">Employee:</span> {request.employee}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            <span className="font-medium">Period:</span> {request.period}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Reason:</span>
                          <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Approvals;