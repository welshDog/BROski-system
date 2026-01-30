import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';
const meta = {
    title: '3D/Avatar',
    component: Avatar,
    argTypes: {
        boardPosition: { control: { type: 'range', min: 0, max: 49, step: 1 } },
        autoRotate: { control: 'boolean' },
        autoRotateSpeed: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
        ambientIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
        viewportHeight: { control: { type: 'number', min: 300, max: 900 } }
    }
};
export default meta;
function CanvasProvider({ children, args }) {
    const { autoRotate = true, autoRotateSpeed = 2, ambientIntensity = 0.8, viewportHeight = 500 } = args;
    return (_jsx("div", { style: { width: '100%', height: viewportHeight }, children: _jsxs(Canvas, { camera: { position: [0, 20, 20], fov: 45 }, children: [_jsx("ambientLight", { intensity: ambientIntensity }), _jsx(Suspense, { fallback: null, children: children }), _jsx(OrbitControls, { autoRotate: autoRotate, autoRotateSpeed: autoRotateSpeed, enableZoom: true, enablePan: true })] }) }));
}
export const Default = {
    args: { boardPosition: 0, autoRotate: true, autoRotateSpeed: 2, ambientIntensity: 0.8, viewportHeight: 500 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx(Avatar, { boardPosition: args.boardPosition }) }))
};
export const Animate = {
    args: { boardPosition: 0, autoRotate: false, ambientIntensity: 1, viewportHeight: 500 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx(Avatar, { boardPosition: args.boardPosition }) }))
};
export const ErrorBoundaryCase = {
    args: { boardPosition: 0, autoRotate: false, ambientIntensity: 0.5, viewportHeight: 400 },
    render: (args) => (_jsx(CanvasProvider, { args: args, children: _jsx("invalid", {}) }))
};
