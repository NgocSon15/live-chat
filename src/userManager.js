class UserManager {
    constructor() {
        this.users = {};
    }

    addUser(userId, socketId) {
        this.users[userId] = socketId;
    }

    getUserSocket(userId) {
        return this.users[userId];
    }

    removeUser(userId) {
        delete this.users[userId];
    }
}

module.exports = UserManager;