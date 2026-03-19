import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Shield, Heart, ExternalLink } from 'lucide-react';

const ViewRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');

  const requests = [
    {
      id: '1',
      title: 'Medical Treatment for Diabetes',
      beneficiaryName: 'Sarah Johnson',
      amount: 500,
      funded: 0,
      supporters: 0,
      aiScore: 95,
      ngoApproved: true,
      category: 'medical',
      urgency: 'high',
      location: 'New York, NY',
      description: 'Need insulin and medical supplies for diabetes management. My insurance was recently canceled and I cannot afford the medication.',
      submittedAt: '2024-01-20',
      daysLeft: 12,
      documents: 4,
      ngoName: 'Health First NGO'
    },
    {
      id: '2',
      title: 'School Supplies for Three Children',
      beneficiaryName: 'Michael Rodriguez',
      amount: 200,
      funded: 75,
      supporters: 3,
      aiScore: 92,
      ngoApproved: true,
      category: 'education',
      urgency: 'medium',
      location: 'Los Angeles, CA',
      description: 'Need books, uniforms, and school supplies for my three children starting the new school year.',
      submittedAt: '2024-01-18',
      daysLeft: 20,
      documents: 3,
      ngoName: 'Education Access Foundation'
    },
    {
      id: '3',
      title: 'Emergency Food Support',
      beneficiaryName: 'Lisa Williams',
      amount: 300,
      funded: 200,
      supporters: 8,
      aiScore: 88,
      ngoApproved: true,
      category: 'food',
      urgency: 'high',
      location: 'Chicago, IL',
      description: 'Lost my job last month and need food assistance for my family of 5 including 3 young children.',
      submittedAt: '2024-01-19',
      daysLeft: 8,
      documents: 5,
      ngoName: 'Community Food Network'
    },
    {
      id: '4',
      title: 'Wheelchair Accessibility Ramp',
      beneficiaryName: 'Robert Chen',
      amount: 800,
      funded: 320,
      supporters: 12,
      aiScore: 96,
      ngoApproved: true,
      category: 'medical',
      urgency: 'medium',
      location: 'Seattle, WA',
      description: 'Need to build a wheelchair ramp to access my home after recent disability. Current entrance has 4 steps.',
      submittedAt: '2024-01-15',
      daysLeft: 25,
      documents: 6,
      ngoName: 'Disability Support Alliance'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'food', name: 'Food & Nutrition' },
    { id: 'shelter', name: 'Housing & Shelter' },
    { id: 'emergency', name: 'Emergency Relief' }
  ];

  const urgencyLevels = [
    { id: 'all', name: 'All Urgency Levels' },
    { id: 'high', name: 'High Priority' },
    { id: 'medium', name: 'Medium Priority' },
    { id: 'low', name: 'Low Priority' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'shelter': return 'bg-green-100 text-green-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || request.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verified Requests</h1>
        <p className="text-gray-600">Browse AI-verified and NGO-approved aid requests</p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white mb-8">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">127</div>
            <div className="text-blue-100 text-sm">Active Requests</div>
          </div>
          <div>
            <div className="text-2xl font-bold">$45,230</div>
            <div className="text-blue-100 text-sm">Total Needed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98.7%</div>
            <div className="text-blue-100 text-sm">AI Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-blue-100 text-sm">NGO Partners</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {urgencyLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredRequests.length} of {requests.length} verified requests
        </p>
      </div>

      {/* Requests Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.title}</h3>
                  <p className="text-sm text-gray-600">by {request.beneficiaryName}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">${request.amount}</div>
                  <div className="text-sm text-green-600">AI: {request.aiScore}%</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{request.location}</span>
                <Clock className="h-4 w-4 text-gray-400 ml-4" />
                <span className="text-sm text-gray-600">{request.daysLeft} days left</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}>
                  {request.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency} priority
                </span>
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <Shield className="h-3 w-3" />
                  <span>NGO Verified</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 line-clamp-3">{request.description}</p>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-medium">
                    ${request.funded} / ${request.amount} ({Math.round((request.funded / request.amount) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((request.funded / request.amount) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{request.supporters} supporters</span>
                  <span>{request.documents} documents</span>
                </div>
              </div>

              {/* NGO Info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Validated by {request.ngoName}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Fund Request</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredRequests.length > 0 && (
        <div className="text-center">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Requests
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ViewRequests;