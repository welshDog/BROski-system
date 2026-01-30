import React from 'react';

interface Props {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export default function PhysicalMaterial({ color, emissive = '#000', emissiveIntensity = 0 }: Props) {
  return (
    <meshPhysicalMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} roughness={0.4} clearcoat={0.3} />
  );
}
