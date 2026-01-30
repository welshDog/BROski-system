import { jsx as _jsx } from "react/jsx-runtime";
export default function PhysicalMaterial({ color, emissive = '#000', emissiveIntensity = 0 }) {
    return (_jsx("meshPhysicalMaterial", { color: color, emissive: emissive, emissiveIntensity: emissiveIntensity, roughness: 0.4, clearcoat: 0.3 }));
}
