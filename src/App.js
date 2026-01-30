import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getScene } from '@/scenes/registry';
import { usePerfStore } from '@/stores/perfStore';
import { startPerfObserver, stopPerfObserver } from '@/perf/observer';
import { SkeletonBoard, SkeletonConfigurator, SkeletonAR } from '@components/3D/Skeletons';
import PerfIndicator from '@/components/PerfIndicator';
import CoinCounter from '@/components/UI/CoinCounter';
import ParentLogin from '@/components/Auth/ParentLogin';
import KidLogin from '@/components/Auth/KidLogin';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import TaskSubmissionForm from '@/components/Kid/TaskSubmissionForm';
import MagicLinkLogin from '@/components/Auth/MagicLinkLogin';
import FPSMeter from '@/components/FPSMeter';
import { onAvatarUpdate } from '@/services/events';
import { useGameStore } from '@/stores/gameStore';
export default function App() {
    const { animationsPaused, highMaterialEnabled, setAnimationsPaused, setHighMaterialEnabled } = usePerfStore();
    const addCoins = useGameStore((s) => s.addCoins);
    const moveAvatar = useGameStore((s) => s.moveAvatar);
    const Product3D = getScene('/product-3d');
    const Configurator = getScene('/configurator');
    const ARViewer = getScene('/ar-viewer');
    useEffect(() => {
        const off = onAvatarUpdate((p) => {
            addCoins(p.coinDelta);
            moveAvatar(p.positionDelta);
        });
        return off;
    }, [addCoins, moveAvatar]);
    return (_jsxs("div", { style: { width: '100vw', height: '100vh' }, children: [_jsxs("nav", { style: { padding: 12, display: 'flex', gap: 12 }, children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/login", children: "Parent Login" }), _jsx(Link, { to: "/kid-login", children: "Kid Login" }), _jsx(Link, { to: "/magic-link", children: "Magic Link" }), _jsx(Link, { to: "/product-3d", children: "Product 3D" }), _jsx(Link, { to: "/configurator", children: "Configurator" }), _jsx(Link, { to: "/ar-viewer", children: "AR Viewer" }), _jsx("button", { onClick: () => setHighMaterialEnabled(!highMaterialEnabled), "aria-pressed": highMaterialEnabled, "aria-label": highMaterialEnabled ? 'Disable high material' : 'Enable high material', children: highMaterialEnabled ? 'Disable High Material' : 'Enable High Material' }), _jsx("button", { onClick: () => (animationsPaused ? stopPerfObserver() : startPerfObserver()), "aria-pressed": animationsPaused, "aria-label": animationsPaused ? 'Resume animations' : 'Monitor and auto-pause animations', children: animationsPaused ? 'Resume Animations' : 'Monitor & Auto-Pause' }), _jsx(PerfIndicator, {}), _jsx(CoinCounter, {}), _jsx(FPSMeter, {})] }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { style: { padding: 16 }, children: "Welcome. Choose a 3D route." }) }), _jsx(Route, { path: "/login", element: _jsx(ParentLogin, {}) }), _jsx(Route, { path: "/magic-link", element: _jsx(MagicLinkLogin, {}) }), _jsx(Route, { path: "/kid-login", element: _jsx(KidLogin, {}) }), _jsx(Route, { path: "/kid", element: _jsx(ProtectedRoute, { role: "kid", children: _jsx(TaskSubmissionForm, {}) }) }), _jsx(Route, { path: "/product-3d", element: _jsx(Suspense, { fallback: _jsx(SkeletonBoard, {}), children: Product3D ? _jsx(Product3D, {}) : null }) }), _jsx(Route, { path: "/configurator", element: _jsx(Suspense, { fallback: _jsx(SkeletonConfigurator, {}), children: Configurator ? _jsx(Configurator, {}) : null }) }), _jsx(Route, { path: "/ar-viewer", element: _jsx(Suspense, { fallback: _jsx(SkeletonAR, {}), children: ARViewer ? _jsx(ARViewer, {}) : null }) })] })] }));
}
