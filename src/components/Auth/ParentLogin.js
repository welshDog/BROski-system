import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            analytics.send('auth_start', { method: 'password', role: 'parent' });
            const res = await signInWithEmailAndPassword(auth, email, password);
            const snap = await getDoc(doc(db, 'users', res.user.uid));
            const role = snap.data()?.role;
            if (role === 'parent') {
                analytics.send('auth_success', { method: 'password', role });
                navigate('/parent');
            }
            else {
                setError('Not authorized as parent');
                analytics.send('auth_error', { step: 'role_check', message: 'role mismatch' });
            }
        }
        catch (err) {
            setError('Login failed: ' + String(err?.message || err));
            analytics.send('auth_error', { step: 'password_signin', message: String(err?.message || err) });
        }
    };
    return (_jsxs("div", { style: { padding: 16 }, children: [_jsx("h2", { children: "Parent Login" }), _jsxs("form", { onSubmit: onSubmit, style: { display: 'grid', gap: 8, maxWidth: 320 }, children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", "aria-label": "Email", "aria-invalid": !/.+@.+\..+/.test(email), required: true }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", "aria-label": "Password", "aria-invalid": password.length < 6, required: true }), _jsx("button", { type: "submit", children: "Login" }), error && _jsx("div", { role: "alert", "aria-live": "assertive", children: error })] })] }));
}
