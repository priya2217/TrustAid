// import { Building, Heart, Shield, Sparkles, User } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// const LoginPage: React.FC = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [role, setRole] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // On mount, try to fetch role from localStorage (simulate fetching from user profile after login)
//   useEffect(() => {
//     if (!isRegister) {
//       // In a real app, fetch from Supabase user profile after login
//       const savedRole = localStorage.getItem('last_google_role');
//       if (savedRole) setUserRole(savedRole);
//       else setUserRole(null); // Explicitly clear if not found
//     } else {
//       setUserRole(null); // Clear userRole when switching to register
//     }
//   }, [isRegister]);

//   // Google Sign-In handler
//   const handleGoogleSignIn = async () => {
//     if (isRegister) {
//       // Check if user already exists with this Google account
//       setLoading(true);
//       setErrorMsg(null);
//       try {
//         // Use Supabase to get the user by email if possible (not possible before OAuth)
//         // So, after OAuth, in /oauth-callback, check if user already has a profile
//         // Here, just proceed to OAuth, but in /oauth-callback, handle duplicate registration
//         if (!role) {
//           setErrorMsg('Please select a role before signing up with Google.');
//           setLoading(false);
//           return;
//         }
//         localStorage.setItem('pending_google_role', role);
//         const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/oauth-callback?register=1` } });
//         if (error) throw error;
//       } catch (error: any) {
//         setErrorMsg(error.message || 'Google sign-up failed');
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }
//     // Sign in flow
//     setLoading(true);
//     setErrorMsg(null);
//     try {
//       // Start OAuth flow
//       const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/oauth-callback?signin=1` } });
//       if (error) throw error;
//     } catch (error: any) {
//       setErrorMsg(error.message || 'Google sign-in failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const roles = [
//     {
//       id: 'donor',
//       name: 'Donor',
//       description: 'Fund verified requests and track impact with blockchain transparency',
//       icon: Heart,
//       gradient: 'from-red-500 to-pink-500',
//       bgGradient: 'from-red-500/10 to-pink-500/10',
//       borderGradient: 'from-red-500/30 to-pink-500/30'
//     },
//     {
//       id: 'beneficiary',
//       name: 'Beneficiary',
//       description: 'Request aid with AI-powered identity verification and NGO validation',
//       icon: User,
//       gradient: 'from-blue-500 to-cyan-500',
//       bgGradient: 'from-blue-500/10 to-cyan-500/10',
//       borderGradient: 'from-blue-500/30 to-cyan-500/30'
//     },
//     {
//       id: 'ngo',
//       name: 'NGO Partner',
//       description: 'Validate requests and deliver aid with smart contract automation',
//       icon: Building,
//       gradient: 'from-green-500 to-emerald-500',
//       bgGradient: 'from-green-500/10 to-emerald-500/10',
//       borderGradient: 'from-green-500/30 to-emerald-500/30'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
//           }}
//         ></div>

//         {/* Floating Elements */}
//         <div className="absolute top-1/5 left-1/5 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/5 right-1/5 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative z-10 max-w-md w-full space-y-12">
//         <div className="text-center mb-10">
//           <div className="mb-10 flex justify-center">
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
//               <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
//                 <Shield className="h-12 w-12 text-white mx-auto" />
//               </div>
//             </div>
//           </div>
//           <h2 className="text-4xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
//               Welcome to TrustAid
//             </span>
//           </h2>
//           <p className="text-gray-300 text-lg">
//             Join the future of transparent charitable giving
//           </p>
//         </div>

//         <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-10 border border-gray-700 shadow-2xl mt-8">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

