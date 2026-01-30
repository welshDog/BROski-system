import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ApprovalWorkflow from './ApprovalWorkflow';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
export default function ParentDashboard() {
    return (_jsx(ProtectedRoute, { role: "parent", children: _jsxs("div", { style: { padding: 16, display: 'grid', gap: 16 }, children: [_jsx("h2", { children: "Parent Dashboard" }), _jsx(ApprovalWorkflow, {})] }) }));
}
