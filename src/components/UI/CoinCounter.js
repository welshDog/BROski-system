import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
export default function CoinCounter() {
    const coinBalance = useGameStore((s) => s.coinBalance);
    const [visibleBonus, setVisibleBonus] = useState(null);
    const prevRef = useRef(coinBalance);
    useEffect(() => {
        const prev = prevRef.current;
        if (coinBalance > prev) {
            setVisibleBonus(coinBalance - prev);
            setTimeout(() => setVisibleBonus(null), 1200);
        }
        prevRef.current = coinBalance;
    }, [coinBalance]);
    return (_jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 6, background: '#1e1e1e', color: '#eee' }, children: [_jsx("span", { children: "\uD83E\uDE99" }), _jsx("span", { children: coinBalance }), visibleBonus != null && _jsxs("span", { style: { color: '#4CAF50' }, children: ["+", visibleBonus] })] }));
}
