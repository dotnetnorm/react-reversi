import {MOVE_SELECTED,HOVER_POSITION,PLAYER_PASS} from '../constants/ActionTypes';
import calculator from '../businessLogic/fuelSavingsCalculator';
import dateHelper from '../businessLogic/dateHelper';
import boardHelper from "../businessLogic/BoardHelper";

let helper = boardHelper();

const initialState = {

    board: helper.setupInitialBoard(),
    winner: false,
    hasMove: true,
    currentPlayer: 1,
    lastPosition: null,
    goodLocation: false,
    stats: {gamesPlayed: 0, playerOneWins: 0, playerTwoWins: 0}

};



export default function reversiGameState(state = initialState, action){
  console.log("before switch, ", state,initialState);
  switch(action.type){
    case HOVER_POSITION:

          console.log("state start",state);
          var newState = Object.assign({},state, {board:action.board});
      let board = helper.resetPossibleMoves(newState.board,newState.lastPosition);
          if (newState.board[action.location.row][action.location.column]==1 || newState.board[action.location.row][action.location.column]== -1) {

            newState.board = board;
            newState.lastPosition = null;
            newState.goodLocation = false;
            return newState;
          }
          let state = helper.updateBoard(newState,action.location);
          console.log("state after update ", state);
      return state;
          break;
    case PLAYER_PASS:
          var newState = Object.assign({},state);
          newState.currentPlayer = -1*(newState.currentPlayer);
          return newState;
          break;
    case MOVE_SELECTED:

          let newState = Object.assign({},state);
          if (newState.goodLocation){
            newState = helper.updateBoardForMove(newState,newState.currentPlayer);
            newState.lastPosition  = null;
            newState.goodLocation=false;
          }


          return newState;
          break;
    default:
          console.log("default " ,state);
          return state;
  }
}
