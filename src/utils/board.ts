export function computeRadius(viewportWidth: number, pixelRatio: number) {
  const base = Math.min(12, Math.max(8, viewportWidth * 0.6));
  return base * pixelRatio;
}

export function worldPosition(boardPos: number, radius: number) {
  const angle = (boardPos / 50) * Math.PI * 2;
  return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}
