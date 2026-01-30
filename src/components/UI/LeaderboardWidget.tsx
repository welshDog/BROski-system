import React, { useEffect, useState } from 'react';
import { db } from '@/services/firebase/db';
import { useAuth } from '@/hooks/useAuth';

interface Ranking { userId: string; coinsEarned: number; position: number; }

export default function LeaderboardWidget() {
  const { user } = useAuth();
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    if (!user?.familyId) return;
    let unsubscribe: any = null;
    (async () => {
      const { doc, onSnapshot } = await import('firebase/firestore');
      const id = `leaderboard-family-${user.familyId}-weekly`;
      unsubscribe = onSnapshot(doc(db, 'leaderboards', id), (snap) => {
        const data = snap.data() as any;
        setRankings((data?.rankings ?? []) as Ranking[]);
      });
    })();
    return () => unsubscribe && unsubscribe();
  }, [user?.familyId]);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {rankings.map((r, i) => (
        <div key={r.userId} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>#{i + 1}</span>
          <span>Kid {r.userId}</span>
          <span>🪙 {r.coinsEarned}</span>
        </div>
      ))}
    </div>
  );
}
