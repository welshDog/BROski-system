import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ParentLogin from '@/components/Auth/ParentLogin';
vi.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: vi.fn(() => Promise.reject(new Error('bad creds')))
}));
vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    getDoc: vi.fn(() => ({ data: () => ({ role: 'parent' }) }))
}));
vi.mock('@/services/analyticsService', () => ({
    analytics: { send: vi.fn() }
}));
describe('ParentLogin', () => {
    it('announces error and instruments analytics', async () => {
        render(_jsx(MemoryRouter, { children: _jsx(ParentLogin, {}) }));
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'parent@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByText('Login'));
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('Login failed');
    });
});
