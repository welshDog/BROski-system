import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addCoinsToLeveling } from '@/utils/leveling';
export const useGameStore = create()(persist((set, get) => ({
    position: 0,
    level: 1,
    experience: 0,
    coinBalance: 0,
    appearance: {
        baseColor: '#FF6B6B',
        hatId: null,
        wingId: null,
        petId: null
    },
    moveAvatar: (spaces) => set((state) => ({ position: Math.min(state.position + spaces, 50) })),
    addCoins: (amount) => set((state) => {
        const coinBalance = state.coinBalance + amount;
        const leveling = addCoinsToLeveling({ level: state.level, experience: state.experience }, amount);
        return { coinBalance, level: leveling.level, experience: leveling.experience };
    }),
    setAppearance: (newAppearance) => set((state) => ({ appearance: { ...state.appearance, ...newAppearance } })),
    resetPosition: () => set({ position: 0 })
}), { name: 'game-store' }));
