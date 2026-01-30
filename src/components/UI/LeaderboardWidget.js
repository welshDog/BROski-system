import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase/db';
import { useAuth } from '@/hooks/useAuth';
export default function LeaderboardWidget() {
    const { user } = useAuth();
    const [rankings, setRankings] = useState([]);
    useEffect(() => {
        if (!user?.familyId)
            return;
        let unsubscribe = null;
        (async () => {
            const { doc, onSnapshot } = await import('firebase/firestore');
            const id = `leaderboard-family-${user.familyId}-weekly`;
            unsubscribe = onSnapshot(doc(db, 'leaderboards', id), (snap) => {
                const data = snap.data();
                setRankings((data?.rankings ?? []));
            });
        })();
        return () => unsubscribe && unsubscribe();
    }, [user?.familyId]);
    return (_jsx("div", { style: { display: 'grid', gap: 8 }, children: rankings.map((r, i) => (_jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsxs("span", { children: ["#", i + 1] }), _jsxs("span", { children: ["Kid ", r.userId] }), _jsxs("span", { children: ["\uD83E\uDE99 ", r.coinsEarned] })] }, r.userId))) }));
}
