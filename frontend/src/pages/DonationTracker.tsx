import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, ExternalLink, Download, Camera, FileText } from 'lucide-react';

const DonationTracker: React.FC = () => {
  const { id } = useParams();

  // Mock data - in real app, this would come from API
  const donation = {
    id: '1',
    title: 'Medical Treatment for Diabetes',
    beneficiaryName: 'Sarah Johnson',
    amount: 500,
    donatedAmount: 500,
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
    donatedAt: '2024-01-15T10:30:00Z',
    status: 'delivered',
    ngoName: 'Health First NGO',
    ngoContact: 'contact@healthfirst.org',
    proofImages: [
      'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg',
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
    ],
    receipt: {
      vendor: 'MediCare Pharmacy',
      items: ['Insulin pen', 'Blood glucose strips', 'Syringes'],
      total: 485.50,
      date: '2024-01-22'
    },
    timeline: [
      {
        date: '2024-01-15T10:30:00Z',
        event: 'Donation Made',
        description: 'Funds transferred via blockchain',
        status: 'completed'
      },
      {
        date: '2024-01-16T14:20:00Z',
        event: 'NGO Notified',
        description: 'Health First NGO received funding notification',
        status: 'completed'
      },
      {
        date: '2024-01-20T09:15:00Z',
        event: 'Purchase Made',
        description: 'Medical supplies purchased from MediCare Pharmacy',
        status: 'completed'
      },
      {
        date: '2024-01-22T16:45:00Z',
        event: 'Delivered to Beneficiary',
        description: 'Items delivered and confirmed by Sarah Johnson',
        status: 'completed'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/donor"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation Tracker</h1>
        <p className="text-gray-600">Track the impact of your donation with complete transparency</p>
      </div>

      {/* Donation Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{donation.title}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Beneficiary:</span>
                <span className="font-medium">{donation.beneficiaryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Donated:</span>
                <span className="font-medium text-green-600">${donation.donatedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(donation.donatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600 capitalize">{donation.status}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">NGO Partner</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">{donation.ngoName}</div>
              <div className="text-sm text-gray-600 mb-2">{donation.ngoContact}</div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Verified Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Verification */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white mb-8">
        <h3 className="text-lg font-semibold mb-3">Blockchain Verification</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Transaction Hash:</p>
            <p className="font-mono text-sm">{donation.txHash}</p>
          </div>
          <a
            href={`https://algoexplorer.io/tx/${donation.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="font-medium">View on AlgoExplorer</span>
          </a>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation Timeline</h3>
        <div className="space-y-6">
          {donation.timeline.map((event, index) => {
            const StatusIcon = getStatusIcon(event.status);
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${event.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <StatusIcon className={`h-4 w-4 ${getStatusColor(event.status)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{event.event}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proof of Delivery */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Receipt Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Purchase Receipt</h3>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
              <Download className="h-4 w-4" />
              <span className="text-sm">Download</span>
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Vendor:</span>
                <span className="font-medium">{donation.receipt.vendor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{donation.receipt.date}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-3">
                <div className="text-gray-600 mb-2">Items Purchased:</div>
                <ul className="space-y-1">
                  {donation.receipt.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${donation.receipt.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Photos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Camera className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Delivery Proof</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {donation.proofImages.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={`${image}?w=200&h=200&fit=crop`}
                  alt={`Delivery proof ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                Delivery confirmed by beneficiary
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Verification Score */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Verification Report</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">Receipt Authenticity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
            <div className="text-sm text-gray-600">Photo Verification</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Overall Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationTracker;