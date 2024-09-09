class ChatManager {
    constructor(io, userManager) {
        this.io = io;
        this.userManager = userManager;
    }

    handleMessage(from, to, message) {
        const targetSocketId = this.userManager.getUserSocket(to);
        if (targetSocketId) {
            this.io.to(targetSocketId).emit('message', { from, message });
        }
    }
}

module.exports = ChatManager;