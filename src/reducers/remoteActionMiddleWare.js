import {MOVE_SELECTED,HOVER_POSITION,PLAYER_PASS,START_NEW_GAME,NEW_GAME_CREATED,GAME_STARTED,CONNECTION_MADE, GAMES_AWAITING,JOIN_GAME,ON_MOVE_SELECTED} from '../constants/ActionTypes';

export default  socket => store => next => action => {
  if (action.type == MOVE_SELECTED) {
    socket.emit('move', action);
  }
  if (action.type==START_NEW_GAME){
    socket.emit('startGame',action.settings);
  }
  if (action.type==CONNECTION_MADE){
    socket.emit("getAwaitingGames");
    return;
  }
  if (action.type==JOIN_GAME){
    socket.emit("joinGame",action.settings,action.gameName);
    return;
  }
  if (action.type==MOVE_SELECTED){
    console.log("move action", action);
    if (action.settings.goodLocation==true) {
      console.log("Move Selected")
      socket.emit("playerMoved", action.settings);
      action.type=ON_MOVE_SELECTED;
    }
    else {
      return;
    }
  }

  return next(action);
}
