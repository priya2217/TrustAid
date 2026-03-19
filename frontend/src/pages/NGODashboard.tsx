import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, Eye, Upload, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NGODashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const pendingRequests = [
    {
      id: '1',
      beneficiaryName: 'Sarah Johnson',
      title: 'Medical Treatment for Diabetes',
      amount: 500,
      aiScore: 95,
      submittedAt: '2024-01-20',
      reason: 'Need insulin and medical supplies for diabetes management',
      idVerified: true,
      faceMatch: 94,
      documents: ['id-front.jpg', 'id-back.jpg', 'selfie.jpg', 'medical-report.pdf']
    },
    {
      id: '2',
      beneficiaryName: 'Michael Chen',
      title: 'Emergency Food Support',
      amount: 150,
      aiScore: 87,
      submittedAt: '2024-01-21',
      reason: 'Lost job due to company closure, need food for family of 4',
      idVerified: true,
      faceMatch: 91,
      documents: ['id-front.jpg', 'selfie.jpg', 'termination-letter.pdf']
    }
  ];

  const approvedRequests = [
    {
      id: '3',
      beneficiaryName: 'Emma Wilson',
      title: 'School Supplies for Children',
      amount: 200,
      approvedAt: '2024-01-18',
      deliveryStatus: 'pending',
      funded: true
    }
  ];

  const handleApprove = (requestId: string) => {
    console.log('Approving request:', requestId);
    // Implementation for approval
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // Implementation for rejection
  };

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">NGO Dashboard</h1>
        <p className="text-gray-600">Review and validate aid requests from verified beneficiaries</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Pending Reviews</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
          <p className="text-xs text-gray-500">Awaiting validation</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Approved Today</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
          <p className="text-xs text-gray-500">+20% from yesterday</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Validated</h3>
            <Star className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">127</div>
          <p className="text-xs text-gray-500">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Success Rate</h3>
            <AlertTriangle className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">94.2%</div>
          <p className="text-xs text-gray-500">Approval accuracy</p>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{request.title}</h4>
                  <p className="text-sm text-gray-600">by {request.beneficiaryName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">${request.amount}</div>
                  <div className="text-sm text-green-600">AI Score: {request.aiScore}%</div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{request.reason}</p>

              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">ID Verification</div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Verified</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Face Match</div>
                  <div className="text-sm font-medium text-gray-900">{request.faceMatch}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Documents</div>
                  <div className="text-sm font-medium text-gray-900">{request.documents.length} files</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Submitted on {new Date(request.submittedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedRequest(request.id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Review</span>
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Requests - Delivery Status */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Approved Requests - Awaiting Delivery</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {approvedRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{request.title}</h4>
                  <p className="text-sm text-gray-600">by {request.beneficiaryName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">${request.amount}</div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Funded</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Approved on {new Date(request.approvedAt).toLocaleDateString()}
                </span>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  <Upload className="h-4 w-4" />
                  <span>Upload Delivery Proof</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;