import { jsx as _jsx } from "react/jsx-runtime";
export function SkeletonBoard() {
    return (_jsx("div", { style: { width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }, role: "status", "aria-live": "polite", children: _jsx("div", { style: { width: 120, height: 120, borderRadius: 8, background: '#222' } }) }));
}
export function SkeletonConfigurator() {
    return (_jsx("div", { style: { width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }, role: "status", "aria-live": "polite", children: _jsx("div", { style: { width: 160, height: 24, borderRadius: 6, background: '#222' } }) }));
}
export function SkeletonAR() {
    return (_jsx("div", { style: { width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }, role: "status", "aria-live": "polite", children: _jsx("div", { style: { width: 90, height: 90, borderRadius: '50%', background: '#222' } }) }));
}
