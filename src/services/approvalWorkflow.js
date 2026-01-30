import { db } from '@/services/firebase/db';
import { doc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { notificationService } from '@/services/notificationService';
export async function approveTask(taskId, parentId) {
    try {
        const taskRef = doc(db, 'taskInstances', taskId);
        await updateDoc(taskRef, {
            status: 'approved',
            approvedBy: parentId,
            approvedAt: serverTimestamp()
        });
        const taskSnap = await getDoc(taskRef);
        const data = taskSnap.data();
        if (!data)
            throw new Error('Task not found');
        const userId = data.userId;
        const coinAwarded = data.coinAwarded ?? 25;
        const avatarRef = doc(db, 'avatars', userId);
        await updateDoc(avatarRef, {
            coinBalance: increment(coinAwarded),
            position: increment(1),
            lastUpdated: serverTimestamp()
        });
        await notificationService.send(userId, {
            type: 'task-approved',
            message: `Task approved! +${coinAwarded} BROski coins!`,
            coinsEarned: coinAwarded
        });
        return { success: true };
    }
    catch (error) {
        return { success: false, error };
    }
}
