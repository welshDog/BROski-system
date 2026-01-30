import React, { Suspense, useRef, useState } from 'react';
import { Mesh } from 'three';
import { getMaterialPlugin } from './materials/registry';
import { usePerfStore } from '@/stores/perfStore';

interface Props {
  position: [number, number, number];
  index: number;
  type?: 'normal' | 'bonus' | 'start' | 'end';
}

export default function BoardSpace({ position, index, type = 'normal' }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const highMaterialEnabled = usePerfStore((s) => s.highMaterialEnabled);

  const colors: Record<string, string> = {
    normal: '#4F46E5',
    bonus: '#EF4444',
    start: '#22C55E',
    end: '#FBBF24'
  };

  const scale = hovered ? 1.2 : 1;

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={scale}
    >
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      {highMaterialEnabled ? (
        <Suspense fallback={<meshStandardMaterial color={colors[type]} emissive={hovered ? colors[type] : '#000'} emissiveIntensity={hovered ? 0.5 : 0} />}>
          {(() => {
            const Plugin = getMaterialPlugin('physical');
            return Plugin ? (
              <Plugin color={colors[type]} emissive={hovered ? colors[type] : '#000'} emissiveIntensity={hovered ? 0.5 : 0} />
            ) : (
              <meshStandardMaterial color={colors[type]} emissive={hovered ? colors[type] : '#000'} emissiveIntensity={hovered ? 0.5 : 0} />
            );
          })()}
        </Suspense>
      ) : (
        <meshStandardMaterial color={colors[type]} emissive={hovered ? colors[type] : '#000'} emissiveIntensity={hovered ? 0.5 : 0} />
      )}
      <meshStandardMaterial attach="material-1" color="#999" />
    </mesh>
  );
}
