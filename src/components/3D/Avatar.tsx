import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { computeRadius, worldPosition } from '@/utils/board';
import { animateTo } from '@/animation/adapter';

interface Props {
  boardPosition: number;
}

export default function Avatar({ boardPosition }: Props) {
  const groupRef = useRef<any>(null);
  const { viewport, gl } = useThree();
  const radius = computeRadius(viewport.width, gl.getPixelRatio());

  useEffect(() => {
    if (groupRef.current) {
      const initial = worldPosition(boardPosition, radius);
      const pos: any = (groupRef.current as any).position;
      if (pos && typeof pos.set === 'function') {
        pos.set(initial.x, 1, initial.z);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport, gl]);

  useEffect(() => {
    if (groupRef.current) {
      const newPos = worldPosition(boardPosition, radius);
      const pos: any = (groupRef.current as any).position;
      if (pos) {
        animateTo(pos, { x: newPos.x, z: newPos.z }, 1.2, 'calm');
        const rot: any = (groupRef.current as any).rotation;
        const angle = (boardPosition / 50) * Math.PI * 2 + Math.PI / 2;
        animateTo(rot, { y: angle }, 1.0, 'snappy');
      }
    }
  }, [boardPosition, radius]);

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      <mesh position={[0.2, 0.4, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.2, 0.4, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}
