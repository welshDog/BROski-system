import { usePerfStore } from '@/stores/perfStore';
import { notificationService } from '@/services/notificationService';
const defaultConfig = {
    maxRttMs: 500,
    maxCpuBlockingMsPer10s: 800
};
let longTaskBlocking = 0;
let intervalId = null;
let po = null;
let lastPaused = false;
export function startPerfObserver(cfg = defaultConfig) {
    const { setAnimationsPaused } = usePerfStore.getState();
    longTaskBlocking = 0;
    lastPaused = usePerfStore.getState().animationsPaused;
    try {
        po = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const e of entries) {
                if (e.duration)
                    longTaskBlocking += e.duration;
            }
        });
        po.observe({ entryTypes: ['longtask'] });
    }
    catch { }
    const interval = cfg.tickIntervalMs ?? 10000;
    intervalId = setInterval(() => {
        evaluateNow(cfg);
    }, interval);
}
export function stopPerfObserver() {
    if (intervalId)
        clearInterval(intervalId);
    intervalId = null;
    if (po) {
        try {
            po.disconnect();
        }
        catch { }
        po = null;
    }
}
export function evaluateNow(cfg = defaultConfig) {
    const { setAnimationsPaused } = usePerfStore.getState();
    const conn = navigator.connection;
    const rtt = conn && typeof conn.rtt === 'number' ? conn.rtt : 0;
    const pauseByNetwork = rtt && rtt > cfg.maxRttMs;
    const pauseByCpu = longTaskBlocking > cfg.maxCpuBlockingMsPer10s;
    const shouldPause = pauseByNetwork || pauseByCpu;
    setAnimationsPaused(shouldPause);
    if (shouldPause && !lastPaused) {
        notificationService.send('system', {
            type: 'performance',
            message: 'Animations paused due to performance constraints',
            details: { rtt, longTaskBlocking }
        });
    }
    if (!shouldPause && lastPaused) {
        notificationService.send('system', {
            type: 'performance',
            message: 'Animations resumed',
            details: { rtt, longTaskBlocking }
        });
    }
    lastPaused = shouldPause;
    longTaskBlocking = 0;
}
