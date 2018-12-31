const express = require('express');
const app = express();

// root directory (localhost:3000/) now has all 
// files and folders in the 'public' folder
app.use('/', express.static('public'));


// Optional, express automatically loads index.html
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

// app.listen returns a http.Server object
// which is passed as an argument to socket.io
const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// =========
// Express is ready, set up socket.io
// =========

const socket = require('socket.io');
const io = socket(server);

io.on('connection', socket => {
    const message =  socket.id + ' joined';
    console.log(message);
    socket.emit('message', 'Your id is ' + socket.id);

    socket.on('form-submitted', data => {
        console.log(data)
    });
});
