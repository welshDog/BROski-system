import { computeRadius, worldPosition } from '@/utils/board';
test('computeRadius scales with viewport and pixel ratio', () => {
    const r1 = computeRadius(10, 1);
    const r2 = computeRadius(10, 2);
    expect(r2).toBeCloseTo(r1 * 2);
    const r3 = computeRadius(100, 1);
    expect(r3).toBeGreaterThan(r1);
});
test('worldPosition maps positions around circle', () => {
    const radius = 10;
    const p0 = worldPosition(0, radius);
    const p12 = worldPosition(25, radius);
    expect(p0.x).toBeCloseTo(radius);
    expect(p0.z).toBeCloseTo(0);
    expect(p12.x).toBeCloseTo(-radius, 1);
});
