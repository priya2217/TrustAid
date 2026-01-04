import { Building, Heart, Shield, Sparkles, User } from "lucide-react";
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
    borderGradient: "from-red-500/30 to-pink-500/30",
  },
  {
    id: "beneficiary",
    name: "Beneficiary",
    description:
      "Request aid with AI-powered identity verification and NGO validation",
    icon: User,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderGradient: "from-blue-500/30 to-cyan-500/30",
  },
  {
    id: "ngo",
    name: "NGO Partner",
    description:
      "Validate requests and deliver aid with smart contract automation",
    icon: Building,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    borderGradient: "from-green-500/30 to-emerald-500/30",
  },
];

const LoginPage: React.FC = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        // User is already logged in, check if they have a role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profile?.role) {
          // User has a role, redirect to dashboard
          switch (profile.role) {
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
        } else {
          // User logged in but no role - show role selection
          setShowRoleModal(true);
        }
      }
    };

    checkExistingSession();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Store selected role if provided (for new users)
      if (role) {
        localStorage.setItem("pending_google_role", role);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/oauth-callback?signin=1`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || "Google sign-in failed");
      setLoading(false);
    }
  };

  const handleSaveRole = async () => {
    if (!role) {
      setErrorMsg("Please select a role");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Create or update profile with role
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        role: role,
      });

      if (profileError) throw profileError;

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role },
      });

      if (metadataError) throw metadataError;

      setShowRoleModal(false);

      // Redirect to appropriate dashboard
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
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-16 px-4">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        ></div>
        <div className="absolute top-1/5 left-1/5 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/5 right-1/5 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-12">
        <div className="text-center">
          <div className="mb-10 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-12 w-12 text-white mx-auto" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-2">Welcome to TrustAid</h2>
          <p className="text-gray-300 text-lg">
            Join the future of transparent charitable giving
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-10 border border-gray-700 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-center backdrop-blur-sm mb-6">
              {errorMsg}
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-6 mb-8">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Select your role (optional for existing users):</span>
            </label>
            <div className="grid gap-6">
              {roles.map((roleOption) => (
                <label key={roleOption.id} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption.id}
                    checked={role === roleOption.id}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`relative p-7 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      role === roleOption.id
                        ? `border-transparent bg-gradient-to-r ${roleOption.bgGradient} shadow-lg shadow-blue-500/20`
                        : "border-gray-600 hover:border-gray-500 bg-gray-800/30"
                    }`}
                  >
                    {role === roleOption.id && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${roleOption.borderGradient} rounded-2xl blur-sm`}
                      ></div>
                    )}

                    <div className="relative flex items-start space-x-6">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${roleOption.gradient} shadow-lg`}
                      >
                        <roleOption.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-lg mb-2">
                          {roleOption.name}
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed">
                          {roleOption.description}
                        </div>
                      </div>
                    </div>

                    {role === roleOption.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full group relative flex justify-center items-center py-4 px-6 border-2 border-gray-600 hover:border-cyan-400 text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <svg className="relative w-6 h-6 mr-3" viewBox="0 0 48 48">
              <g>
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
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>

            <span className="relative">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Continue with Google"
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Select your role</h3>
            <p className="text-sm text-gray-600 mb-6">
              Choose how you'd like to use TrustAid
            </p>
            <div className="space-y-4 mb-6">
              {roles.map((roleOption) => (
                <label
                  key={roleOption.id}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <input
                    type="radio"
                    name="modalRole"
                    value={roleOption.id}
                    checked={role === roleOption.id}
                    onChange={() => setRole(roleOption.id)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <div>
                    <span className="font-semibold block">
                      {roleOption.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {roleOption.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {errorMsg && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}
            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 hover:bg-indigo-700 transition"
              onClick={handleSaveRole}
              disabled={!role || loading}
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
