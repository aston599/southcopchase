// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { altManager } from "../utils/alt";
import { saveToStorage, getFromStorage } from "../utils/storage";

interface UseAuthReturn {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  loading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUsername = getFromStorage("USERNAME");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simüle edilmiş login
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "123456") {
            resolve(true);
          } else {
            reject(new Error("Kullanıcı adı veya şifre hatalı!"));
          }
        }, 1000);
      });

      if (rememberMe) {
        saveToStorage("USERNAME", username);
      } else {
        saveToStorage("USERNAME", null);
      }

      altManager.emitLoginSuccess({ username, rememberMe });

    } catch (err: any) {
      setError(err.message);
      altManager.emitLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    handleLogin
  };
};
