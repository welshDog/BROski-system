type AvatarUpdatePayload = { userId: string; coinDelta: number; positionDelta: number };
type CelebrationPayload = { userId: string; kind: 'approval' | 'levelup'; intensity?: number };

let ch: BroadcastChannel | null = null;
function ensureChannel() {
  if (!ch) ch = new BroadcastChannel('broski-events');
}

export function emitAvatarUpdate(payload: AvatarUpdatePayload) {
  ensureChannel();
  ch!.postMessage({ type: 'avatar-update', payload });
}

export function onAvatarUpdate(cb: (p: AvatarUpdatePayload) => void) {
  ensureChannel();
  const handler = (e: MessageEvent) => {
    if (e.data?.type === 'avatar-update') cb(e.data.payload as AvatarUpdatePayload);
  };
  ch!.addEventListener('message', handler as any);
  return () => {
    if (ch) ch.removeEventListener('message', handler as any);
  };
}

export function emitCelebration(payload: CelebrationPayload) {
  ensureChannel();
  ch!.postMessage({ type: 'celebration', payload });
}

export function onCelebration(cb: (p: CelebrationPayload) => void) {
  ensureChannel();
  const handler = (e: MessageEvent) => {
    if (e.data?.type === 'celebration') cb(e.data.payload as CelebrationPayload);
  };
  ch!.addEventListener('message', handler as any);
  return () => {
    if (ch) ch.removeEventListener('message', handler as any);
  };
}
