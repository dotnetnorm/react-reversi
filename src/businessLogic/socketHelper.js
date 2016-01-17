import io from "socket.io-client";
import configureStore from "../store/configureStore";
import * as actions from "../actions/reversiActions";
const socket = io(`${location.protocol}//${location.hostname}:1337`);
var store = null;

export default class Socket
{
  constructor(){
   store =  configureStore(socket);

  }
  getStore(){
    return store;
  }

}
socket.on('connect', ()=> {
  store.dispatch(actions.getAwaitingGames());
  console.log("connected to socket io");
});
socket.on('newGame', playerName=> {
  console.log("new game", playerName);
  store.dispatch(actions.newGameCreated(playerName));
});
socket.on('gameStarted', settings=> {
  console.log("game started", settings.playerName);
  store.dispatch(actions.gameStarted(settings.playerName));
});
socket.on("awaitingGames", games => {
  console.log("awaiting games", games);
  store.dispatch(actions.onGamesAwaiting(games));
});
socket.on("gameJoined", joinInfo => {
  let gamesAwaiting = joinInfo.gamesAwaiting;
  let gameInfo = joinInfo.gameInfo;
  console.log("game joined", gameInfo,gamesAwaiting);
  store.dispatch(actions.onGamesAwaiting(gamesAwaiting));
  store.dispatch(actions.onGameJoined(gameInfo));
});
socket.on("gameJoinError", message => {
  console.log("game join Error", message);
  store.dispatch(actions.onGameJoinedError(message));
});
socket.on("playerMoved", move =>{
  console.log("player has moved", move);
  store.dispatch(actions.onPlayerMoved(move));
})

