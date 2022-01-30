const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = 4000;

server.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', { trinity: 'Wake up, Neo' });
    socket.on('answer', (data) => console.log('answer from client: ', data))
})