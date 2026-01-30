export const notificationService = {
    async send(userId, payload) {
        return { userId, ...payload };
    }
};
