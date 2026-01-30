import React, { Suspense, useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
const OrbitControls = React.lazy(() => import('@react-three/drei').then((m) => ({ default: m.OrbitControls })));
import BoardSpace from './BoardSpace';
import Avatar from './Avatar';
import { useGameStore } from '@/stores/gameStore';
import { usePerfStore } from '@/stores/perfStore';
import ExampleModel from './ExampleModel';
import CelebrationParticles from './Particles';
import CameraFollow from './CameraFollow';
import SoundEffects from './SoundEffects';
import OnboardingOverlay from '@/components/OnboardingOverlay';
import ErrorBoundary3D from '@/components/ErrorBoundary3D';

export default function GameBoard() {
  const position = useGameStore((s) => s.position);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const enableControls = useCallback(() => setControlsEnabled(true), []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationsPaused = usePerfStore((s) => s.animationsPaused);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <OnboardingOverlay />
      <Canvas camera={{ position: [0, 20, 20], fov: 45 }} onPointerDown={enableControls}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 20, 10]} intensity={1} />
        <pointLight position={[-10, 20, -10]} intensity={0.5} />
        <CameraFollow />
        <SoundEffects />

        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2;
          const x = Math.cos(angle) * 12;
          const z = Math.sin(angle) * 12;

          let spaceType: 'normal' | 'bonus' | 'start' | 'end' = 'normal';
          if (i === 0) spaceType = 'start';
          if (i === 49) spaceType = 'end';
          if (i % 10 === 0 && i !== 0) spaceType = 'bonus';

          return <BoardSpace key={i} position={[x, 0, z]} index={i} type={spaceType} />;
        })}

        <ErrorBoundary3D>
          {!animationsPaused && <Avatar boardPosition={position} />}
          <CelebrationParticles />
          <Suspense fallback={<meshStandardMaterial color="#222" />}>
            <ExampleModel />
          </Suspense>
        </ErrorBoundary3D>

        {controlsEnabled && (
          <Suspense fallback={null}>
            {(() => {
              const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
              return (
                <OrbitControls
                  autoRotate={!isMobile}
                  autoRotateSpeed={isMobile ? 0.6 : 1.2}
                  enableZoom={!isMobile}
                  enablePan={!isMobile}
                  minDistance={isMobile ? 8 : 5}
                  maxDistance={isMobile ? 14 : 28}
                />
              );
            })()}
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}
