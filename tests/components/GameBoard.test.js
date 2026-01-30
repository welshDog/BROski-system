import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import GameBoard from '@/components/3D/GameBoard';
import { expect, test, vi } from 'vitest';
vi.mock('@react-three/fiber', async (importOriginal) => {
    const mod = await importOriginal();
    const fakeCamera = {
        position: {
            x: 0, y: 15, z: 0,
            clone: () => ({ x: 0, y: 15, z: 0 }),
            set: (x, y, z) => { fakeCamera.position.x = x; fakeCamera.position.y = y; fakeCamera.position.z = z; }
        },
        lookAt: () => { }
    };
    return {
        ...mod,
        Canvas: ({ children }) => _jsx("div", { "data-testid": "canvas", children: children }),
        useThree: () => ({ camera: fakeCamera, viewport: { width: 10, height: 10 }, gl: { getPixelRatio: () => 1 } })
    };
});
vi.mock('@react-three/drei', () => ({
    OrbitControls: () => null
}));
vi.mock('@/components/3D/SoundEffects', () => ({ default: () => null }));
test('GameBoard renders canvas wrapper', () => {
    render(_jsx(GameBoard, {}));
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
});
