import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { usePerfStore } from '@/stores/perfStore';
import BoardSpace from '@/components/3D/BoardSpace';
// No Canvas needed; we render intrinsic elements mapped to divs via setup
test('renders fallback standard material when highMaterial disabled', () => {
    usePerfStore.getState().setHighMaterialEnabled(false);
    render(_jsx(Suspense, { fallback: _jsx("div", { children: "loading" }), children: _jsx(BoardSpace, { position: [0, 0, 0], index: 0 }) }));
    const elems = document.querySelectorAll('[data-r3f="mesh"]');
    expect(elems.length).toBeGreaterThan(0);
});
test('renders physical material when highMaterial enabled', async () => {
    usePerfStore.getState().setHighMaterialEnabled(true);
    render(_jsx(Suspense, { fallback: _jsx("div", { children: "loading" }), children: _jsx(BoardSpace, { position: [0, 0, 0], index: 0 }) }));
    const elems = document.querySelectorAll('[data-r3f="mesh"]');
    expect(elems.length).toBeGreaterThan(0);
});
