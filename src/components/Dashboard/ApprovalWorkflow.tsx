import React, { useEffect, useState } from 'react';

interface TaskInstance {
  id: string;
  choreId: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApprovalWorkflow() {
  const [tasks, setTasks] = useState<TaskInstance[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let mounted = true;

    (async () => {
      const [{ db }, firestore] = await Promise.all([
        import('@/services/firebase/db'),
        import('firebase/firestore')
      ]);
      const { collection, query, where, onSnapshot } = firestore;
      const q = query(collection(db, 'taskInstances'), where('status', '==', 'pending'));
      unsubscribe = onSnapshot(q, (snap) => {
        if (!mounted) return;
        const next = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TaskInstance, 'id'>) }));
        setTasks(next);
      });
    })();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const approveTask = async (taskId: string) => {
    const { approveTask } = await import('@/services/approvalWorkflow');
    await approveTask(taskId, 'parent');
  };

  const rejectTask = async (taskId: string) => {
    const { rejectTask } = await import('@/services/approvalWorkflow');
    await rejectTask(taskId, 'parent', 'Incomplete');
  };

  return (
    <div>
      <h3>Approval Workflow</h3>
      {tasks.map((t) => (
        <div key={t.id}>
          <span>{t.choreId}</span>
          <button onClick={() => approveTask(t.id)}>Approve</button>
          <button onClick={() => rejectTask(t.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
