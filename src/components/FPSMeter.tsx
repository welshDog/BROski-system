import React, { useEffect, useRef, useState } from 'react';

export default function FPSMeter() {
  const [fps, setFps] = useState(0);
  const last = useRef(performance.now());
  const frames = useRef(0);
  useEffect(() => {
    let raf = 0;
    let lastReport = performance.now();
    const step = () => {
      frames.current += 1;
      const now = performance.now();
      if (now - lastReport >= 1000) {
        setFps(frames.current);
        frames.current = 0;
        lastReport = now;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span title="FPS" style={{ marginLeft: 8, opacity: 0.8 }}>FPS {fps}</span>;
}
