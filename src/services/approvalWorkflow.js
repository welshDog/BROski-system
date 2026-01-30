import { db } from '@/services/firebase/db';
import { doc, getDoc, updateDoc, increment, serverTimestamp, runTransaction } from 'firebase/firestore';
import { notificationService } from '@/services/notificationService';
import { updateStreakOnApproval } from '@/services/streaks';
import { emitAvatarUpdate, emitCelebration } from '@/services/events';
export async function approveTask(taskId, parentId) {
    try {
        const taskRef = doc(db, 'taskInstances', taskId);
        await runTransaction(db, async (tx) => {
            const snap = await tx.get(taskRef);
            const data = snap.data();
            if (!data)
                throw new Error('Task not found');
            const userId = data.userId;
            const coinAwarded = data.coinAwarded ?? 25;
            tx.update(taskRef, { status: 'approved', approvedBy: parentId, approvedAt: serverTimestamp() });
            const avatarRef = doc(db, 'avatars', userId);
            tx.update(avatarRef, { coinBalance: increment(coinAwarded), position: increment(1), lastUpdated: serverTimestamp() });
        });
        const after = await getDoc(taskRef);
        const payload = after.data();
        const userId = payload.userId;
        const coinAwarded = payload.coinAwarded ?? 25;
        await updateStreakOnApproval(userId);
        await notificationService.send(userId, { type: 'task-approved', message: `Task approved! +${coinAwarded} BROski coins!`, coinsEarned: coinAwarded });
        emitAvatarUpdate({ userId, coinDelta: coinAwarded, positionDelta: 1 });
        emitCelebration({ userId, kind: 'approval', intensity: 1 });
        return { success: true };
    }
    catch (error) {
        return { success: false, error };
    }
}
export async function rejectTask(taskId, parentId, reason) {
    try {
        const taskRef = doc(db, 'taskInstances', taskId);
        await updateDoc(taskRef, { status: 'rejected', approvedBy: parentId, approvedAt: serverTimestamp() });
        const snap = await getDoc(taskRef);
        const data = snap.data();
        if (data?.userId) {
            await notificationService.send(data.userId, { type: 'task-rejected', message: reason });
        }
        return { success: true };
    }
    catch (error) {
        return { success: false, error };
    }
}
