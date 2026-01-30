export const notificationService = {
  async send(userId: string, payload: Record<string, unknown>) {
    return { userId, ...payload };
  }
};
