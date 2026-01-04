import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoad] = useState(true);

  // Function to refresh user data
  const refreshUser = async () => {
    const {
      data: { user: freshUser },
    } = await supabase.auth.getUser();
    if (freshUser) {
      setUser(freshUser);
    }
  };

  // Keep session in sync on refresh / tab change
  useEffect(() => {
    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Always fetch fresh user data to ensure metadata is current
        const {
          data: { user: freshUser },
        } = await supabase.auth.getUser();
        setUser(freshUser || session.user);
      } else {
        setUser(null);
      }
      setLoad(false);
    });

    // Initial session fetch
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch fresh user data with metadata
        const {
          data: { user: freshUser },
        } = await supabase.auth.getUser();
        setUser(freshUser || session.user);
      } else {
        setUser(null);
      }
      setLoad(false);
    };

    initAuth();

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, _role?: string) => {
    setLoad(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session?.user) {
        // Fetch profile from database
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, name")
          .eq("id", data.session.user.id)
          .single();

        if (profile) {
          // Update user metadata to match database
          await supabase.auth.updateUser({
            data: {
              role: profile.role,
              full_name: profile.name,
            },
          });

          // Fetch fresh user data
          const {
            data: { user: freshUser },
          } = await supabase.auth.getUser();
          setUser(freshUser || data.session.user);
        } else {
          setUser(data.session.user);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoad(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => {
    setLoad(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (error) throw error;

      // If email confirmation is disabled, create profile immediately
      if (data.user && !data.session) {
        // Email confirmation required - don't create profile yet
        // Profile will be created after email confirmation
      } else if (data.user && data.session) {
        // Auto-confirmed, create profile
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          name: fullName,
          role: role,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoad(false);
    }
  };

  const logout = async () => {
    setLoad(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem("last_google_role");
      localStorage.removeItem("pending_google_role");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
