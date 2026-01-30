import React, { useEffect, useState } from 'react';

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
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 10 }}>
      <div style={{ background: '#111', color: '#eee', padding: 16, borderRadius: 8, maxWidth: 420, textAlign: 'center' }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>Watch your avatar move!</div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>Approve a task to see particles, sound, and smooth camera follow.</div>
        <button onClick={() => setVisible(false)} style={{ marginTop: 12 }}>Got it</button>
      </div>
    </div>
  );
}
