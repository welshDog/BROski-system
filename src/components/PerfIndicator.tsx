import React from 'react';
import { usePerfStore } from '@/stores/perfStore';

export default function PerfIndicator() {
  const animationsPaused = usePerfStore((s) => s.animationsPaused);
  const setAnimationsPaused = usePerfStore((s) => s.setAnimationsPaused);
  const conn = (navigator as any).connection;
  const rtt = conn && typeof conn.rtt === 'number' ? conn.rtt : 0;
  const status = animationsPaused ? 'Paused' : 'Live';
  const color = animationsPaused ? '#FF6B6B' : '#4CAF50';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, background: '#1e1e1e', color: '#ddd' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <span>{status}</span>
      <span style={{ opacity: 0.7 }}>RTT {rtt}ms</span>
      <button
        onClick={() => setAnimationsPaused(!animationsPaused)}
        aria-pressed={animationsPaused}
        aria-label={animationsPaused ? 'Resume animations' : 'Pause animations'}
        style={{ marginLeft: 6, padding: '2px 6px', fontSize: 12, borderRadius: 4, background: '#333', color: '#ddd' }}
      >
        Override
      </button>
    </div>
  );
}
