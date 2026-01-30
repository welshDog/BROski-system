import React, { Suspense, useEffect } from 'react';
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
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <nav style={{ padding: 12, display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Parent Login</Link>
        <Link to="/kid-login">Kid Login</Link>
        <Link to="/magic-link">Magic Link</Link>
        <Link to="/product-3d">Product 3D</Link>
        <Link to="/configurator">Configurator</Link>
        <Link to="/ar-viewer">AR Viewer</Link>
        <button onClick={() => setHighMaterialEnabled(!highMaterialEnabled)} aria-pressed={highMaterialEnabled} aria-label={highMaterialEnabled ? 'Disable high material' : 'Enable high material'}>{highMaterialEnabled ? 'Disable High Material' : 'Enable High Material'}</button>
        <button onClick={() => (animationsPaused ? stopPerfObserver() : startPerfObserver())} aria-pressed={animationsPaused} aria-label={animationsPaused ? 'Resume animations' : 'Monitor and auto-pause animations'}>{animationsPaused ? 'Resume Animations' : 'Monitor & Auto-Pause'}</button>
        <PerfIndicator />
        <CoinCounter />
        <FPSMeter />
      </nav>
      <Routes>
        <Route path="/" element={<div style={{ padding: 16 }}>Welcome. Choose a 3D route.</div>} />
        <Route path="/login" element={<ParentLogin />} />
        <Route path="/magic-link" element={<MagicLinkLogin />} />
        <Route path="/kid-login" element={<KidLogin />} />
        <Route path="/kid" element={<ProtectedRoute role="kid"><TaskSubmissionForm /></ProtectedRoute>} />
        <Route path="/product-3d" element={<Suspense fallback={<SkeletonBoard />}>{Product3D ? <Product3D /> : null}</Suspense>} />
        <Route path="/configurator" element={<Suspense fallback={<SkeletonConfigurator />}>{Configurator ? <Configurator /> : null}</Suspense>} />
        <Route path="/ar-viewer" element={<Suspense fallback={<SkeletonAR />}>{ARViewer ? <ARViewer /> : null}</Suspense>} />
      </Routes>
    </div>
  );
}
