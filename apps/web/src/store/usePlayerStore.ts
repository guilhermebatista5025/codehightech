import { create } from 'zustand';
import { StorageManager } from '../lib/StorageManager';

interface PlayerProfile {
  name: string;
  role: string;
  avatar: string;
  startDate: string;
}

interface PlayerState {
  profile: PlayerProfile;
  xp: number;
  streak: number;
  setProfile: (profile: Partial<PlayerProfile>) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  loadState: () => void;
}

const defaultProfile: PlayerProfile = {
  name: 'Dev',
  role: 'Estagiário',
  avatar: 'default.png',
  startDate: new Date().toISOString(),
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  profile: defaultProfile,
  xp: 0,
  streak: 0,

  setProfile: (profileData) => {
    const updatedProfile = { ...get().profile, ...profileData };
    set({ profile: updatedProfile });
    StorageManager.save('player:profile', updatedProfile);
  },

  addXp: (amount) => {
    const newXp = get().xp + amount;
    set({ xp: newXp });
    StorageManager.save('player:xp', newXp);
    
    // Futuro: Lógica de level up (Estagiário -> Júnior, etc) com base no XP.
  },

  incrementStreak: () => {
    const newStreak = get().streak + 1;
    set({ streak: newStreak });
    StorageManager.save('player:streak', newStreak);
  },

  loadState: () => {
    const profile = StorageManager.load('player:profile') || defaultProfile;
    const xp = StorageManager.load('player:xp') || 0;
    const streak = StorageManager.load('player:streak') || 0;
    set({ profile, xp, streak });
  }
}));
