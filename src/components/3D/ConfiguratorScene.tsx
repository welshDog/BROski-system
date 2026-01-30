import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

export default function ConfiguratorScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4F46E5" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
