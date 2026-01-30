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
// BroadcastChannel polyfill for jsdom
class BC {
    constructor(name) {
        this.listeners = new Set();
        this.name = name;
    }
    postMessage(data) {
        const evt = { data };
        this.listeners.forEach((fn) => fn(evt));
    }
    addEventListener(_type, fn) { this.listeners.add(fn); }
    removeEventListener(_type, fn) { this.listeners.delete(fn); }
    close() { this.listeners.clear(); }
}
// @ts-ignore
global.BroadcastChannel = BC;
// AudioContext stubs for three.js AudioListener
// @ts-ignore
global.AudioContext = function () { };
// @ts-ignore
global.webkitAudioContext = function () { };
// Silence React warnings from R3F intrinsic elements by mapping them to divs
import { vi } from 'vitest';
// Firebase module mocks for tests
vi.mock('firebase/app', () => ({
    initializeApp: () => ({})
}));
vi.mock('firebase/firestore', async () => {
    return {
        getFirestore: () => ({}),
        enableIndexedDbPersistence: () => Promise.resolve(),
        doc: (_db, _col, _id) => ({ _path: `${_col}/${_id}` }),
        getDoc: async (_ref) => ({ data: () => ({ role: 'parent', familyId: 'fam-1' }) })
    };
});
vi.mock('firebase/auth', () => ({
    getAuth: () => ({}),
    signInWithEmailAndPassword: async (_auth, _email, _password) => ({ user: { uid: 'test-user' } })
}));
vi.mock('firebase/storage', () => ({
    getStorage: () => ({})
}));
// Stub project-level firebase adapter to avoid named export resolution issues in JS builds
vi.mock('@/services/firebase/db', () => ({
    db: {},
    storage: {},
    auth: {}
}));
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
