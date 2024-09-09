const SocketIO = require('socket.io');
const UserManager = require('./userManager');
const ChatManager = require('./chatManager');

class SocketServer {
    start() {
        const userManager = new UserManager();
        const server = SocketIO(3000, {});
        const chatManager = new ChatManager(server, userManager);

        server.on('connection', function (socket) {
            var userId = socket.handshake.query.user_id;
            console.log('A user connected:', userId, socket.id);

            // socket.on('register', (userId) => {
                userManager.addUser(userId, socket.id);
            // });
        
            socket.on('message', ({ from, to, message }) => {
                chatManager.handleMessage(from, to, message);
            });
        
            socket.on('disconnect', () => {
                userManager.removeUser(userId);
                console.log('Client disconnected', userId);
            });
        });
    }
}

const socketIOServer = new SocketServer();
socketIOServer.start();