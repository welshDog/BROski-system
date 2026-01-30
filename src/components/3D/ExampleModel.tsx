import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { createGLTFLoader } from '@/three/loaders';

export default function ExampleModel() {
  const { gl } = useThree();
  const [obj, setObj] = useState<any>(null);
  useEffect(() => {
    // @ts-ignore
    if ((import.meta as any).env?.MODE === 'test') return;
    const loader = createGLTFLoader(gl);
    try {
      loader.load('/models/sample.glb', (g: any) => setObj(g.scene));
    } catch {
      setObj(null);
    }
  }, [gl]);
  if (!obj) return null;
  // @ts-ignore
  return <primitive object={obj} />;
}
