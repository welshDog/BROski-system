import '@testing-library/jest-dom/vitest';
// Polyfill ResizeObserver used by @react-three/fiber internals
// Minimal no-op implementation for jsdom
class RO {
    observe() { }
    unobserve() { }
    disconnect() { }
}
// @ts-ignore
global.ResizeObserver = RO;
// Silence React warnings from R3F intrinsic elements by mapping them to divs
import { vi } from 'vitest';
vi.mock('react/jsx-runtime', async () => {
    const original = await vi.importActual('react/jsx-runtime');
    const r3fTags = new Set([
        'mesh',
        'group',
        'boxGeometry',
        'sphereGeometry',
        'meshStandardMaterial',
        'meshPhysicalMaterial',
        'ambientLight',
        'pointLight'
    ]);
    return {
        ...original,
        jsx: (type, props, key) => {
            if (typeof type === 'string' && r3fTags.has(type)) {
                const nextProps = { 'data-r3f': type };
                return original.jsx('div', nextProps, key);
            }
            return original.jsx(type, props, key);
        },
        jsxs: (type, props, key) => {
            if (typeof type === 'string' && r3fTags.has(type)) {
                const nextProps = { 'data-r3f': type };
                return original.jsxs('div', nextProps, key);
            }
            return original.jsxs(type, props, key);
        }
    };
});
// Filter noisy warnings from React for test environment
const originalError = console.error;
console.error = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' &&
        (msg.includes('is using incorrect casing') ||
            msg.includes('The tag') ||
            msg.includes('does not recognize the') ||
            msg.includes('A suspended resource finished loading'))) {
        return;
    }
    // @ts-ignore
    return originalError.apply(console, args);
};
