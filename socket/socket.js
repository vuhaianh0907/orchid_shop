const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle bidding events
    socket.on('bid', (data) => {
        // Broadcast the bid to all connected clients
        io.emit('bid', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('WebSocket server running on port 3000');
});
