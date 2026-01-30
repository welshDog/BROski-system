import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { db, storage } from '@/services/firebase/db';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
export default function TaskSubmissionForm() {
    const { user } = useAuth();
    const [choreId, setChoreId] = useState('');
    const [photo, setPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!user?.familyId || !user?.uid)
            return;
        setSubmitting(true);
        try {
            let photoUrl = null;
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
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs("form", { onSubmit: onSubmit, style: { display: 'grid', gap: 12, maxWidth: 360 }, children: [_jsxs("select", { value: choreId, onChange: (e) => setChoreId(e.target.value), required: true, "aria-label": "Chore", children: [_jsx("option", { value: "", children: "Choose a chore\u2026" }), _jsx("option", { value: "wash-dishes", children: "Wash Dishes" }), _jsx("option", { value: "clean-room", children: "Clean Room" }), _jsx("option", { value: "homework", children: "Finish Homework" })] }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => setPhoto(e.target.files?.[0] || null), "aria-label": "Photo proof" }), _jsx("button", { type: "submit", disabled: submitting, children: submitting ? 'Submitting…' : 'Submit Task' })] }));
}
