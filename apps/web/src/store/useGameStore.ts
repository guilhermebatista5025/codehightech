import { create } from 'zustand';
import { StorageManager } from '../lib/StorageManager';

interface GameState {
  currentPhase: number;
  completedPhases: number[];
  unlockedAchievements: string[];
  completePhase: (phaseId: number) => void;
  unlockAchievement: (achievementId: string) => void;
  loadState: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPhase: 1,
  completedPhases: [],
  unlockedAchievements: [],

  completePhase: (phaseId) => {
    const completed = [...get().completedPhases, phaseId];
    // Remove duplicates
    const uniqueCompleted = Array.from(new Set(completed));
    const nextPhase = Math.max(...uniqueCompleted) + 1;

    set({ completedPhases: uniqueCompleted, currentPhase: nextPhase });
    StorageManager.save('game:progress', { completedPhases: uniqueCompleted, currentPhase: nextPhase });
  },

  unlockAchievement: (achievementId) => {
    if (get().unlockedAchievements.includes(achievementId)) return;
    
    const unlocked = [...get().unlockedAchievements, achievementId];
    set({ unlockedAchievements: unlocked });
    StorageManager.save('game:achievements', unlocked);
  },

  loadState: () => {
    const progress = StorageManager.load('game:progress') || { currentPhase: 1, completedPhases: [] };
    const achievements = StorageManager.load('game:achievements') || [];
    set({ 
      currentPhase: progress.currentPhase, 
      completedPhases: progress.completedPhases,
      unlockedAchievements: achievements
    });
  }
}));
