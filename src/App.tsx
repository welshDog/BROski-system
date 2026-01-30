import React, { Suspense } from 'react';
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
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <nav style={{ padding: 12, display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/product-3d">Product 3D</Link>
        <Link to="/configurator">Configurator</Link>
        <Link to="/ar-viewer">AR Viewer</Link>
        <button onClick={() => setHighMaterialEnabled(!highMaterialEnabled)} aria-pressed={highMaterialEnabled} aria-label={highMaterialEnabled ? 'Disable high material' : 'Enable high material'}>{highMaterialEnabled ? 'Disable High Material' : 'Enable High Material'}</button>
        <button onClick={() => (animationsPaused ? stopPerfObserver() : startPerfObserver())} aria-pressed={animationsPaused} aria-label={animationsPaused ? 'Resume animations' : 'Monitor and auto-pause animations'}>{animationsPaused ? 'Resume Animations' : 'Monitor & Auto-Pause'}</button>
        <PerfIndicator />
      </nav>
      <Routes>
        <Route path="/" element={<div style={{ padding: 16 }}>Welcome. Choose a 3D route.</div>} />
        <Route path="/product-3d" element={<Suspense fallback={<SkeletonBoard />}>{Product3D ? <Product3D /> : null}</Suspense>} />
        <Route path="/configurator" element={<Suspense fallback={<SkeletonConfigurator />}>{Configurator ? <Configurator /> : null}</Suspense>} />
        <Route path="/ar-viewer" element={<Suspense fallback={<SkeletonAR />}>{ARViewer ? <ARViewer /> : null}</Suspense>} />
      </Routes>
    </div>
  );
}
