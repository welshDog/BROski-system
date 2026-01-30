import React from 'react';
import ApprovalWorkflow from './ApprovalWorkflow';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

export default function ParentDashboard() {
  return (
    <ProtectedRoute role="parent">
      <div style={{ padding: 16, display: 'grid', gap: 16 }}>
        <h2>Parent Dashboard</h2>
        <ApprovalWorkflow />
      </div>
    </ProtectedRoute>
  );
}
