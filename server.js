// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const users = {};

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('new-user', username => {
        users[socket.id] = username;
        socket.broadcast.emit('chat-message', {
            username:'system',
            message: `${username} connected.`,
            system:true
        });
    });

    socket.on('send-chat-message', message => {
        const username = users[socket.id];
        io.emit('chat-message', {
            username: username,
            message: message,
            system:false
        });
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            socket.broadcast.emit('chat-message', {
                username:'system',
                message: `${users[socket.id]} has left the chat`,
                system:true
            });
            delete users[socket.id];
        }
    });
});

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
