import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { computeRadius, worldPosition } from '@/utils/board';
import { useGameStore } from '@/stores/gameStore';

export default function CameraFollow() {
  const { camera, viewport, gl } = useThree();
  const position = useGameStore((s) => s.position);
  const radius = computeRadius(viewport.width, gl.getPixelRatio());
  useEffect(() => {
    const target = worldPosition(position, radius);
    const start = camera.position.clone();
    const end = { x: target.x * 0.6, y: 15, z: target.z * 0.6 };
    const t0 = performance.now();
    const duration = 500;
    let raf = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / duration);
      camera.position.set(
        start.x + (end.x - start.x) * t,
        start.y + (end.y - start.y) * t,
        start.z + (end.z - start.z) * t
      );
      camera.lookAt(0, 0, 0);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [position, camera, radius]);
  return null;
}
