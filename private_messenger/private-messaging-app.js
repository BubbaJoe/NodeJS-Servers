var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


app.use('/', express.static(__dirname + '/private_messenger'));

io.sockets.on('connection',function(socket) {
    socket.on("send",function(data) {
        //io.sockets.emit('message', data);
        socket.broadcast.emit('message', data);
    });
});

server.listen(80);