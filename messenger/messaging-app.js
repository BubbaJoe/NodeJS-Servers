var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.get('/chat.css',function(req, res) {
    res.sendFile(__dirname + '/messenger/chat.css');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/messenger/index.html');
});

var users = new Array();
var numUsers = 0;

io.sockets.on('connection',function(socket) {
    numUsers++;
    users[socket.id] = "User"+numUsers;
    socket.on("send",function(data) {
        //io.sockets.emit('message', data);
        socket.broadcast.emit('message',users[socket.id] + " : " + data);
    });
});

server.listen(80);