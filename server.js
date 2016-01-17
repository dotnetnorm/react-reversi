
var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http').Server(app),
  io = require('socket.io')(http);
  //feed = require('./feed');
var Redis = require('ioredis');
var redis = new Redis();
var gamesAwaiting=[{gameName:"Test Game"}];
var gamesInProgress = [];
var port = process.env.PORT || 1337;
app.use(express.static(path.join(__dirname, './dist')));

io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);

  socket.on('joinGame', function (settings,gameName) {

      var gameIndex = gamesAwaiting.findIndex(g=>g.gameName==gameName);

      if (gameIndex == -1){
          socket.emit("gameJoinError","Game No Longer Awaiting");
          return;
      }
      gamesAwaiting.splice(gameIndex,1);
      var gameInfo = {gameName:gameName,players:{player1:gameName,player2:settings.playerName}};
      gamesInProgress.push(gameInfo);
      socket.emit("gameJoined",{gameInfo:gameInfo,gamesAwaiting:gamesAwaiting});
      socket.broadcast.emit("gameJoined",{gameInfo:gameInfo,gamesAwaiting:gamesAwaiting});
      //socket.broadcast.emit("awaitingGames",gamesAwaiting);

  });
  socket.on("getAwaitingGames",function(settings){
    socket.emit("awaitingGames",gamesAwaiting);
  });
  socket.on('startGame',function(settings){

      gamesAwaiting.push({gameName:settings.playerName});
      socket.broadcast.emit("newGame",settings.playerName);

  });

  socket.on('leaveGame', function () {



  });
  socket.on("playerMoved", function(action){
    var response = {currentPlayer:action.currentPlayer,
                  flipLocations:action.flipLocations,
                  lastPosition:action.lastPosition,
                  gameName:action.gameName
    };
    console.log("player moving",response);
    socket.broadcast.emit("playerMoved",response);
  });

  socket.on('disconnect', function () {
    console.log('User disconnected. Socket id %s', socket.id);
  });
});


http.listen(port);