//           <form className="relative space-y-10" onSubmit={e => e.preventDefault()}>
//             {errorMsg && (
//               <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-center backdrop-blur-sm mb-6">
//                 {errorMsg}
//               </div>
//             )}
//             <div className="space-y-8">
//               {/* Show role selection only when registering */}
//               {isRegister ? (
//                 <div className="space-y-6">
//                   <label className="text-sm font-medium text-gray-300 flex items-center space-x-2 mb-2">
//                     <Sparkles className="h-4 w-4 text-cyan-400" />
//                     <span>Select your role:</span>
//                   </label>
//                   <div className="grid gap-6">
//                     {roles.map((roleOption) => (
//                       <label key={roleOption.id} className="cursor-pointer group">
//                         <input
//                           type="radio"
//                           name="role"
//                           value={roleOption.id}
//                           checked={role === roleOption.id}
//                           onChange={(e) => setRole(e.target.value)}
//                           className="sr-only"
//                           aria-checked={role === roleOption.id}
//                           aria-label={roleOption.name}
//                         />
//                         <div
//                           className={`relative p-7 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
//                             role === roleOption.id
//                               ? `border-transparent bg-gradient-to-r ${roleOption.bgGradient} shadow-lg shadow-blue-500/20`
//                               : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
//                           }`}
//                           tabIndex={0}
//                           role="radio"
//                           aria-checked={role === roleOption.id}
//                           onClick={() => setRole(roleOption.id)}
//                           onKeyDown={e => {
//                             if (e.key === 'Enter' || e.key === ' ') setRole(roleOption.id);
//                           }}
//                         >
//                           {role === roleOption.id && (
//                             <div className={`absolute inset-0 bg-gradient-to-r ${roleOption.borderGradient} rounded-2xl blur-sm`}></div>
//                           )}

//                           <div className="relative flex items-start space-x-6">
//                             <div className={`p-3 rounded-xl bg-gradient-to-r ${roleOption.gradient} shadow-lg`}>
//                               <roleOption.icon className="h-6 w-6 text-white" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="font-semibold text-white text-lg mb-2">{roleOption.name}</div>
//                               <div className="text-sm text-gray-300 leading-relaxed">{roleOption.description}</div>
//                             </div>
//                           </div>

//                           {role === roleOption.id && (
//                             <div className="absolute top-4 right-4">
//                               <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
//                                 <div className="w-2 h-2 bg-white rounded-full"></div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                   {role && (
//                     <div className="text-sm text-cyan-400 font-medium text-center mt-2">
//                       ✓ Selected: {roles.find(r => r.id === role)?.name}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 userRole ? (
//                   <div className="space-y-4">
//                     <label className="text-sm font-medium text-gray-300 flex items-center space-x-2 mb-2">
//                       <Sparkles className="h-4 w-4 text-cyan-400" />
//                       <span>Your role:</span>
//                     </label>
//                     <div className="relative p-7 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500/10 to-cyan-500/10 shadow-lg">
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-sm"></div>
//                       <div className="relative flex items-center space-x-6">
//                         <div className={`p-3 rounded-xl bg-gradient-to-r ${roles.find(r => r.id === userRole)?.gradient} shadow-lg`}>
//                           {roles.find(r => r.id === userRole)?.icon && React.createElement(roles.find(r => r.id === userRole)?.icon!)}
//                         </div>
//                         <div>
//                           <div className="font-semibold text-white text-lg">{roles.find(r => r.id === userRole)?.name}</div>
//                           <div className="text-sm text-gray-300">{roles.find(r => r.id === userRole)?.description}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center p-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
//                     <span className="text-sm text-yellow-300 text-center">Please register first to continue with Google sign-in.</span>
//                   </div>
//                 )
//               )}
//             </div>

//             {/* Google Sign-In Button */}
//             <div className="mt-8">
//               <button
//                 type="button"
//                 onClick={handleGoogleSignIn}
//                 disabled={loading}
//                 className="group relative w-full flex justify-center items-center py-4 px-6 border-2 border-gray-600 hover:border-cyan-400 text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                 <svg className="relative w-6 h-6 mr-3" viewBox="0 0 48 48">
//                   <g>
//                     <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.7 30.77 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.2C12.36 13.6 17.73 9.5 24 9.5z"/>
//                     <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/>
//                     <path fill="#FBBC05" d="M10.67 28.29c-1.01-2.99-1.01-6.2 0-9.19l-7.98-6.2C.7 17.23 0 20.53 0 24c0 3.47.7 6.77 1.96 9.1l7.98-6.2z"/>
//                     <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.6c-2 1.34-4.56 2.13-8.71 2.13-6.27 0-11.64-4.1-13.33-9.6l-7.98 6.2C6.71 42.2 14.82 48 24 48z"/>
//                     <path fill="none" d="M0 0h48v48H0z"/>
//                   </g>
//                 </svg>

