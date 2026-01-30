import React from 'react';

type Loader = () => Promise<{ default: React.ComponentType<any> }>;

const manual: Record<string, Loader> = {
  '/product-3d': () => import('@components/3D/GameBoard'),
  '/configurator': () => import('@components/3D/ConfiguratorScene'),
  '/ar-viewer': () => import('@components/3D/ARViewerScene')
};

const auto = import.meta.glob('../components/3D/*Scene.{tsx,ts,jsx,js}');

function toRoute(p: string): string {
  const base = p.split('/').pop()!.replace(/\.[^.]+$/, '');
  const kebab = base
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/Scene$/i, '')
    .toLowerCase();
  return `/${kebab}`;
}

const autoMap: Record<string, Loader> = {};
for (const [path, loader] of Object.entries(auto)) {
  const route = toRoute(path);
  autoMap[route] = loader as Loader;
}

export function getScene(route: string): React.LazyExoticComponent<React.ComponentType<any>> | null {
  const loader = manual[route] || autoMap[route];
  if (!loader) return null;
  return React.lazy(loader);
}

export async function prefetchScene(route: string): Promise<void> {
  const loader = manual[route] || autoMap[route];
  if (loader) await loader();
}
