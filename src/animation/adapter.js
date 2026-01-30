import { usePerfStore } from '@/stores/perfStore';
export const easingPresets = {
    calm: 'power2.inOut',
    snappy: 'power3.out',
    linear: 'none'
};
export async function animateTo(target, to, duration = 2, ease = 'calm') {
    const paused = usePerfStore.getState().animationsPaused;
    if (paused) {
        if (typeof to.x === 'number')
            target.x = to.x;
        if (typeof to.y === 'number')
            target.y = to.y;
        if (typeof to.z === 'number')
            target.z = to.z;
        return;
    }
    try {
        const mod = await import('gsap');
        const { default: gsap } = mod;
        gsap.to(target, { ...to, duration, ease: easingPresets[ease] });
    }
    catch {
        const start = { x: target.x, y: target.y, z: target.z };
        const end = { x: to.x ?? target.x, y: to.y ?? target.y, z: to.z ?? target.z };
        const t0 = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - t0) / (duration * 1000));
            target.x = start.x + (end.x - start.x) * t;
            target.y = start.y + (end.y - start.y) * t;
            target.z = start.z + (end.z - start.z) * t;
            if (t < 1)
                requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
}
