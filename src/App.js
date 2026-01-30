import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getScene } from '@/scenes/registry';
import { usePerfStore } from '@/stores/perfStore';
import { startPerfObserver, stopPerfObserver } from '@/perf/observer';
import { SkeletonBoard, SkeletonConfigurator, SkeletonAR } from '@components/3D/Skeletons';
import PerfIndicator from '@/components/PerfIndicator';
export default function App() {
    const { animationsPaused, highMaterialEnabled, setAnimationsPaused, setHighMaterialEnabled } = usePerfStore();
    const Product3D = getScene('/product-3d');
    const Configurator = getScene('/configurator');
    const ARViewer = getScene('/ar-viewer');
    return (_jsxs("div", { style: { width: '100vw', height: '100vh' }, children: [_jsxs("nav", { style: { padding: 12, display: 'flex', gap: 12 }, children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/product-3d", children: "Product 3D" }), _jsx(Link, { to: "/configurator", children: "Configurator" }), _jsx(Link, { to: "/ar-viewer", children: "AR Viewer" }), _jsx("button", { onClick: () => setHighMaterialEnabled(!highMaterialEnabled), "aria-pressed": highMaterialEnabled, "aria-label": highMaterialEnabled ? 'Disable high material' : 'Enable high material', children: highMaterialEnabled ? 'Disable High Material' : 'Enable High Material' }), _jsx("button", { onClick: () => (animationsPaused ? stopPerfObserver() : startPerfObserver()), "aria-pressed": animationsPaused, "aria-label": animationsPaused ? 'Resume animations' : 'Monitor and auto-pause animations', children: animationsPaused ? 'Resume Animations' : 'Monitor & Auto-Pause' }), _jsx(PerfIndicator, {})] }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { style: { padding: 16 }, children: "Welcome. Choose a 3D route." }) }), _jsx(Route, { path: "/product-3d", element: _jsx(Suspense, { fallback: _jsx(SkeletonBoard, {}), children: Product3D ? _jsx(Product3D, {}) : null }) }), _jsx(Route, { path: "/configurator", element: _jsx(Suspense, { fallback: _jsx(SkeletonConfigurator, {}), children: Configurator ? _jsx(Configurator, {}) : null }) }), _jsx(Route, { path: "/ar-viewer", element: _jsx(Suspense, { fallback: _jsx(SkeletonAR, {}), children: ARViewer ? _jsx(ARViewer, {}) : null }) })] })] }));
}
