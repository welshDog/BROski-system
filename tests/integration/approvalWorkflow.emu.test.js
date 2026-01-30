import { jsx as _jsx } from "react/jsx-runtime";
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { act } from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { addDoc, collection } from 'firebase/firestore';
const hasEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;
test.skip('ApprovalWorkflow e2e with emulator', async () => {
    if (!hasEmulator)
        return;
    const env = await initializeTestEnvironment({ projectId: 'broski-test', firestore: { rules: readFileSync('firestore.rules', 'utf8') } });
    const ctx = env.authenticatedContext('parent-123');
    const db = ctx.firestore();
    await addDoc(collection(db, 'taskInstances'), { status: 'pending', choreId: 'chore-1', userId: 'kid-1', familyId: 'family-abc' });
    await act(async () => {
        const mod = await import('@/components/Dashboard/ApprovalWorkflow');
        const Comp = mod.default;
        render(_jsx(Comp, {}));
    });
    expect(await screen.findByText('chore-1')).toBeInTheDocument();
    await env.cleanup();
});
