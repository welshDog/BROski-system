import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

export default function CoinCounter() {
  const coinBalance = useGameStore((s) => s.coinBalance);
  const [visibleBonus, setVisibleBonus] = useState<number | null>(null);
  const prevRef = useRef(coinBalance);

  useEffect(() => {
    const prev = prevRef.current;
    if (coinBalance > prev) {
      setVisibleBonus(coinBalance - prev);
      setTimeout(() => setVisibleBonus(null), 1200);
    }
    prevRef.current = coinBalance;
  }, [coinBalance]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 6, background: '#1e1e1e', color: '#eee' }}>
      <span>🪙</span>
      <span>{coinBalance}</span>
      {visibleBonus != null && <span style={{ color: '#4CAF50' }}>+{visibleBonus}</span>}
    </div>
  );
}
