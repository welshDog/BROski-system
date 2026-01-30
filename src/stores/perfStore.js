import { create } from 'zustand';
export const usePerfStore = create((set) => ({
    animationsPaused: false,
    highMaterialEnabled: false,
    setAnimationsPaused: (v) => set({ animationsPaused: v }),
    setHighMaterialEnabled: (v) => set({ highMaterialEnabled: v })
}));
