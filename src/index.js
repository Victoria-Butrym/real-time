const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = 4000;

server.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/javascript', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/javascript.html'))
});

app.get('/react', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/react.html'))
});

app.get('/angular', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/angular.html'))
});

const tech = io.of('/tech');

tech.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room`);
    })

    socket.on('message', (data) => {
        console.log('client: ', data.message);
        tech.in(data.room).emit('message', data.message);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        tech.emit('message', 'user disconnected')
    })
})