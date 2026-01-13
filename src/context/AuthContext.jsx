import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabaseClient/supabase";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Changed default to null
    const [loading, setLoading] = useState(true);

    // Define this as a reusable function
    const refreshProfile = async (userId) => {
        const targetId = userId || user?.id;
        if (!targetId) return;

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", targetId)
                .maybeSingle();

            if (error) throw error;
            setProfile(data);
            return data;
        } catch (err) {
            console.error("Profile Refresh Error:", err.message);
        }
    };

    const signUp = async (formData) => {
        setError(null);

        const { data,  error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if(authError) throw authError;

        if(!data.user){
            throw new Error("Check your email to confirm your account");
        };
       const {password, ...profileData} = formData;

        const { error: profileError } = await supabase
        .from("profiles")
        .insert({
             id: data.user.id,
            ...profileData,
        });

        if(profileError) throw profileError;

        setUser(data.user);
        setProfile({ role: formData.role });
    };


   const login = async (email, password) => {
  setError(null);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) setError(error.message);
  if (!data || !data.user) setError("Login failed");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError){
    setError(profileError)
  };

  setUser(data.user);
  setProfile(profile);

  return profile.role;
};
    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                await refreshProfile(session.user.id); // Use the new function
            }
            setLoading(false);
        };

        getInitialSession();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                refreshProfile(session.user.id);
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        // Add refreshProfile to the context value
        <AuthContext.Provider value={{ user, profile, signUp, login, logout, error, refreshProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);