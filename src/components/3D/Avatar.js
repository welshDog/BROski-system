import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { computeRadius, worldPosition } from '@/utils/board';
import { animateTo } from '@/animation/adapter';
export default function Avatar({ boardPosition }) {
    const groupRef = useRef(null);
    const { viewport, gl } = useThree();
    const radius = computeRadius(viewport.width, gl.getPixelRatio());
    useEffect(() => {
        if (groupRef.current) {
            const initial = worldPosition(boardPosition, radius);
            const pos = groupRef.current.position;
            if (pos && typeof pos.set === 'function') {
                pos.set(initial.x, 1, initial.z);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport, gl]);
    useEffect(() => {
        if (groupRef.current) {
            const newPos = worldPosition(boardPosition, radius);
            const pos = groupRef.current.position;
            if (pos) {
                animateTo(pos, { x: newPos.x, z: newPos.z }, 1.2, 'calm');
                const rot = groupRef.current.rotation;
                const angle = (boardPosition / 50) * Math.PI * 2 + Math.PI / 2;
                animateTo(rot, { y: angle }, 1.0, 'snappy');
            }
        }
    }, [boardPosition, radius]);
    return (_jsxs("group", { ref: groupRef, position: [0, 1, 0], children: [_jsxs("mesh", { children: [_jsx("boxGeometry", { args: [0.8, 1, 0.8] }), _jsx("meshStandardMaterial", { color: "#FF6B6B" })] }), _jsxs("mesh", { position: [0.2, 0.4, 0.5], children: [_jsx("sphereGeometry", { args: [0.1, 8, 8] }), _jsx("meshStandardMaterial", { color: "#000" })] }), _jsxs("mesh", { position: [-0.2, 0.4, 0.5], children: [_jsx("sphereGeometry", { args: [0.1, 8, 8] }), _jsx("meshStandardMaterial", { color: "#000" })] })] }));
}
