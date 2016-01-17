import * as types from '../constants/ActionTypes';

export function playerMove(settings) {
	return { type: types.MOVE_SELECTED,settings};
}
export function onPlayerMoved(move){
  return {type: types.ON_MOVE_SELECTED,move}
}
export function hoverLocation(settings,location){

  var board = settings.board.board;
  return {type: types.HOVER_POSITION,location, board};
}
export function playerPass(settings){
  return {type:types.PLAYER_PASS,settings};
}
export function getAwaitingGames(){
  return {type:types.CONNECTION_MADE};
}
export function updateName(settings,value){
  return {type:types.UPDATE_NAME,settings,value};
}
export function savePlayerName(settings){
  return {type:types.SAVE_PLAYER_NAME,settings};
}
export function startGame(settings){
  return {type:types.START_NEW_GAME,settings};
}
export function newGameCreated(playerName){
  return {type:types.NEW_GAME_CREATED,playerName}
}
export function gameStarted(playerName){
  return {type:types.GAME_STARTED,playerName};
}
export function onGamesAwaiting(games){
  return {type:types.GAMES_AWAITING,games};
}
export function joinGame(settings,gameName){
  return {type:types.JOIN_GAME,settings,gameName};
}
export function onGameJoined(gameInfo){
  return {type:types.GAME_JOINED,gameInfo};
}
export function onGameJoinedError(msg){
  return {type:types.GAME_JOINED_ERROR,msg};
}
