import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoinCounter from '@/components/UI/CoinCounter';
import { useGameStore } from '@/stores/gameStore';
describe('CoinCounter', () => {
    it('reflects coin balance', () => {
        useGameStore.setState({ coinBalance: 100 });
        render(_jsx(CoinCounter, {}));
        expect(screen.getByText('100')).toBeTruthy();
        useGameStore.getState().addCoins(25);
        expect(screen.getByText('125')).toBeTruthy();
    });
});
