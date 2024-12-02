// src/utils/alt.ts
import type { CharacterData, AltEvents } from "../interfaces/AltEvents";

class AltManager {
  private static instance: AltManager;

  private constructor() {}

  public static getInstance(): AltManager {
    if (!AltManager.instance) {
      AltManager.instance = new AltManager();
    }
    return AltManager.instance;
  }

  public emit<K extends keyof AltEvents>(event: K, ...args: Parameters<AltEvents[K]>): void {
    if ("alt" in window) {
      window.alt?.emit(event, ...args);
    } else {
      console.log("Alt:V event:", event, args);
    }
  }

  public on<K extends keyof AltEvents>(event: K, handler: AltEvents[K]): void {
    if ("alt" in window) {
      window.alt?.on(event, handler);
    }
  }
}

export const altManager = AltManager.getInstance();
