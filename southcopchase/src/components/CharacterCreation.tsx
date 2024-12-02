import React, { useState, useEffect } from "react";
import { altManager } from "../utils/alt";
import "./CharacterCreation.css";

interface CharacterFeatures {
  mother: number;
  father: number;
  resemblance: number;
  skinTone: number;
  features: Record<string, number>;
  hair: Record<string, number>;
  eyebrows: Record<string, number>;
  facialHair: Record<string, number>;
}

const CharacterCreation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"heritage" | "features" | "hair">("heritage");
  const [features, setFeatures] = useState<CharacterFeatures>({
    mother: 21,
    father: 0,
    resemblance: 0.5,
    skinTone: 0.5,
    features: {
      noseWidth: 0,
      nosePeakHeight: 0,
      nosePeakLength: 0,
      noseBoneHeight: 0,
      nosePeakLowering: 0,
      noseBoneTwist: 0,
      eyeBrowHeight: 0,
      eyeBrowForward: 0,
      cheekBoneHeight: 0,
      cheekBoneWidth: 0,
      cheekWidth: 0,
      eyeOpenings: 0,
      lipThickness: 0,
      jawBoneWidth: 0,
      jawBoneLength: 0,
      chinBoneLowering: 0,
      chinBoneLength: 0,
      chinBoneWidth: 0,
      chinDimple: 0,
      neckThickness: 0
    },
    hair: {
      style: 0,
      color: 0,
      highlight: 0
    },
    eyebrows: {
      style: 0,
      color: 0
    },
    facialHair: {
      style: 0,
      color: 0
    }
  });

  useEffect(() => {
    if ('alt' in window) {
      window.alt?.on('characterSaved', () => {
        setLoading(false);
        setError(null);
      });

      window.alt?.on('characterError', (errorMessage: string) => {
        setLoading(false);
        setError(errorMessage);
      });
    }

    return () => {
      // Cleanup
    };
  }, []);

  const handleFeatureChange = (category: keyof CharacterFeatures, feature: string, value: number) => {
    setFeatures(prev => {
      if (typeof prev[category] === 'object') {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [feature]: value
          }
        };
      }
      return {
        ...prev,
        [category]: value
      };
    });

    // Alt:V'ye değişiklikleri gönder
    altManager.emit('updateCharacterFeatures', features);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await altManager.emit('saveCharacter', features);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Karakter kaydedilirken bir hata oluştu');
      setLoading(false);
    }
  };

  return (
    <div className="character-creator">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="character-preview">
        <div className="rotate-controls">
          <button 
            onClick={() => altManager.emit('rotateCharacter', 'left')}
            disabled={loading}
          >
            ←
          </button>
          <button 
            onClick={() => altManager.emit('rotateCharacter', 'right')}
            disabled={loading}
          >
            →
          </button>
        </div>
      </div>

      <div className="creator-interface">
        {/* Mevcut tab sistemi ve içerik */}
        
        <button 
          className={`save-button ${loading ? 'loading' : ''}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Kaydediliyor...' : 'Karakteri Kaydet'}
        </button>
      </div>
    </div>
  );
};

export default CharacterCreation;



