import { useEffect, useState } from 'react';
import { auth, db } from '@/services/firebase/db';
export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsub = auth?.onAuthStateChanged(async (u) => {
            if (!u) {
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const { doc, getDoc } = await import('firebase/firestore');
                const snap = await getDoc(doc(db, 'users', u.uid));
                const data = snap.data();
                const role = (data?.role ?? 'kid');
                const familyId = (data?.familyId ?? null);
                setUser({ uid: u.uid, role, familyId });
            }
            catch {
                setUser({ uid: u.uid, role: 'kid', familyId: null });
            }
            finally {
                setLoading(false);
            }
        });
        return () => unsub && unsub();
    }, []);
    return { user, loading };
}
