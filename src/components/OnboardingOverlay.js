import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function OnboardingOverlay() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const key = 'broski_onboard_seen';
        const seen = localStorage.getItem(key);
        if (!seen) {
            setVisible(true);
            localStorage.setItem(key, '1');
        }
    }, []);
    if (!visible)
        return null;
    return (_jsx("div", { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 10 }, children: _jsxs("div", { style: { background: '#111', color: '#eee', padding: 16, borderRadius: 8, maxWidth: 420, textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: 18, marginBottom: 8 }, children: "Watch your avatar move!" }), _jsx("div", { style: { fontSize: 14, opacity: 0.8 }, children: "Approve a task to see particles, sound, and smooth camera follow." }), _jsx("button", { onClick: () => setVisible(false), style: { marginTop: 12 }, children: "Got it" })] }) }));
}
