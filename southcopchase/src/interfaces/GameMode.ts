// src/interfaces/GameMode.ts
export interface GameMode {
  id: string;
  name: string;
  description: string;
  image: string;
  playerCount: {
    current: number;
    max: number;
  };
  status: {
    isActive: boolean;
    hasChase: boolean;
  };
}
