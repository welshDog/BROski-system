import { useEffect, useState } from 'react';
import { auth, db } from '@/services/firebase/db';

interface AuthState {
  uid: string;
  role: 'parent' | 'kid';
  familyId: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth?.onAuthStateChanged(async (u: any) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'users', u.uid));
        const data = snap.data() as any;
        const role = (data?.role ?? 'kid') as 'parent' | 'kid';
        const familyId = (data?.familyId ?? null) as string | null;
        setUser({ uid: u.uid, role, familyId });
      } catch {
        setUser({ uid: u.uid, role: 'kid', familyId: null });
      } finally {
        setLoading(false);
      }
    });
    return () => unsub && unsub();
  }, []);

  return { user, loading };
}
