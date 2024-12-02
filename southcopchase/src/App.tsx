import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faMoon, faSun, faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PasswordField from "./components/PasswordField";
import Checkbox from "./components/Checkbox";
import GameModeSelection from "./components/GameModeSelection";
import LoadingScreen from "./components/LoadingScreen";
import CharacterCreation from "./components/CharacterCreation";
import { useAuth } from "./hooks/useAuth";
import { altManager } from "./utils/alt";
import { saveToStorage, getFromStorage } from "./utils/storage";
import "./App.css";

const App: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading: authLoading,
    error,
    handleLogin
  } = useAuth();

  const [isNightMode, setIsNightMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasCharacter, setHasCharacter] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(null);

    if (username === "admin" && password === "123456") {
      setShowLoading(true);
      setLoadingProgress(0);

      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowLoading(false);
            setIsLoggedIn(true);
            setHasCharacter(false);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    } else {
      setShowError("Hatalı kullanıcı adı veya şifre!");
    }
  };

  if (showLoading) {
    return <LoadingScreen 
      progress={loadingProgress}
      message={loadingProgress < 100 ? "Giriş yapılıyor..." : "Giriş başarılı!"}
      onComplete={() => {
        setIsLoggedIn(true);
        setHasCharacter(false);
      }}
    />;
  }

  if (isLoggedIn) {
    if (!hasCharacter) {
      return <CharacterCreation />;
    }
    return <GameModeSelection onSelect={(mode: "openworld" | "copchase") => console.log("Selected mode:", mode)} />;
  }

  return (
    <div className="root-container">
      <div className={`app-container ${isNightMode ? "night" : "day"}`}>
        <div className="center-wrapper">
          {showError && (
            <div className="notification-container error">
              <FontAwesomeIcon icon={faExclamationCircle} className="notification-icon" />
              <p>{showError}</p>
            </div>
          )}
          <div className="login-container">
            <div className="header">
              <h1>Ben Mike</h1>
              <p className="welcome-text">
                Sunucuya hoş geldiniz! Maceraya katılmak için giriş yap!
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı Adı"
                  disabled={authLoading}
                />
              </div>
              
              <PasswordField
                value={password}
                onChange={setPassword}
                disabled={authLoading}
              />

              <Checkbox
                checked={rememberMe}
                onChange={setRememberMe}
                label="Beni Hatırla"
                disabled={authLoading}
              />

              <button 
                type="submit" 
                className={`login-button ${authLoading ? "loading" : ""}`}
                disabled={authLoading}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="button-icon" />
                {authLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
          </div>
        </div>

        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className="mode-toggle"
        >
          <FontAwesomeIcon icon={isNightMode ? faSun : faMoon} />
          {isNightMode ? "Gündüz Modu" : "Gece Modu"}
        </button>
      </div>
    </div>
  );
};

export default App;