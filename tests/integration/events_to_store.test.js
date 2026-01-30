import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { emitAvatarUpdate } from '@/services/events';
import { useGameStore } from '@/stores/gameStore';
describe('Avatar update events propagate to store', () => {
    it('updates coin balance and position on event', async () => {
        render(_jsx(MemoryRouter, { children: _jsx(App, {}) }));
        const before = useGameStore.getState();
        emitAvatarUpdate({ userId: 'kid-1', coinDelta: 25, positionDelta: 1 });
        const after = useGameStore.getState();
        expect(after.coinBalance).toBe(before.coinBalance + 25);
        expect(after.position).toBeGreaterThanOrEqual(before.position + 1);
    });
});
