import React, { useState } from 'react';
import { db, storage } from '@/services/firebase/db';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

export default function TaskSubmissionForm() {
  const { user } = useAuth();
  const [choreId, setChoreId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.familyId || !user?.uid) return;
    setSubmitting(true);
    try {
      let photoUrl: string | null = null;
      if (photo) {
        const r = ref(storage, `tasks/${user.uid}/${Date.now()}_${photo.name}`);
        await uploadBytes(r, photo);
        photoUrl = await getDownloadURL(r);
      }
      await addDoc(collection(db, 'taskInstances'), {
        userId: user.uid,
        familyId: user.familyId,
        choreId,
        status: 'pending',
        photoUrl,
        submittedAt: serverTimestamp()
      });
      setChoreId('');
      setPhoto(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <select value={choreId} onChange={(e) => setChoreId(e.target.value)} required aria-label="Chore">
        <option value="">Choose a chore…</option>
        <option value="wash-dishes">Wash Dishes</option>
        <option value="clean-room">Clean Room</option>
        <option value="homework">Finish Homework</option>
      </select>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} aria-label="Photo proof" />
      <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Task'}</button>
    </form>
  );
}
