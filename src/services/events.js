let ch = null;
function ensureChannel() {
    if (!ch)
        ch = new BroadcastChannel('broski-events');
}
export function emitAvatarUpdate(payload) {
    ensureChannel();
    ch.postMessage({ type: 'avatar-update', payload });
}
export function onAvatarUpdate(cb) {
    ensureChannel();
    const handler = (e) => {
        if (e.data?.type === 'avatar-update')
            cb(e.data.payload);
    };
    ch.addEventListener('message', handler);
    return () => {
        if (ch)
            ch.removeEventListener('message', handler);
    };
}
export function emitCelebration(payload) {
    ensureChannel();
    ch.postMessage({ type: 'celebration', payload });
}
export function onCelebration(cb) {
    ensureChannel();
    const handler = (e) => {
        if (e.data?.type === 'celebration')
            cb(e.data.payload);
    };
    ch.addEventListener('message', handler);
    return () => {
        if (ch)
            ch.removeEventListener('message', handler);
    };
}
