import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Camera,
  Shield,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getRequests } from "../api";

const BeneficiaryDashboard: React.FC = () => {
  const { user } = useAuth();
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (user?.id) {
        try {
          const requests = await getRequests({ ownerId: user.id });
          setMyRequests(requests);
        } catch (err) {
          setError("Failed to load requests");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMyRequests();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle;
      case "pending":
        return Clock;
      case "rejected":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  if (loading) return <div className="pt-28 text-center">Loading...</div>;
  if (error)
    return <div className="pt-28 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Beneficiary Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your aid requests and track their progress
        </p>
      </div>

      {/* Verification Status */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Identity Verification
            </h3>
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Verified</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">AI Confidence: 95%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Active Requests</h3>
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
          <p className="text-xs text-gray-500">1 Pending, 1 Approved</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Received</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">$500</div>
          <p className="text-xs text-gray-500">From 1 successful request</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/request-aid"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <Plus className="h-6 w-6 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">New Request</div>
              <div className="text-sm text-gray-500">Submit aid request</div>
            </div>
          </Link>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
            <Camera className="h-6 w-6 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Update ID</div>
              <div className="text-sm text-gray-500">Re-verify identity</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
            <FileText className="h-6 w-6 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">View History</div>
              <div className="text-sm text-gray-500">Past requests</div>
            </div>
          </button>
        </div>
      </div>

      {/* My Requests */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {myRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div key={request.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <div className="font-medium">${request.amount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">AI Score:</span>
                    <div className="font-medium text-green-600">
                      {request.aiScore}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">NGO Status:</span>
                    <div className="flex items-center space-x-1">
                      {request.ngoApproved ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                      <span
                        className={
                          request.ngoApproved
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {request.ngoApproved ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Funding:</span>
                    <div className="flex items-center space-x-1">
                      {request.funded ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span
                        className={
                          request.funded ? "text-green-600" : "text-gray-500"
                        }
                      >
                        {request.funded ? "Funded" : "Awaiting"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Submitted on{" "}
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;
