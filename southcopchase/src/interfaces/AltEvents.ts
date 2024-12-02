// src/interfaces/AltEvents.ts
export interface CharacterData {
  heritage: {
    fatherIndex: number;
    motherIndex: number;
    resemblance: number;
    skinTone: number;
  };
  features: Record<string, number>;
  hair: {
    style: number;
    color: number;
    highlight: number;
  };
}

export interface AltEvents {
  updateCharacterFeatures: (data: CharacterData) => void;
  saveCharacter: (data: CharacterData) => void;
  rotateCharacter: (direction: "left" | "right") => void;
  selectGameMode: (mode: "openworld" | "copchase") => void;
}

declare global {
  interface Window {
    alt?: {
      emit: <K extends keyof AltEvents>(event: K, ...args: Parameters<AltEvents[K]>) => void;
      on: <K extends keyof AltEvents>(event: K, handler: AltEvents[K]) => void;
    };
  }
}
