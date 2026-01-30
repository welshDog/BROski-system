const defaultConfig = {
    enabled: true,
    variant: 'B',
    networkMinDownKbps: 1500,
    idleTimeoutMs: 1500
};
function effectiveDownlinkKbps() {
    const c = navigator.connection;
    if (c && typeof c.downlink === 'number')
        return c.downlink * 1024;
    return 500; // conservative default
}
export function shouldPrefetch(cfg = defaultConfig) {
    if (!cfg.enabled)
        return false;
    const ab = (typeof localStorage !== 'undefined' && localStorage.getItem('ab_prefetch_variant')) || cfg.variant;
    if (ab !== 'B')
        return false;
    return effectiveDownlinkKbps() >= cfg.networkMinDownKbps;
}
export function prefetchRoutes() {
    if (!shouldPrefetch())
        return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, defaultConfig.idleTimeoutMs));
    idle(async () => {
        await Promise.allSettled([
            import('../components/3D/GameBoard'),
            import('../components/3D/ConfiguratorScene'),
            import('../components/3D/ARViewerScene')
        ]);
    });
}
export function attachLinkHoverPrefetch(selector = 'a[href]') {
    if (!shouldPrefetch())
        return;
    document.querySelectorAll(selector).forEach((a) => {
        let timer = null;
        const dwell = 500;
        const onEnter = () => {
            timer = setTimeout(() => {
                const href = a.getAttribute('href') || '';
                if (href.endsWith('/product-3d'))
                    import('../components/3D/GameBoard');
                if (href.endsWith('/configurator'))
                    import('../components/3D/ConfiguratorScene');
                if (href.endsWith('/ar-viewer'))
                    import('../components/3D/ARViewerScene');
                import('./preload').then((m) => m.preloadAssetsForRoute(href));
            }, dwell);
        };
        const onLeave = () => {
            if (timer)
                clearTimeout(timer);
            timer = null;
        };
        a.addEventListener('mouseenter', onEnter);
        a.addEventListener('mouseleave', onLeave);
    });
}
import { analytics } from '@/services/analyticsService';
export function attachLinkIntentPrefetch(selector = 'a[href]') {
    if (!shouldPrefetch())
        return;
    document.querySelectorAll(selector).forEach((a) => {
        let hoverTimer = null;
        const dwell = 500;
        const href = a.getAttribute('href') || '';
        const doPrefetch = (tier) => {
            if (href.endsWith('/product-3d'))
                import('../components/3D/GameBoard');
            if (href.endsWith('/configurator'))
                import('../components/3D/ConfiguratorScene');
            if (href.endsWith('/ar-viewer'))
                import('../components/3D/ARViewerScene');
            import('./preload').then((m) => m.preloadAssetsForRoute(href));
            analytics.send('prefetch', { tier, href });
        };
        const onEnter = () => {
            hoverTimer = setTimeout(() => doPrefetch('hover'), dwell);
        };
        const onLeave = () => {
            if (hoverTimer)
                clearTimeout(hoverTimer);
            hoverTimer = null;
        };
        const onFocus = () => doPrefetch('focus');
        a.addEventListener('mouseenter', onEnter);
        a.addEventListener('mouseleave', onLeave);
        a.addEventListener('focus', onFocus);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting)
                    doPrefetch('proximity');
            });
        }, { rootMargin: '250px' });
        io.observe(a);
    });
}
