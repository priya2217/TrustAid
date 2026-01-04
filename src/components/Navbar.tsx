import { LogOut, Shield, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch role from database when user changes
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        // First try to get from user metadata
        const metadataRole = user.user_metadata?.role;

        if (metadataRole) {
          setUserRole(metadataRole);
        } else {
          // If not in metadata, fetch from database
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          if (profile?.role) {
            setUserRole(profile.role);

            // Update metadata to sync
            await supabase.auth.updateUser({
              data: { role: profile.role },
            });
          }
        }
      } else {
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="group flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TrustAid
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wider">
                BLOCKCHAIN VERIFIED
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate("/profile")}
                    className="group relative p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                    title="Profile"
                    type="button"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <User className="relative h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">
                      {user.user_metadata?.full_name ||
                        user.user_metadata?.name ||
                        user.email?.split("@")[0]}
                    </span>

                    {userRole && (
                      <span className="relative text-xs px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold border border-cyan-400/30 shadow-lg">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 text-red-400 hover:from-red-600 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
