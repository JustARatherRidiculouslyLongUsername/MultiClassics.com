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
const fs = require('fs');
const io = socket(server);

io.on('connection', socket => {

    // Log the connection and disconnection of the socket
    console.log(socket.id + ' joined');
    socket.emit('message', 'Your id is ' + socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id + ' left');
    });
    

    // When the login form is submitted, store the data to login-data.json
    socket.on('login-form-submitted', data => {

        const users = require('./login-data');

        users.push(data);

        fs.writeFile('./login-data.json', JSON.stringify(users, null, 4), err => {
            if (err) return console.log(err);
            console.log('Done');
        });
    });
    
});
