import React, { useState } from 'react';
import { auth, db } from '@/services/firebase/db';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { analytics } from '@/services/analyticsService';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function MagicLinkLogin() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const actionCodeSettings = {
    url: window.location.origin + '/magic-link',
    handleCodeInApp: true
  } as any;

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    analytics.send('auth_magiclink_start', { email });
    try {
      await sendSignInLinkToEmail(auth as any, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setStatus('sent');
      analytics.send('auth_magiclink_sent', { email });
    } catch (err: any) {
      setError('Failed to send link');
      setStatus('error');
      analytics.send('auth_error', { step: 'magiclink_send', message: String(err?.message || err) });
    }
  };

  React.useEffect(() => {
    const link = window.location.href;
    if (isSignInWithEmailLink(auth as any, link)) {
      let savedEmail = window.localStorage.getItem('emailForSignIn') || email;
      if (!savedEmail) return;
      (async () => {
        try {
          const res = await signInWithEmailLink(auth as any, savedEmail, link);
          const snap = await getDoc(doc(db, 'users', res.user.uid));
          const role = (snap.data() as any)?.role;
          analytics.send('auth_success', { method: 'magiclink', role });
          if (role === 'parent') navigate('/parent');
          else navigate('/kid');
        } catch (err: any) {
          setError('Sign-in failed');
          analytics.send('auth_error', { step: 'magiclink_signin', message: String(err?.message || err) });
        }
      })();
    }
  }, [email, navigate]);

  const isValidEmail = /.+@.+\..+/.test(email);

  return (
    <div style={{ padding: 16, maxWidth: 360 }}>
      <h2>Magic Link Login</h2>
      <form onSubmit={onSend} style={{ display: 'grid', gap: 8 }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" aria-invalid={!isValidEmail} aria-describedby="email-help" required />
        <div id="email-help" aria-live="polite">{!isValidEmail && email ? 'Enter a valid email' : ''}</div>
        <button type="submit" disabled={!isValidEmail}>Send Magic Link</button>
      </form>
      <div role="status" aria-live="polite">{status === 'sent' ? 'Check your email for the link' : ''}</div>
      {error && <div role="alert" aria-live="assertive">{error}</div>}
    </div>
  );
}
