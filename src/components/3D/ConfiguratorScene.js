import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
export default function ConfiguratorScene() {
    return (_jsx("div", { style: { width: '100%', height: '100%' }, children: _jsxs(Canvas, { camera: { position: [0, 2, 4], fov: 50 }, children: [_jsx("ambientLight", { intensity: 0.6 }), _jsx(Suspense, { fallback: null, children: _jsxs("mesh", { children: [_jsx("boxGeometry", { args: [1, 1, 1] }), _jsx("meshStandardMaterial", { color: "#4F46E5" })] }) })] }) }));
}
