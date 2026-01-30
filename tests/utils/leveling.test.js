import { addCoinsToLeveling, xpNeededFor, MAX_LEVEL } from '@/utils/leveling';
import { expect, test } from 'vitest';
test('exact level boundaries: 0→1 requires 100 XP', () => {
    const s = { level: 1, experience: 99 };
    const r = addCoinsToLeveling(s, 25); // +1 xp
    expect(r.level).toBe(2);
    expect(r.experience).toBe(0);
});
test('49→50 boundary', () => {
    const s = { level: 49, experience: xpNeededFor(49) - 1 };
    const r = addCoinsToLeveling(s, 25);
    expect(r.level).toBe(50);
    expect(r.experience).toBe(0);
});
test('99→100 boundary', () => {
    const s = { level: 99, experience: xpNeededFor(99) - 1 };
    const r = addCoinsToLeveling(s, 25);
    expect(r.level).toBe(100);
    expect(r.experience).toBe(0);
});
test('large coin burst (1000 coins)', () => {
    const s = { level: 1, experience: 0 };
    const r = addCoinsToLeveling(s, 1000); // 40 XP
    expect(r.level).toBe(1 + Math.floor(40 / xpNeededFor(1))); // still level 1, 100 xp needed
    expect(r.experience).toBe(40);
});
test('max level cap enforcement', () => {
    const s = { level: MAX_LEVEL - 1, experience: xpNeededFor(MAX_LEVEL - 1) };
    const r = addCoinsToLeveling(s, 10000);
    expect(r.level).toBe(MAX_LEVEL);
});
test('overflow protection at MAX_LEVEL', () => {
    const s = { level: MAX_LEVEL, experience: 0 };
    const r = addCoinsToLeveling(s, 10000);
    expect(r.level).toBe(MAX_LEVEL);
});
