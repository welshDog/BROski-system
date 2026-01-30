import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

export default function ARViewerScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#10B981" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
