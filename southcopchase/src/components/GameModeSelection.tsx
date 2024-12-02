import React from "react";
import s1Image from "../assets/images/s1.png";
import s2Image from "../assets/images/s2.png";
import "./GameModeSelection.css";

interface GameModeSelectionProps {
  onSelect: (mode: "openworld" | "copchase") => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="gamemode-container">
      <div className="gamemode-cards">
        {/* Açık Dünya Kartı */}
        <div 
          className="gamemode-card"
          onClick={() => onSelect("openworld")}
        >
          <div className="card-image">
            <img src={s1Image} alt="Açık Dünya" />
            <div className="card-overlay">
              <div className="status-badges">
                <div className="badge-group">
                  <span className="status-badge active">
                    <span className="badge-glow"></span>
                    Aktif
                  </span>
                  <span className="player-count">128/250 Oyuncu</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Açık Dünya</h3>
                <p>Los Santos sokaklarında kendi hikayeni yaz. Şehri keşfet, işler yap, diğer oyuncularla etkileşime geç.</p>
                <button className="join-button">
                  <span className="button-text">Maceraya Başla</span>
                  <span className="button-glow"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hırsız Polis Kartı */}
        <div 
          className="gamemode-card"
          onClick={() => onSelect("copchase")}
        >
          <div className="card-image">
            <img src={s2Image} alt="Hırsız Polis" />
            <div className="card-overlay">
              <div className="status-badges">
                <div className="badge-group">
                  <span className="status-badge active">
                    <span className="badge-glow"></span>
                    Aktif
                  </span>
                  <span className="status-badge chase">
                    <span className="badge-glow"></span>
                    Kovalamaca Var!
                  </span>
                  <span className="player-count">45/100 Oyuncu</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Hırsız Polis</h3>
                <p>Taraf seç ve aksiyon dolu kovalamacalara katıl. Polisleri atlatmaya çalış veya suçluları yakala!</p>
                <button className="join-button">
                  <span className="button-text">Aksiyona Katıl</span>
                  <span className="button-glow"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection;
