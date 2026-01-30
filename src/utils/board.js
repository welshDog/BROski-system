export function computeRadius(viewportWidth, pixelRatio) {
    const base = Math.min(12, Math.max(8, viewportWidth * 0.6));
    return base * pixelRatio;
}
export function worldPosition(boardPos, radius) {
    const angle = (boardPos / 50) * Math.PI * 2;
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}
