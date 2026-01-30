import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { auth, db } from '@/services/firebase/db';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { analytics } from '@/services/analyticsService';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export default function MagicLinkLogin() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const actionCodeSettings = {
        url: window.location.origin + '/magic-link',
        handleCodeInApp: true
    };
    const onSend = async (e) => {
        e.preventDefault();
        analytics.send('auth_magiclink_start', { email });
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            setStatus('sent');
            analytics.send('auth_magiclink_sent', { email });
        }
        catch (err) {
            setError('Failed to send link');
            setStatus('error');
            analytics.send('auth_error', { step: 'magiclink_send', message: String(err?.message || err) });
        }
    };
    React.useEffect(() => {
        const link = window.location.href;
        if (isSignInWithEmailLink(auth, link)) {
            let savedEmail = window.localStorage.getItem('emailForSignIn') || email;
            if (!savedEmail)
                return;
            (async () => {
                try {
                    const res = await signInWithEmailLink(auth, savedEmail, link);
                    const snap = await getDoc(doc(db, 'users', res.user.uid));
                    const role = snap.data()?.role;
                    analytics.send('auth_success', { method: 'magiclink', role });
                    if (role === 'parent')
                        navigate('/parent');
                    else
                        navigate('/kid');
                }
                catch (err) {
                    setError('Sign-in failed');
                    analytics.send('auth_error', { step: 'magiclink_signin', message: String(err?.message || err) });
                }
            })();
        }
    }, [email, navigate]);
    const isValidEmail = /.+@.+\..+/.test(email);
    return (_jsxs("div", { style: { padding: 16, maxWidth: 360 }, children: [_jsx("h2", { children: "Magic Link Login" }), _jsxs("form", { onSubmit: onSend, style: { display: 'grid', gap: 8 }, children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", "aria-label": "Email", "aria-invalid": !isValidEmail, "aria-describedby": "email-help", required: true }), _jsx("div", { id: "email-help", "aria-live": "polite", children: !isValidEmail && email ? 'Enter a valid email' : '' }), _jsx("button", { type: "submit", disabled: !isValidEmail, children: "Send Magic Link" })] }), _jsx("div", { role: "status", "aria-live": "polite", children: status === 'sent' ? 'Check your email for the link' : '' }), error && _jsx("div", { role: "alert", "aria-live": "assertive", children: error })] }));
}
