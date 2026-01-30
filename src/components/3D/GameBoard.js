import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
const OrbitControls = React.lazy(() => import('@react-three/drei').then((m) => ({ default: m.OrbitControls })));
import BoardSpace from './BoardSpace';
import Avatar from './Avatar';
import { useGameStore } from '@/stores/gameStore';
import { usePerfStore } from '@/stores/perfStore';
import ExampleModel from './ExampleModel';
export default function GameBoard() {
    const position = useGameStore((s) => s.position);
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const enableControls = useCallback(() => setControlsEnabled(true), []);
    const containerRef = useRef(null);
    const animationsPaused = usePerfStore((s) => s.animationsPaused);
    return (_jsx("div", { ref: containerRef, style: { width: '100%', height: '100%' }, children: _jsxs(Canvas, { camera: { position: [0, 20, 20], fov: 45 }, onPointerDown: enableControls, children: [_jsx("ambientLight", { intensity: 0.8 }), _jsx("pointLight", { position: [10, 20, 10], intensity: 1 }), _jsx("pointLight", { position: [-10, 20, -10], intensity: 0.5 }), Array.from({ length: 50 }).map((_, i) => {
                    const angle = (i / 50) * Math.PI * 2;
                    const x = Math.cos(angle) * 12;
                    const z = Math.sin(angle) * 12;
                    let spaceType = 'normal';
                    if (i === 0)
                        spaceType = 'start';
                    if (i === 49)
                        spaceType = 'end';
                    if (i % 10 === 0 && i !== 0)
                        spaceType = 'bonus';
                    return _jsx(BoardSpace, { position: [x, 0, z], index: i, type: spaceType }, i);
                }), !animationsPaused && _jsx(Avatar, { boardPosition: position }), _jsx(Suspense, { fallback: null, children: _jsx(ExampleModel, {}) }), controlsEnabled && (_jsx(Suspense, { fallback: null, children: _jsx(OrbitControls, { autoRotate: true, autoRotateSpeed: 2, enableZoom: true, enablePan: true }) }))] }) }));
}