//                 <span className="relative">
//                   {loading ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span>{isRegister ? 'Processing...' : 'Signing in...'}</span>
//                     </div>
//                   ) : (
//                     isRegister ? 'Sign up with Google' : 'Sign in with Google'
//                   )}
//                 </span>
//               </button>
//             </div>

//             <div className="text-center mt-8">
//               <button
//                 type="button"
//                 onClick={() => setIsRegister(!isRegister)}
//                 className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
//               >
//                 {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { Building, Heart, Shield, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const roles = [
  {
    id: "donor",
    name: "Donor",
    description:
      "Fund verified requests and track impact with blockchain transparency",
    icon: Heart,
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-500/10 to-pink-500/10",
  },
  {
    id: "beneficiary",
    name: "Beneficiary",
    description:
      "Request aid with AI-powered identity verification and NGO validation",
    icon: User,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "ngo",
    name: "NGO Partner",
    description:
      "Validate requests and deliver aid with smart contract automation",
    icon: Building,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
];

const redirectToDashboard = (
  role: string,
  navigate: (path: string) => void,
) => {
  switch (role) {
    case "donor":
      navigate("/donor");
      break;
    case "beneficiary":
      navigate("/beneficiary");
      break;
    case "ngo":
      navigate("/ngo");
      break;
    default:
      navigate("/");
  }
};

const LoginPage: React.FC = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  // Track mouse for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // On mount: check if user is already logged in
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Not logged in — just show the login button
          setCheckingSession(false);
          return;
        }

        // Logged in — check if they have a role in profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role) {
          // Already has a role — redirect straight to their dashboard
          redirectToDashboard(profile.role, navigate);
        } else {
          // Logged in but no role yet — show role selection modal
          setShowRoleModal(true);
          setCheckingSession(false);
        }
      } catch (err) {
        setCheckingSession(false);
      }
    };

    checkUserRole();
  }, [navigate]);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/oauth-callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  // Save selected role to Supabase profiles table
  const handleSaveRole = async () => {
    if (!role) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Session expired. Please sign in again.");

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        role,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || "",
      });
      if (error) throw error;

      setUserRole(role);
      setShowRoleModal(false);
      redirectToDashboard(role, navigate);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show a spinner while we check the session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-16 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div
          className="absolute inset-0 opacity-20 transition-all duration-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-40" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-2">Welcome to TrustAid</h2>
          <p className="text-gray-400 text-lg">
            Join the future of transparent charitable giving
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
          {errorMsg && (
            <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          {/* Show current role if already assigned */}
          {userRole && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Signed in as
              </p>
              <div
                className={`p-4 rounded-xl bg-gradient-to-r ${roles.find((r) => r.id === userRole)?.bgGradient} border border-white/10`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${roles.find((r) => r.id === userRole)?.gradient}`}
                  >
                    {React.createElement(
                      roles.find((r) => r.id === userRole)!.icon,
                      { className: "h-5 w-5 text-white" },
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {roles.find((r) => r.id === userRole)?.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      {roles.find((r) => r.id === userRole)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group w-full flex items-center justify-center gap-3 py-3 px-6 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                {/* Google SVG icon */}
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.7 30.77 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.2C12.36 13.6 17.73 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.67 28.29c-1.01-2.99-1.01-6.2 0-9.19l-7.98-6.2C.7 17.23 0 20.53 0 24c0 3.47.7 6.77 1.96 9.1l7.98-6.2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.19-5.6c-2 1.34-4.56 2.13-8.71 2.13-6.27 0-11.64-4.1-13.33-9.6l-7.98 6.2C6.71 42.2 14.82 48 24 48z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            New users will be asked to select a role after sign-in
          </p>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <Shield className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">Choose Your Role</h3>
              <p className="text-gray-400 text-sm mt-1">
                This cannot be changed later
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3 mb-6">
              {roles.map((roleOption) => {
                const Icon = roleOption.icon;
                const isSelected = role === roleOption.id;
                return (
                  <button
                    key={roleOption.id}
                    onClick={() => setRole(roleOption.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${roleOption.gradient} shrink-0`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {roleOption.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {roleOption.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSaveRole}
              disabled={!role || loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Confirm Role & Continue"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;