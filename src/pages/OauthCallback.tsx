import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { RefreshCw } from "lucide-react";

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for auth state to settle
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          console.error("Session error:", sessionError);
          setStatus("Authentication failed. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const user = session.user;
        const params = new URLSearchParams(location.search);
        const isSignIn = params.get("signin") === "1";

        // Check if profile exists in database
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, email, name")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
        }

        let finalRole = profile?.role;

        // If signing in and no profile exists, user needs to register
        if (isSignIn && !profile) {
          setStatus("No account found. Please register first.");
          await supabase.auth.signOut();
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // If profile exists, use that role
        if (profile?.role) {
          setStatus(`Welcome back! Signing in as ${profile.role}...`);

          // Update user metadata to match database
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              role: profile.role,
              full_name:
                profile.name ||
                user.user_metadata?.full_name ||
                user.user_metadata?.name,
            },
          });

          if (updateError) {
            console.error("Metadata update error:", updateError);
          }

          localStorage.setItem("last_google_role", profile.role);
          finalRole = profile.role;
        } else {
          // New user - need to select role
          setStatus("Setting up your account...");

          // Get pending role from localStorage (set during registration)
          const pendingRole = localStorage.getItem("pending_google_role");

          if (!pendingRole) {
            // No role selected - redirect to login to select one
            setStatus("Please select your role.");
            await supabase.auth.signOut();
            setTimeout(() => navigate("/login"), 2000);
            return;
          }

          // Create profile with the selected role
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email,
              name:
                user.user_metadata?.full_name || user.user_metadata?.name || "",
              role: pendingRole,
            });

          if (insertError) {
            console.error("Profile creation error:", insertError);

            // If conflict, profile already exists - fetch it
            if (insertError.code === "23505") {
              const { data: existingProfile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

              if (existingProfile) {
                finalRole = existingProfile.role;
              }
            } else {
              setStatus("Failed to create profile. Please try again.");
              setTimeout(() => navigate("/login"), 2000);
              return;
            }
          } else {
            finalRole = pendingRole;
          }

          // Update user metadata
          await supabase.auth.updateUser({
            data: {
              role: finalRole,
              full_name:
                user.user_metadata?.full_name || user.user_metadata?.name,
            },
          });

          localStorage.setItem("last_google_role", finalRole);
          localStorage.removeItem("pending_google_role");
        }

        // Redirect to appropriate dashboard
        setStatus("Redirecting to dashboard...");

        setTimeout(() => {
          switch (finalRole) {
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
        }, 1000);
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("An error occurred. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full">
              <RefreshCw className="h-12 w-12 text-white animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{status}</h2>
            <p className="text-gray-300">Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OauthCallback;
