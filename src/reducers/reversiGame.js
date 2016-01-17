import {MOVE_SELECTED,HOVER_POSITION,PLAYER_PASS,START_NEW_GAME,LEAVE_GAME,UPDATE_NAME,SAVE_PLAYER_NAME,NEW_GAME_CREATED,GAME_STARTED,GAMES_AWAITING
,JOIN_GAME,GAME_JOINED,GAME_JOINED_ERROR,ON_MOVE_SELECTED} from '../constants/ActionTypes';

import boardHelper from "../businessLogic/BoardHelper";

let helper = boardHelper();

const initialState = {

    board: helper.setupInitialBoard(),
    winner: false,
    hasMove: true,
    currentPlayer: 1,
    lastPosition: null,
    goodLocation: false,
    playerName:'',
    playerNameSet:false,
    opponentName:'',
    stats: {gamesPlayed: 0, gamesWon:0},
    leaderBoard:{},
    gameStarted:false,
    waitingForOpponent: true,
    gamesAwaitingOpponent:null,
    currentGameInfo:null,
    yourTurn:false,
    gameName:'',
    isPlayer:0
};



export default function reversiGameState(state = initialState, action) {
  //console.log("before switch, ", state, action);
  switch (action.type) {
    case GAME_JOINED:

          var newState = Object.assign({},state);
          let gameInfo = action.gameInfo;
          if (gameInfo.players.player1 == newState.playerName || gameInfo.players.player2 == newState.playerName) {
            newState.gameStarted = true;
            newState.gameName=gameInfo.gameName;
            newState.waitingForOpponent = false;
            if (gameInfo.players.player1 == newState.playerName) {
              newState.opponentName = gameInfo.players.player2;
              newState.yourTurn = true;
              newState.isPlayer = 1;
            }
            else{
              newState.opponentName = gameInfo.players.player2;
              newState.yourTurn = false;
              newState.isPlayer= -1;
            }
            return newState;
          }
          else{
            return newState;
          }
          break;

    case NEW_GAME_CREATED:
          var newState=Object.assign({},state);
          newState.gamesAwaitingOpponent.push({gameName:action.playerName});
          return newState;
          break;
    case GAMES_AWAITING:
          var newState = Object.assign({},state,{gamesAwaitingOpponent:action.games});
          //var gamesAwaiting = action.games;
          //console.log("games Awaiting From Server", action.games);
          //newState.gamesAwaitingOpponent=gamesAwaiting;
          //console.log("new game new state", newState);
          return newState;
          break;

    case START_NEW_GAME:
          var newState = Object.assign({},state,{gameStarted:true});
          return newState;
          break;
    case SAVE_PLAYER_NAME:
          var newState = Object.assign({},state,{playerNameSet:true});
          return newState;
          break;
    case UPDATE_NAME:
          var newState = Object.assign({},state,{playerName:action.value});
          return newState;
          break;

    case HOVER_POSITION:
      var newState = Object.assign({}, state, {board: action.board});
      if (newState.waitingForOpponent){return newState;}
      if (!newState.yourTurn) return newState;
      let board = helper.resetPossibleMoves(newState.board, newState.lastPosition);
      if (newState.board[action.location.row][action.location.column] == 1 || newState.board[action.location.row][action.location.column] == -1) {

        newState.board = board;
        newState.lastPosition = null;
        newState.goodLocation = false;
        return newState;
      }
      let state = helper.updateBoard(newState, action.location);

      return state;
      break;
    case PLAYER_PASS:
      var newState = Object.assign({}, state);
      newState.currentPlayer = -1 * (newState.currentPlayer);
      return newState;
      break;
    case ON_MOVE_SELECTED:
      let newState = Object.assign({}, state);
      var response;
      if (action.settings){
          response = action.settings;
        }
      else{
        response = action.move;
        if (response.gameName!=newState.gameName) return;
      }

        newState.flipLocations = response.flipLocations;
        newState.currentPlayer = response.currentPlayer;
        newState.lastPosition = response.lastPosition;

        newState = helper.updateBoardForMove(newState, newState.currentPlayer);
        newState.lastPosition = null;
        newState.goodLocation = false;
     // console.log(newState.currentPlayer,newState.isPlayer);
       newState.yourTurn = !newState.yourTurn;
        return newState;
      break;
    default:
     // console.log("default ", state);
      return state;
  }
}
