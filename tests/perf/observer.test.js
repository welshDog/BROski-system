import { expect, test } from 'vitest';
import { startPerfObserver, stopPerfObserver } from '@/perf/observer';
import { usePerfStore } from '@/stores/perfStore';
test('pauses animations when rtt exceeds threshold', async () => {
    navigator.connection = { rtt: 600 };
    startPerfObserver({ maxRttMs: 500, maxCpuBlockingMsPer10s: 1000, tickIntervalMs: 10 });
    await new Promise((r) => setTimeout(r, 120));
    stopPerfObserver();
    expect(usePerfStore.getState().animationsPaused).toBe(true);
});
test('resets pause when rtt is good', async () => {
    navigator.connection = { rtt: 100 };
    startPerfObserver({ maxRttMs: 500, maxCpuBlockingMsPer10s: 1000, tickIntervalMs: 10 });
    await new Promise((r) => setTimeout(r, 120));
    stopPerfObserver();
    expect(usePerfStore.getState().animationsPaused).toBe(false);
});
