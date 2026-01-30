import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { attachLinkHoverPrefetch, attachLinkIntentPrefetch, prefetchRoutes } from './config/prefetch';
const rootEl = document.getElementById('root');
if (!rootEl)
    throw new Error('Root element not found');
createRoot(rootEl).render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
prefetchRoutes();
attachLinkHoverPrefetch('nav a');
attachLinkIntentPrefetch('nav a');
if (import.meta.env.PROD) {
    import('./monitor/vitals').then((m) => m.initVitals());
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => { }));
    }
}
