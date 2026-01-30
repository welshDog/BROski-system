import React from 'react';

export function SkeletonBoard() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }} role="status" aria-live="polite">
      <div style={{ width: 120, height: 120, borderRadius: 8, background: '#222' }} />
    </div>
  );
}

export function SkeletonConfigurator() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }} role="status" aria-live="polite">
      <div style={{ width: 160, height: 24, borderRadius: 6, background: '#222' }} />
    </div>
  );
}

export function SkeletonAR() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#111' }} role="status" aria-live="polite">
      <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#222' }} />
    </div>
  );
}
