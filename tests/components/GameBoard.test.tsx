import React from 'react';
import { render, screen } from '@testing-library/react';
import GameBoard from '@/components/3D/GameBoard';
import { expect, test, vi } from 'vitest';

vi.mock('@react-three/fiber', async (importOriginal) => {
  const mod = await importOriginal<any>();
  return {
    ...mod,
    Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
    useThree: () => ({ viewport: { width: 10, height: 10 }, gl: { getPixelRatio: () => 1 } })
  };
});

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null
}));

test('GameBoard renders canvas wrapper', () => {
  render(<GameBoard />);
  expect(screen.getByTestId('canvas')).toBeInTheDocument();
});
