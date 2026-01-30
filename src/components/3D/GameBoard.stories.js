import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameBoard from './GameBoard';
import { useGameStore } from '@/stores/gameStore';
const meta = {
    title: '3D/GameBoard',
    component: GameBoard,
    argTypes: {
        autoRotate: { control: 'boolean' },
        autoRotateSpeed: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
        ambientIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
        pointIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
        viewportHeight: { control: { type: 'number', min: 300, max: 900 } },
    }
};
export default meta;
function CanvasProvider({ children, args }) {
    const { autoRotate = true, autoRotateSpeed = 2, ambientIntensity = 0.8, pointIntensity = 1, viewportHeight = 500 } = args;
    return (_jsx("div", { style: { width: '100%', height: viewportHeight }, children: _jsxs(Canvas, { camera: { position: [0, 20, 20], fov: 45 }, children: [_jsx("ambientLight", { intensity: ambientIntensity }), _jsx("pointLight", { position: [10, 20, 10], intensity: pointIntensity }), _jsx("pointLight", { position: [-10, 20, -10], intensity: pointIntensity * 0.5 }), _jsx(Suspense, { fallback: null, children: children }), _jsx(OrbitControls, { autoRotate: autoRotate, autoRotateSpeed: autoRotateSpeed, enableZoom: true, enablePan: true })] }) }));
}
export const Default = {
    args: { autoRotate: true, autoRotateSpeed: 2, ambientIntensity: 0.8, pointIntensity: 1, viewportHeight: 500 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx(GameBoard, {}) }))
};
export const HoverAndClick = {
    args: { autoRotate: false, autoRotateSpeed: 0, ambientIntensity: 1, pointIntensity: 1.2, viewportHeight: 500 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx(GameBoard, {}) }))
};
export const MoveAvatar = {
    args: { autoRotate: false, ambientIntensity: 0.7, pointIntensity: 1, viewportHeight: 500 },
    decorators: [
        (Story, ctx) => {
            useGameStore.setState({ position: 0 });
            let step = 0;
            const interval = setInterval(() => {
                step += 1;
                useGameStore.getState().moveAvatar(1);
                if (step > 10)
                    clearInterval(interval);
            }, 800);
            return _jsx(Story, {});
        }
    ],
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx(GameBoard, {}) }))
};
export const ErrorBoundaryCase = {
    args: { autoRotate: false, ambientIntensity: 0.5, pointIntensity: 0.5, viewportHeight: 400 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx("nonexistent", {}) }))
};
