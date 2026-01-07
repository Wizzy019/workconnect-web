import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabaseClient/supabase";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);

    const signUp = async (formData) => {
        setError(null);

        const { data,  error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if(authError) throw authError;

        if(!data.user){
            throw new Error("Check your email to confirm your account");
        }

        const { error: profileError } = await supabase
        .from("profiles")
        .insert({
             id: data.user.id,
            ...formData,
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

  if (profileError) throw profileError;

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
        setUser(session.user)
      await fetchAndSetProfile(session.user);
    }
    setLoading(false);
  };

  const fetchAndSetProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle(); // maybeSingle is safer than .single()

      if (error) {
        console.error("Profile Fetch Error:", error.message);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  getInitialSession();

  const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    // console.log("Auth Event:", event); // Debugging line
    if (session?.user) {
      setUser(session.user);
         fetchAndSetProfile(session.user);
    } else {
      setUser(null);
      setProfile(null);
    }
    // setLoading(false);
  });

  return () => listener.subscription.unsubscribe();
}, []);


    return (
        <AuthContext.Provider value={{ user, profile, signUp, login, logout, error}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);