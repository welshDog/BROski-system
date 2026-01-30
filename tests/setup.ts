import '@testing-library/jest-dom/vitest';
// Polyfill ResizeObserver used by @react-three/fiber internals
// Minimal no-op implementation for jsdom
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore
global.ResizeObserver = RO as any;

// BroadcastChannel polyfill for jsdom
class BC {
  name: string;
  listeners: Set<(e: MessageEvent) => void> = new Set();
  constructor(name: string) { this.name = name; }
  postMessage(data: unknown) {
    const evt = { data } as MessageEvent;
    this.listeners.forEach((fn) => fn(evt));
  }
  addEventListener(_type: 'message', fn: (e: MessageEvent) => void) { this.listeners.add(fn); }
  removeEventListener(_type: 'message', fn: (e: MessageEvent) => void) { this.listeners.delete(fn); }
  close() { this.listeners.clear(); }
}
// @ts-ignore
global.BroadcastChannel = BC as any;

// AudioContext stubs for three.js AudioListener
// @ts-ignore
global.AudioContext = function () {} as any;
// @ts-ignore
global.webkitAudioContext = function () {} as any;

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
    doc: (_db: unknown, _col: string, _id: string) => ({ _path: `${_col}/${_id}` }),
    getDoc: async (_ref: unknown) => ({ data: () => ({ role: 'parent', familyId: 'fam-1' }) })
  } as any;
});

vi.mock('firebase/auth', () => ({
  getAuth: () => ({}),
  signInWithEmailAndPassword: async (_auth: unknown, _email: string, _password: string) => ({ user: { uid: 'test-user' } })
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
  const original = await vi.importActual<any>('react/jsx-runtime');
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
    jsx: (type: any, props: any, key: any) => {
      if (typeof type === 'string' && r3fTags.has(type)) {
        const nextProps = { 'data-r3f': type };
        return (original as any).jsx('div', nextProps, key);
      }
      return (original as any).jsx(type, props, key);
    },
    jsxs: (type: any, props: any, key: any) => {
      if (typeof type === 'string' && r3fTags.has(type)) {
        const nextProps = { 'data-r3f': type };
        return (original as any).jsxs('div', nextProps, key);
      }
      return (original as any).jsxs(type, props, key);
    }
  };
});

// Filter noisy warnings from React for test environment
const originalError = console.error;
console.error = (...args: any[]) => {
  const msg = args[0];
  if (
    typeof msg === 'string' &&
    (msg.includes('is using incorrect casing') ||
      msg.includes('The tag') ||
      msg.includes('does not recognize the') ||
      msg.includes('A suspended resource finished loading'))
  ) {
    return;
  }
  // @ts-ignore
  return originalError.apply(console, args);
};
