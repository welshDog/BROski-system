import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export default function ProtectedRoute({ children, role }) {
    const { user, loading } = useAuth();
    if (loading)
        return React.createElement('div', null, 'Loading…');
    if (!user)
        return React.createElement(Navigate, { to: '/login' });
    if (user.role !== role)
        return React.createElement(Navigate, { to: '/' });
    return React.createElement(React.Fragment, null, children);
}
