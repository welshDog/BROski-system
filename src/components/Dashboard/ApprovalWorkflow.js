import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function ApprovalWorkflow() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        let unsubscribe = null;
        let mounted = true;
        (async () => {
            const [{ db }, firestore] = await Promise.all([
                import('@/services/firebase/db'),
                import('firebase/firestore')
            ]);
            const { collection, query, where, onSnapshot } = firestore;
            const q = query(collection(db, 'taskInstances'), where('status', '==', 'pending'));
            unsubscribe = onSnapshot(q, (snap) => {
                if (!mounted)
                    return;
                const next = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                setTasks(next);
            });
        })();
        return () => {
            mounted = false;
            if (unsubscribe)
                unsubscribe();
        };
    }, []);
    const approveTask = async (taskId) => {
        const [{ db }, { updateDoc, doc }] = await Promise.all([
            import('@/services/firebase/db'),
            import('firebase/firestore')
        ]);
        await updateDoc(doc(db, 'taskInstances', taskId), { status: 'approved' });
    };
    const rejectTask = async (taskId) => {
        const [{ db }, { updateDoc, doc }] = await Promise.all([
            import('@/services/firebase/db'),
            import('firebase/firestore')
        ]);
        await updateDoc(doc(db, 'taskInstances', taskId), { status: 'rejected' });
    };
    return (_jsxs("div", { children: [_jsx("h3", { children: "Approval Workflow" }), tasks.map((t) => (_jsxs("div", { children: [_jsx("span", { children: t.choreId }), _jsx("button", { onClick: () => approveTask(t.id), children: "Approve" }), _jsx("button", { onClick: () => rejectTask(t.id), children: "Reject" })] }, t.id)))] }));
}
