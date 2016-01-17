import React from "react";


export default class Header extends React.Component{

  render(){
    let currentPlayer = this.props.currentPlayer;
    let playerNumber =this.props.isPlayer;
    let yourTurn = this.props.yourTurn;
    let player1Style = {minHeight:"30px",minWidth:"30px",backgroundColor:"green",margin:"5px",borderRadius:"50%",border:"1px green solid"};
    let player2Style = {minHeight:"30px",minWidth:"30px",backgroundColor:"black",margin:"5px",borderRadius:"50%", boarder:"1px black solid"};
    return (<div>
            <h2>You are: <div style={{width:"35px",display:"inline-block"}}>{playerNumber == 1 ? <div style={player1Style}></div> : <div style={player2Style}></div>}</div></h2>
      {yourTurn==false ? <h2>Waiting On Other Player To Play</h2> : <h2>Your Turn</h2>}

    </div>)
  }
}
