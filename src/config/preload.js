export function preloadAssetsForRoute(route) {
    const assets = [];
    if (route.endsWith('/product-3d'))
        assets.push('/icons/3d.svg', '/config/scene.json');
    if (route.endsWith('/configurator'))
        assets.push('/icons/gear.svg', '/config/configurator.json');
    if (route.endsWith('/ar-viewer'))
        assets.push('/icons/ar.svg', '/config/ar.json');
    assets.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}
