"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// --- Types ---
type User = {
  id: number;
  email: string;
  username: string;
  prenom: string;
  nom: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
};

// --- Stockage du token en mémoire (hors React) ---
let _accessToken: string | null = null;

export function getAccessToken() {
  return _accessToken;
}

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

// --- Contexte React ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // 🟢 Quand le composant est monté, essayer de rafraîchir le token
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setToken(data.accessToken);
          setAccessToken(data.accessToken); // 🔑 met à jour la variable globale
          setUser(data.user);
        }
      } catch (err) {
        console.error("Erreur lors du refresh token :", err);
        setToken(null);
        setAccessToken(null);
        setUser(null);
      }
    };

    refresh();
  }, []);

  const login = (newToken: string, user: User) => {
    setToken(newToken);
    setAccessToken(newToken); // 🔑 met à jour la variable globale
    setUser(user);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur logout :", err);
    }
    setToken(null);
    setAccessToken(null); // 🔑 nettoyage
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
