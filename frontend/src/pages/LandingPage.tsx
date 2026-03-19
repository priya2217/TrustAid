import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Brain, Link as LinkIcon, Users, CheckCircle, TrendingUp, Zap, Globe, Lock } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Verification',
      description: 'Advanced neural networks and computer vision ensure authentic requests through multi-layer validation',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: LinkIcon,
      title: 'Blockchain Transparency',
      description: 'Immutable smart contracts on Algorand provide cryptographic proof of every transaction',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'NGO Validation Network',
      description: 'Verified partner organizations ensure legitimate distribution and impact measurement',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      title: 'Proof of Delivery',
      description: 'Smart contracts with escrow mechanisms guarantee funds reach intended beneficiaries',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Total Donations', value: '$2.4M+', icon: TrendingUp },
    { label: 'Verified Requests', value: '5,200+', icon: Shield },
    { label: 'NGO Partners', value: '150+', icon: Users },
    { label: 'Success Rate', value: '98.7%', icon: CheckCircle }
  ];

  const handleGetStarted = () => {
    if (user?.role) {
      switch (user.role) {
        case 'donor':
          navigate('/donor');
          return;
        case 'beneficiary':
          navigate('/beneficiary');
          return;
        case 'ngo':
          navigate('/ngo');
          return;
        default:
          navigate('/');
          return;
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
          }}
        ></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <Shield className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Transparent
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                Donations
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300 mt-4">
                with AI & Blockchain
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionary charitable platform leveraging <span className="text-cyan-400 font-semibold">artificial intelligence</span>, 
              <span className="text-purple-400 font-semibold"> blockchain technology</span>, and 
              <span className="text-green-400 font-semibold"> verified NGO partnerships</span> to ensure 
              every donation creates measurable impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Launch Platform</span>
                </span>
              </button>
              
              <button
                onClick={() => navigate('/view-requests')}
                className="group px-8 py-4 border-2 border-gray-600 hover:border-cyan-400 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-cyan-400/10"
              >
                <span className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Explore Requests</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-2xl border border-gray-600 group-hover:border-cyan-400 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-cyan-400 mx-auto" />
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Advanced Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge solutions combining artificial intelligence, blockchain cryptography, 
              and human oversight for unprecedented transparency in charitable giving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="relative text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Lock className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Transform Giving?
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join the next generation of transparent philanthropy. Every donation is verified, 
                tracked, and delivered with mathematical certainty.
              </p>
              
              <button
                onClick={handleGetStarted}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Begin Your Impact Journey</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
