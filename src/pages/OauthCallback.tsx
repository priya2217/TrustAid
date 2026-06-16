import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

type AuthStage = "loading" | "error";

const ROLE_ROUTES: Record<string, string> = {
  donor: "/donor",
  beneficiary: "/beneficiary",
  ngo: "/ngo",
};

const OauthCallback = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<AuthStage>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .maybeSingle();

          if (profileError) throw profileError;

          if (profile?.role && ROLE_ROUTES[profile.role]) {
            navigate(ROLE_ROUTES[profile.role], { replace: true });
          } else {
            // New user — go to login, role modal will appear
            navigate("/login", { replace: true });
          }
        } catch (err: any) {
          setErrorMsg(err.message || "Failed to load your profile.");
          setStage("error");
        }
      } else if (event === "SIGNED_OUT") {
        navigate("/login", { replace: true });
      }
    });

    // Fallback: if onAuthStateChange never fires (e.g. direct page load
    // with no hash/code), redirect after a reasonable timeout
    const timeout = setTimeout(() => {
      setErrorMsg("Sign-in timed out. Please try again.");
      setStage("error");
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  // Auto-redirect on error after a short delay
  useEffect(() => {
    if (stage !== "error") return;
    const timer = setTimeout(() => navigate("/login", { replace: true }), 3000);
    return () => clearTimeout(timer);
  }, [stage, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4 px-4">
      {stage === "error" ? (
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-xl">!</span>
          </div>
          <p className="text-red-300 text-sm font-medium">{errorMsg}</p>
          <p className="text-gray-500 text-xs">Redirecting to login...</p>
        </div>
      ) : (
        <>
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Completing sign-in...</p>
        </>
      )}
    </div>
  );
};

export default OauthCallback;
