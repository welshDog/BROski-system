import React from 'react';
const manual = {
    '/product-3d': () => import('@components/3D/GameBoard'),
    '/configurator': () => import('@components/3D/ConfiguratorScene'),
    '/ar-viewer': () => import('@components/3D/ARViewerScene')
};
const auto = import.meta.glob('../components/3D/*Scene.{tsx,ts,jsx,js}');
function toRoute(p) {
    const base = p.split('/').pop().replace(/\.[^.]+$/, '');
    const kebab = base
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/Scene$/i, '')
        .toLowerCase();
    return `/${kebab}`;
}
const autoMap = {};
for (const [path, loader] of Object.entries(auto)) {
    const route = toRoute(path);
    autoMap[route] = loader;
}
export function getScene(route) {
    const loader = manual[route] || autoMap[route];
    if (!loader)
        return null;
    return React.lazy(loader);
}
export async function prefetchScene(route) {
    const loader = manual[route] || autoMap[route];
    if (loader)
        await loader();
}
