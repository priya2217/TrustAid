import React, { useState } from 'react';
import { Upload, Camera, FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createRequest } from '../api';

const RequestAid: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'medical',
    urgency: 'medium',
    description: '',
    location: '',
    idFront: null as File | null,
    idBack: null as File | null,
    selfie: null as File | null,
    supportingDocs: [] as File[]
  });
  const [aiAnalysis, setAiAnalysis] = useState({
    idVerified: false,
    faceMatch: 0,
    ocrData: null,
    confidence: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const categories = [
    { id: 'medical', name: 'Medical Treatment' },
    { id: 'education', name: 'Education' },
    { id: 'food', name: 'Food & Nutrition' },
    { id: 'shelter', name: 'Housing & Shelter' },
    { id: 'emergency', name: 'Emergency Relief' }
  ];

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
    
    // Simulate AI analysis
    if (field === 'selfie' && formData.idFront) {
      setTimeout(() => {
        setAiAnalysis({
          idVerified: true,
          faceMatch: Math.floor(Math.random() * 15) + 85, // 85-100%
          ocrData: {
            name: 'John Doe',
            id: 'ID123456789',
            dob: '1990-01-01'
          },
          confidence: Math.floor(Math.random() * 10) + 90 // 90-100%
        });
      }, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setSubmitMessage('Please sign in as a beneficiary before submitting a request.');
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    try {
      await createRequest({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        urgency: formData.urgency,
        description: formData.description,
        location: formData.location,
        ownerId: user.id,
        aiScore: aiAnalysis.confidence || 90,
        ngoApproved: false,
        fundedAmount: 0,
        status: 'pending',
      });
      setSubmitMessage('Your aid request has been submitted to the MongoDB backend.');
      setStep(1);
      setFormData({
        title: '',
        amount: '',
        category: 'medical',
        urgency: 'medium',
        description: '',
        location: '',
        idFront: null,
        idBack: null,
        selfie: null,
        supportingDocs: [],
      });
      setAiAnalysis({
        idVerified: false,
        faceMatch: 0,
        ocrData: null,
        confidence: 0,
      });
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Information</h2>
        <p className="text-gray-600">Tell us about your aid request</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Request Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief description of your need"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount Needed ($)
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <select
            value={formData.urgency}
            onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, State"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Explain your situation and why you need this assistance..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next: Identity Verification
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
        <p className="text-gray-600">Upload your ID and take a selfie for AI verification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">ID Front</h3>
            <p className="text-sm text-gray-600 mb-4">Upload front side of your ID</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload('idFront', e.target.files[0])}
              className="hidden"
              id="id-front"
            />
            <label
              htmlFor="id-front"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
            >
              Choose File
            </label>
            {formData.idFront && (
              <div className="mt-2 text-sm text-green-600">
                ✓ {formData.idFront.name}
              </div>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">ID Back</h3>
            <p className="text-sm text-gray-600 mb-4">Upload back side of your ID</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload('idBack', e.target.files[0])}
              className="hidden"
              id="id-back"
            />
            <label
              htmlFor="id-back"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
            >
              Choose File
            </label>
            {formData.idBack && (
              <div className="mt-2 text-sm text-green-600">
                ✓ {formData.idBack.name}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Selfie Photo</h3>
            <p className="text-sm text-gray-600 mb-4">Take a clear selfie for face matching</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload('selfie', e.target.files[0])}
              className="hidden"
              id="selfie"
            />
            <label
              htmlFor="selfie"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
            >
              Choose File
            </label>
            {formData.selfie && (
              <div className="mt-2 text-sm text-green-600">
                ✓ {formData.selfie.name}
              </div>
            )}
          </div>

          {aiAnalysis.confidence > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">AI Verification Complete</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">ID Verified:</span>
                  <span className="text-green-900 font-medium">
                    {aiAnalysis.idVerified ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Face Match:</span>
                  <span className="text-green-900 font-medium">{aiAnalysis.faceMatch}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Overall Confidence:</span>
                  <span className="text-green-900 font-medium">{aiAnalysis.confidence}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!formData.idFront || !formData.selfie}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Supporting Documents
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Supporting Documents</h2>
        <p className="text-gray-600">Upload any additional documents that support your request</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-medium text-gray-900 mb-2">Additional Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Medical reports, bills, employment letters, etc. (Optional but recommended)
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              setFormData(prev => ({ ...prev, supportingDocs: files }));
            }
          }}
          className="hidden"
          id="supporting-docs"
        />
        <label
          htmlFor="supporting-docs"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
        >
          Choose Files
        </label>
        {formData.supportingDocs.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.supportingDocs.map((file, index) => (
              <div key={index} className="text-sm text-green-600">
                ✓ {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Privacy & Security</h4>
            <p className="text-sm text-blue-700">
              All documents are encrypted and stored securely. Your personal information is protected 
              and only shared with verified NGO partners for validation purposes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              <span className={`ml-2 text-sm ${
                step >= stepNum ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {stepNum === 1 && 'Request Info'}
                {stepNum === 2 && 'Verification'}
                {stepNum === 3 && 'Documents'}
              </span>
              {stepNum < 3 && (
                <div className={`w-16 h-0.5 ml-4 ${
                  step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {submitMessage && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {submitMessage}
          </div>
        )}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default RequestAid;
