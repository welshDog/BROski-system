import React from 'react';

export interface MaterialProps {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

type Loader = () => Promise<{ default: React.ComponentType<MaterialProps> }>;

const plugins: Record<string, Loader> = {
  physical: () => import('./PhysicalMaterial')
};

export function getMaterialPlugin(id: string): React.LazyExoticComponent<React.ComponentType<MaterialProps>> | null {
  const loader = plugins[id];
  if (!loader) return null;
  return React.lazy(loader);
}
