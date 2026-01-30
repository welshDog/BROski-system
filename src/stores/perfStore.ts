import { create } from 'zustand';

interface PerfState {
  animationsPaused: boolean;
  highMaterialEnabled: boolean;
  setAnimationsPaused: (v: boolean) => void;
  setHighMaterialEnabled: (v: boolean) => void;
}

export const usePerfStore = create<PerfState>((set) => ({
  animationsPaused: false,
  highMaterialEnabled: false,
  setAnimationsPaused: (v) => set({ animationsPaused: v }),
  setHighMaterialEnabled: (v) => set({ highMaterialEnabled: v })
}));
