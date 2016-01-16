
var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http').Server(app),
  io = require('socket.io')(http);
  //feed = require('./feed');
var redis = require('redis');
var client = redis.createClient();

app.use(express.static(path.join(__dirname, '../dist')));

io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);

  socket.on('joinGame', function (game) {
    //console.log('Socket %s subscribed to %s', socket.id, rooms);
    //if (Array.isArray(rooms)) {
    //  rooms.forEach(function(room) {
    //    socket.join(room);
    //  });
    //} else {
    //  socket.join(rooms);
    //}
  });
  socket.on('createGame',function(){

  });

  socket.on('leaveGame', function () {
    //console.log('Socket %s unsubscribed from %s', socket.id, rooms);
    //if (Array.isArray(rooms)) {
    //  rooms.forEach(function(room) {
    //    socket.leave(room);
    //  });
    //} else {
    //  socket.leave(rooms);

  });
  socket.on("move", function(action){
    console.log("move", action);
  });

  socket.on('disconnect', function () {
    console.log('User disconnected. Socket id %s', socket.id);
  });
});

//feed.start(function(room, type, message) {
//  //io.to(room).emit(type, message);
//});

http.listen(8080, function () {
  console.log('listening on: 3001');
});
