import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
export default function ARViewerScene() {
    return (_jsx("div", { style: { width: '100%', height: '100%' }, children: _jsxs(Canvas, { camera: { position: [0, 1.5, 3], fov: 55 }, children: [_jsx("ambientLight", { intensity: 0.7 }), _jsx(Suspense, { fallback: null, children: _jsxs("mesh", { children: [_jsx("sphereGeometry", { args: [0.8, 16, 16] }), _jsx("meshStandardMaterial", { color: "#10B981" })] }) })] }) }));
}
