export const analytics = {
  send(type: string, payload: Record<string, unknown>) {
    const mode = (import.meta as unknown as { env: { MODE: string } }).env.MODE;
    if (mode === 'development') {
      console.log('[analytics]', type, payload);
      return;
    }
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...payload })
      }).catch(() => {});
    } catch {}
  }
};
