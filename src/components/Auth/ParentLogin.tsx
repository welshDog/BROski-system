import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/services/firebase/db';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { analytics } from '@/services/analyticsService';

export default function ParentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      analytics.send('auth_start', { method: 'password', role: 'parent' });
      const res = await signInWithEmailAndPassword(auth as any, email, password);
      const snap = await getDoc(doc(db, 'users', res.user.uid));
      const role = (snap.data() as any)?.role;
      if (role === 'parent') {
        analytics.send('auth_success', { method: 'password', role });
        navigate('/parent');
      } else {
        setError('Not authorized as parent');
        analytics.send('auth_error', { step: 'role_check', message: 'role mismatch' });
      }
    } catch (err: any) {
      setError('Login failed: ' + String(err?.message || err));
      analytics.send('auth_error', { step: 'password_signin', message: String(err?.message || err) });
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Parent Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" aria-invalid={!/.+@.+\..+/.test(email)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" aria-invalid={password.length < 6} required />
        <button type="submit">Login</button>
        {error && <div role="alert" aria-live="assertive">{error}</div>}
      </form>
    </div>
  );
}
