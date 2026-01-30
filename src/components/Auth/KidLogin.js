import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/services/firebase/db';
import { analytics } from '@/services/analyticsService';
export default function KidLogin() {
    const [kids, setKids] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { collection, getDocs } = await import('firebase/firestore');
                const snap = await getDocs(collection(db, 'users'));
                const next = snap.docs
                    .map((d) => ({ id: d.id, profileName: d.data().profileName }))
                    .filter((u) => u.role !== 'parent');
                if (mounted)
                    setKids(next);
            }
            catch { }
        })();
        return () => {
            mounted = false;
        };
    }, []);
    const handleKidSelect = (kidId) => {
        localStorage.setItem('kidId', kidId);
        analytics.send('auth_success', { method: 'kid-select', role: 'kid', kidId });
        navigate('/kid');
    };
    return (_jsxs("div", { style: { padding: 16 }, children: [_jsx("h2", { children: "Choose Your Avatar" }), _jsx("div", { style: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }, children: kids.map((k) => (_jsx("button", { onClick: () => handleKidSelect(k.id), style: { display: 'grid', gap: 8, padding: 12 }, "aria-label": `Login as ${k.profileName}`, children: _jsx("span", { children: k.profileName }) }, k.id))) })] }));
}
