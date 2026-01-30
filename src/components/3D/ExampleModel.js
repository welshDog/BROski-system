import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { createGLTFLoader } from '@/three/loaders';
export default function ExampleModel() {
    const { gl } = useThree();
    const [obj, setObj] = useState(null);
    useEffect(() => {
        // @ts-ignore
        if (import.meta.env?.MODE === 'test')
            return;
        const loader = createGLTFLoader(gl);
        try {
            loader.load('/models/sample.glb', (g) => setObj(g.scene));
        }
        catch {
            setObj(null);
        }
    }, [gl]);
    if (!obj)
        return null;
    // @ts-ignore
    return _jsx("primitive", { object: obj });
}
