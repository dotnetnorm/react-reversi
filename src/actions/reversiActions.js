import * as types from '../constants/ActionTypes';

export function playerMove(settings) {
	return { type: types.MOVE_SELECTED,settings};
}
export function hoverLocation(settings,location){
  console.log("settings ",settings);
console.log("locaiton ", location);
  var board = settings.board.board;
  return {type: types.HOVER_POSITION,location, board};
}
export function playerPass(settings){
  return {type:types.PLAYER_PASS,settings};
}

