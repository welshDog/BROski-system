import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { onCelebration } from '@/services/events';

export default function CelebrationParticles() {
  const [active, setActive] = useState(false);
  const [ttl, setTtl] = useState(0);
  const pointsRef = useRef<any>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 2;
      arr[i + 1] = Math.random() * 2;
      arr[i + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);

  useEffect(() => {
    const off = onCelebration(() => {
      setActive(true);
      setTtl(60);
    });
    return off;
  }, []);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      if (!pointsRef.current) return;
      const geom = pointsRef.current.geometry as THREE.BufferGeometry;
      const a = geom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < a.count; i++) {
        a.array[i * 3 + 1] += 0.02; // rise
      }
      a.needsUpdate = true;
      setTtl((t) => Math.max(0, t - 1));
      if (ttl > 0) raf = requestAnimationFrame(step);
      else setActive(false);
    };
    if (active) raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, ttl]);

  if (!active) return null;

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color="#FBBF24" size={0.08} sizeAttenuation depthWrite={false} />
    </Points>
  );
}
