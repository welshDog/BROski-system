import { db } from '@/services/firebase/db';
export async function updateStreakOnApproval(userId) {
    const { doc, getDoc, setDoc } = await import('firebase/firestore');
    const ref = doc(db, 'streaks', userId);
    const snap = await getDoc(ref);
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    if (!snap.exists()) {
        await setDoc(ref, { userId, currentStreak: 1, longestStreak: 1, lastCompletedDate: todayStr, streakStartDate: todayStr });
        return;
    }
    const data = snap.data();
    const last = data.lastCompletedDate;
    if (last === todayStr)
        return;
    const curr = (data.currentStreak ?? 0) + 1;
    const longest = Math.max(curr, data.longestStreak ?? 0);
    await setDoc(ref, { userId, currentStreak: curr, longestStreak: longest, lastCompletedDate: todayStr, streakStartDate: data.streakStartDate ?? todayStr }, { merge: true });
}
export function scheduleDailyStreakCheck() {
    const msInDay = 24 * 60 * 60 * 1000;
    setInterval(() => { }, msInDay);
}
