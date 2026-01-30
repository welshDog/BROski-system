import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CoinCounter from '@/components/UI/CoinCounter';
import { useGameStore } from '@/stores/gameStore';

describe('CoinCounter', () => {
  it('reflects coin balance', async () => {
    useGameStore.setState({ coinBalance: 100 });
    render(<CoinCounter />);
    expect(screen.getByText('100')).toBeTruthy();
    act(() => {
      useGameStore.getState().addCoins(25);
    });
    expect(await screen.findByText('125')).toBeTruthy();
  });
});
