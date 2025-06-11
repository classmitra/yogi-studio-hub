
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithPhone: (phone: string) => Promise<{ error: any }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email || session?.user?.phone);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        if (!mounted) return;
        
        console.log('Initial session:', session?.user?.email || session?.user?.phone);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (!mounted) return;
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('SignUp called with:', { email, firstName, lastName });
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      console.log('SignUp result:', { error });
      return { error };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('SignIn called with:', { email });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('SignIn result:', { error });
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    }
  };

  const signInWithPhone = async (phone: string) => {
    try {
      console.log('SignInWithPhone called with:', { phone });
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      
      console.log('SignInWithPhone result:', { error });
      return { error };
    } catch (error) {
      console.error('SignInWithPhone error:', error);
      return { error };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      console.log('VerifyOTP called with:', { phone, token });
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });
      
      console.log('VerifyOTP result:', { error });
      return { error };
    } catch (error) {
      console.error('VerifyOTP error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('SignOut called');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithPhone,
    verifyOTP,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
