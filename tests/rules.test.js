import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { afterAll, beforeAll, expect, test } from 'vitest';
let testEnv = null;
const hasEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;
beforeAll(async () => {
    if (!hasEmulator)
        return;
    testEnv = await initializeTestEnvironment({
        projectId: 'broski-test',
        firestore: {
            rules: readFileSync('firestore.rules', 'utf8')
        }
    });
});
afterAll(async () => {
    if (testEnv)
        await testEnv.cleanup();
});
const maybe = (name, fn) => (hasEmulator ? test(name, fn) : test.skip(name, fn));
maybe('Parents can read family document', async () => {
    if (!testEnv)
        throw new Error('No emulator');
    const parent = testEnv.authenticatedContext('parent-123').firestore();
    const admin = testEnv.unauthenticatedContext().firestore();
    const famRef = admin.collection('families').doc('family-abc');
    await famRef.set({ parentIds: ['parent-123'], name: 'The Smiths' });
    await expect(parent.doc(famRef.path).get()).resolves.toBeTruthy();
});
maybe('Kids can create own taskInstance; parents can update', async () => {
    if (!testEnv)
        throw new Error('No emulator');
    const kid = testEnv.authenticatedContext('kid-1').firestore();
    const parent = testEnv.authenticatedContext('parent-123').firestore();
    const admin = testEnv.unauthenticatedContext().firestore();
    await admin.collection('families').doc('family-abc').set({ parentIds: ['parent-123'] });
    const taskRef = kid.collection('taskInstances').doc('task-inst-001');
    await expect(taskRef.set({ userId: 'kid-1', status: 'pending', familyId: 'family-abc' })).resolves.toBeUndefined();
    await expect(parent.doc(taskRef.path).update({ status: 'approved' })).resolves.toBeUndefined();
});
