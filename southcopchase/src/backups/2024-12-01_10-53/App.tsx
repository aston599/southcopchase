import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faSignInAlt,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNightMode, setIsNightMode] = useState(true);

  return (
    <div className="root-container">
      <div className={`app-container ${isNightMode ? "night" : "day"}`}>
        <div className="center-wrapper">
          <div className="login-container">
            <div className="header">
              <h1>Ben Mike</h1>
              <p className="welcome-text">Los Santos'un kapıları sana açık. Maceraya hazır mısın?</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı Adı"
                />
              </div>
              <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifre"
                />
              </div>
              <button type="submit" className="login-button">
                <FontAwesomeIcon icon={faSignInAlt} className="button-icon" />
                Giriş Yap
              </button>
            </form>
          </div>
        </div>

        <button 
          onClick={() => setIsNightMode(!isNightMode)} 
          className="mode-toggle"
        >
          <FontAwesomeIcon icon={isNightMode ? faSun : faMoon} />
          {isNightMode ? 'Gündüz Modu' : 'Gece Modu'}
        </button>
      </div>
    </div>
  );
}

export default App;
