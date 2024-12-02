import React, { useEffect } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  progress: number;
  message: string;
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, message, onComplete }) => {
  useEffect(() => {
    if (progress >= 100 && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-progress">
          <div className="progress-text">
            <span className="message">{message}</span>
            <span className="percentage">{progress}%</span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${progress}%`,
                transition: "width 0.3s ease-out"
              }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;