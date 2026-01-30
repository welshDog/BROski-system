export const analytics = {
    send(type, payload) {
        if (import.meta.env.MODE === 'development') {
            console.log('[analytics]', type, payload);
            return;
        }
        try {
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, ...payload })
            }).catch(() => { });
        }
        catch { }
    }
};
