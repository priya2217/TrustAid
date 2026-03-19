import { Building, Heart, Shield, User } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { AppUser } from '../types/auth';

const roles: Array<{
  id: AppUser["role"];
  name: string;
  description: string;
  icon: typeof Heart;
  gradient: string;
  bgGradient: string;
}> = [
  {
    id: 'donor',
    name: 'Donor',
    description: 'Fund verified requests and track impact with blockchain transparency',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-500/10 to-pink-500/10',
  },
  {
    id: 'beneficiary',
    name: 'Beneficiary',
    description: 'Request aid with AI-powered identity verification and NGO validation',
    icon: User,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'ngo',
    name: 'NGO Partner',
    description: 'Validate requests and deliver aid with smart contract automation',
    icon: Building,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
];

const getDashboardRoute = (role?: AppUser["role"]) => {
  switch (role) {
    case 'donor':
      return '/donor';
    case 'beneficiary':
      return '/beneficiary';
    case 'ngo':
      return '/ngo';
    default:
      return '/';
  }
};

const LoginPage: React.FC = () => {
  const { user, login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AppUser["role"]>('beneficiary');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedRole = useMemo(
    () => roles.find((roleOption) => roleOption.id === role),
    [role]
  );

  useEffect(() => {
    if (user) {
      navigate(getDashboardRoute(user.role), { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      if (isRegister) {
        await register(email, password, fullName, role);
      } else {
        await login(email, password);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message.replace(/^API error:\s*/, '') : 'Something went wrong.';
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-16 px-4 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-10">
        <div className="text-center">
          <Shield className="h-12 w-12 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2">
            {isRegister ? 'Create your TrustAid account' : 'Welcome back to TrustAid'}
          </h1>
          <p className="text-gray-300 text-lg">
            {isRegister
              ? 'Choose your role and create a MongoDB-backed account'
              : 'Sign in with the account stored in your local backend'}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-gray-600 bg-gray-900/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="Priya K"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-900/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-900/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {isRegister && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Select your role</label>
                <div className="grid gap-3">
                  {roles.map((roleOption) => (
                    <button
                      key={roleOption.id}
                      type="button"
                      onClick={() => setRole(roleOption.id)}
                      className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                        role === roleOption.id
                          ? `border-cyan-400 bg-gradient-to-r ${roleOption.bgGradient}`
                          : 'border-gray-600 bg-gray-900/40 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`rounded-xl bg-gradient-to-r ${roleOption.gradient} p-2`}>
                          <roleOption.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{roleOption.name}</div>
                          <div className="text-sm text-gray-300">{roleOption.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedRole && (
                  <div className="text-sm text-cyan-300">
                    Selected role: {selectedRole.name}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting || loading
                ? isRegister
                  ? 'Creating account...'
                  : 'Signing in...'
                : isRegister
                  ? 'Create account'
                  : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-300">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegister((current) => !current);
                setErrorMsg(null);
              }}
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              {isRegister ? 'Sign in' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
