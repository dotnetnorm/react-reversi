// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reversiActions from '../actions/reversiActions';
import Board from "../components/Board";
import Header from "../components/header";


class PlayerName extends React.Component {
  constructor(props){
    super(props)
    this.nameChanged = this.nameChanged.bind(this);
  }
  nameChanged(event){
   // console.log("name value", event.target.value);
  this.props.actions.updateName(this.props.settings,event.target.value);
  }

  render() {

    const {playerName} = this.props.settings;
    const actions = this.props.actions;

    return (<div>
    Your Name: <input type="text" value={playerName} onChange={this.nameChanged}/> <button type="button" onClick={actions.savePlayerName.bind(this,this.props.settings)}>OK</button></div>)
  }
}
class StartGame extends React.Component{
  render(){
      return (<button type="button" onClick={this.props.actions.startGame.bind(this,this.props.settings)}>Start Game</button>);
  }
}
class Waiting extends React.Component{
  render(){
    return (<div><h2>Waiting For Opponent</h2></div>);
  }
}
class GamesNeedingOpponent extends React.Component{
  render(){

    return (this.props.settings.gamesAwaitingOpponent != null ? <div>
      {this.props.settings.gamesAwaitingOpponent.map((game)=>{
          return (<div key={game.gameName}>{game.gameName} - <button type="button" onClick={this.props.actions.joinGame.bind(this,this.props.settings,game.gameName)}>Join</button></div>)
      })}

    </div> : <div></div>)
  }
}



class App extends React.Component {
  render() {
    const { board, actions } = this.props;
    const {props} = this.props;
    return (
        <div>

          {board.playerNameSet == false ? <PlayerName settings={board} actions={actions}/>  :
          board.gameStarted == false ? <StartGame settings={board} actions={actions} /> :
          board.waitingForOpponent == true ? <Waiting /> : "" }
          {board.gameStarted ?   <div>
          <Header currentPlayer = {board.currentPlayer} isPlayer={board.isPlayer} yourTurn={board.yourTurn}/>
        <Board board={board} actions={actions} />
            </div> : <GamesNeedingOpponent settings={board} actions={actions}/> }
          </div>

    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //console.log("state ", state);
  return {
    board: state.reversiGameState,
    //currentPlayer : state.reversiGameState.currentPlayer,
    //      gameStarted:state.reversiGameState.gameStarted,
    //      playerName:state.reversiGameState.playerName,
    //      opponentName:state.reversiGameState.opponentName,
    //      yourTurn:state.reversiGameState.yourTurn

  };
}

function mapDispatchToProps(dispatch) {
 // console.log("dispatch ", dispatch);
  return {
    actions: bindActionCreators(reversiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
