import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { onCelebration } from '@/services/events';

export default function SoundEffects() {
  const { camera } = useThree();
  const audioRef = useRef<THREE.PositionalAudio | null>(null);
  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const posAudio = new THREE.PositionalAudio(listener);
    posAudio.setRefDistance(10);
    audioRef.current = posAudio;
    const off = onCelebration(async () => {
      const ctx = listener.context as AudioContext;
      const duration = 0.2;
      const sampleRate = ctx.sampleRate;
      const frameCount = sampleRate * duration;
      const buffer = ctx.createBuffer(1, frameCount, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        data[i] = Math.sin((i / sampleRate) * 2 * Math.PI * 880) * (1 - i / frameCount); // simple beep with fade
      }
      posAudio.setBuffer(buffer);
      posAudio.setVolume(0.6);
      posAudio.play();
    });
    return () => off();
  }, [camera]);
  return null;
}
