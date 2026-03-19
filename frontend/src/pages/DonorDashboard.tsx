import { ExternalLink, Filter, Heart, Search, Shield, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const verifiedRequests = [
    {
      id: '1',
      title: 'Medical Treatment for Diabetes',
      beneficiaryName: 'Sarah Johnson',
      amount: 500,
      funded: 0,
      aiScore: 95,
      ngoApproved: true,
      category: 'medical',
      urgency: 'high',
      location: 'New York, NY',
      description: 'Need insulin and medical supplies for diabetes management',
      documents: 4,
      daysLeft: 12
    },
    {
      id: '2',
      title: 'School Supplies for Children',
      beneficiaryName: 'Michael Rodriguez',
      amount: 200,
      funded: 75,
      aiScore: 92,
      ngoApproved: true,
      category: 'education',
      urgency: 'medium',
      location: 'Los Angeles, CA',
      description: 'Books and supplies for 3 children starting new school year',
      documents: 3,
      daysLeft: 20
    },
    {
      id: '3',
      title: 'Emergency Food Support',
      beneficiaryName: 'Lisa Williams',
      amount: 300,
      funded: 200,
      aiScore: 88,
      ngoApproved: true,
      category: 'food',
      urgency: 'high',
      location: 'Chicago, IL',
      description: 'Food assistance for family of 5 after job loss',
      documents: 5,
      daysLeft: 8
    }
  ];

  const myDonations = [
    {
      id: '1',
      title: 'Clean Water Project',
      amount: 250,
      date: '2024-01-15',
      status: 'delivered',
      txHash: '0x1234...5678'
    },
    {
      id: '2',
      title: 'Medical Equipment',
      amount: 500,
      date: '2024-01-10',
      status: 'in-progress',
      txHash: '0xabcd...efgh'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'food', name: 'Food & Nutrition' },
    { id: 'shelter', name: 'Shelter' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'shelter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Donor Dashboard</h1>
        <p className="text-gray-600">Discover verified requests and track your impact</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Donated</h3>
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">$2,450</div>
          <p className="text-xs text-gray-500">Across 8 requests</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Lives Impacted</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
          <p className="text-xs text-gray-500">People helped</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Success Rate</h3>
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
          <p className="text-xs text-gray-500">Verified deliveries</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Active Donations</h3>
            <Heart className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
          <p className="text-xs text-gray-500">In progress</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Verified Requests */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Verified Requests</h2>
          <div className="space-y-6">
            {verifiedRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{request.title}</h3>
                    <p className="text-sm text-gray-600">by {request.beneficiaryName}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${request.amount}</div>
                    <div className="text-sm text-green-600">AI: {request.aiScore}%</div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{request.description}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}>
                    {request.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency} priority
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    NGO Verified
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="text-gray-900">${request.funded} / ${request.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(request.funded / request.amount) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {request.daysLeft} days left • {request.documents} documents
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Fund Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Donations */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Recent Donations</h2>
          <div className="space-y-4">
            {myDonations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{donation.title}</h4>
                    <p className="text-sm text-gray-600">${donation.amount} donated</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    donation.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donation.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(donation.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      View Details
                    </button>
                    <a
                      href={`https://algoexplorer.io/tx/${donation.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Blockchain</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/view-requests"
            className="block w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center py-3 rounded-xl font-medium hover:from-blue-700 hover:to-green-700 transition-all"
          >
            Browse All Requests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;