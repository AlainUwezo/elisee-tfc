/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/helpers/superbaseClient";

interface UserInfo {
  user_name: string;
  role: string;
  auth_id: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  userInfo: UserInfo | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Interface pour les props du fournisseur d'authentification
interface Props {
  children: ReactNode;
}

// Fournisseur du contexte d'authentification
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData.session?.user ?? null;
      if (currentUser) {
        await fetchUserInfo(currentUser.id);
      } else {
        setUserInfo(null);
      }
      setUser(currentUser);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserInfo = async (auth_id: string) => {
    const { data, error } = await supabase
      .from("Account")
      .select("user_name, role, auth_id, created_at")
      .eq("auth_id", auth_id)
      .single();

    if (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur :",
        error
      );
      return;
    }

    if (data) {
      setUserInfo(data);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur de connexion :", error.message); // Log de l'erreur
      throw error;
    }

    setUser(data.user);
    if (data.user) {
      await fetchUserInfo(data.user.id);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Erreur d'inscription :", error.message); // Log de l'erreur
      throw error;
    }

    setUser(data.user);
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur de déconnexion :", error.message); // Log de l'erreur
      throw error;
    }
    setUser(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ user, userInfo, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
