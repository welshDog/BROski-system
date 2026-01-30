import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/services/firebase/db';
import { analytics } from '@/services/analyticsService';

interface KidMeta {
  id: string;
  profileName: string;
}

export default function KidLogin() {
  const [kids, setKids] = useState<KidMeta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'users'));
        const next: KidMeta[] = snap.docs
          .map((d) => ({ id: d.id, profileName: (d.data() as any).profileName }))
          .filter((u) => (u as any).role !== 'parent');
        if (mounted) setKids(next);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleKidSelect = (kidId: string) => {
    localStorage.setItem('kidId', kidId);
    analytics.send('auth_success', { method: 'kid-select', role: 'kid', kidId });
    navigate('/kid');
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Choose Your Avatar</h2>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {kids.map((k) => (
          <button key={k.id} onClick={() => handleKidSelect(k.id)} style={{ display: 'grid', gap: 8, padding: 12 }} aria-label={`Login as ${k.profileName}`}>
            <span>{k.profileName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
