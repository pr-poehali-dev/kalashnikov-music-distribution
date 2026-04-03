import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import func2url from "../../backend/func2url.json";

interface User {
  id: number;
  email: string;
  name: string;
  artist_name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (data: RegisterData) => Promise<string | null>;
  logout: () => void;
  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;
  authOpen: boolean;
  authMode: "login" | "register";
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  artist_name?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("sd_token"));
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(func2url["auth-me"], {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else { localStorage.removeItem("sd_token"); setToken(null); }
      })
      .catch(() => { localStorage.removeItem("sd_token"); setToken(null); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email: string, password: string): Promise<string | null> => {
    const res = await fetch(func2url["auth-login"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return data.error || "Ошибка входа";
    localStorage.setItem("sd_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return null;
  };

  const register = async (regData: RegisterData): Promise<string | null> => {
    const res = await fetch(func2url["auth-register"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });
    const data = await res.json();
    if (!res.ok) return data.error || "Ошибка регистрации";
    localStorage.setItem("sd_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return null;
  };

  const logout = () => {
    localStorage.removeItem("sd_token");
    setToken(null);
    setUser(null);
  };

  const openAuth = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, openAuth, closeAuth, authOpen, authMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
