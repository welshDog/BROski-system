import { getCLS, getFID, getLCP, getINP, getTTFB } from 'web-vitals';
import { analytics } from '@/services/analyticsService';
function report(name, value, id) {
    analytics.send('web-vital', { name, value, id, route: location.pathname });
}
export function initVitals() {
    getCLS((m) => report('CLS', m.value, m.id));
    getFID((m) => report('FID', m.value, m.id));
    getLCP((m) => report('LCP', m.value, m.id));
    getINP((m) => report('INP', m.value, m.id));
    getTTFB((m) => report('TTFB', m.value, m.id));
}
