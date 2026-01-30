import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useRef, useState } from 'react';
import { getMaterialPlugin } from './materials/registry';
import { usePerfStore } from '@/stores/perfStore';
export default function BoardSpace({ position, index, type = 'normal' }) {
    const meshRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const highMaterialEnabled = usePerfStore((s) => s.highMaterialEnabled);
    const colors = {
        normal: '#4F46E5',
        bonus: '#EF4444',
        start: '#22C55E',
        end: '#FBBF24'
    };
    const scale = hovered ? 1.2 : 1;
    return (_jsxs("mesh", { ref: meshRef, position: position, onPointerEnter: () => setHovered(true), onPointerLeave: () => setHovered(false), scale: scale, children: [_jsx("boxGeometry", { args: [0.8, 0.2, 0.8] }), highMaterialEnabled ? (_jsx(Suspense, { fallback: _jsx("meshStandardMaterial", { color: colors[type], emissive: hovered ? colors[type] : '#000', emissiveIntensity: hovered ? 0.5 : 0 }), children: (() => {
                    const Plugin = getMaterialPlugin('physical');
                    return Plugin ? (_jsx(Plugin, { color: colors[type], emissive: hovered ? colors[type] : '#000', emissiveIntensity: hovered ? 0.5 : 0 })) : (_jsx("meshStandardMaterial", { color: colors[type], emissive: hovered ? colors[type] : '#000', emissiveIntensity: hovered ? 0.5 : 0 }));
                })() })) : (_jsx("meshStandardMaterial", { color: colors[type], emissive: hovered ? colors[type] : '#000', emissiveIntensity: hovered ? 0.5 : 0 })), _jsx("meshStandardMaterial", { attach: "material-1", color: "#999" })] }));
}
