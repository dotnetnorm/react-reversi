import React from "react";


export default class Board extends React.Component{


  render(){
    let width="75px";
    console.log("props ",this.props);
    let settings = this.props.board;
    let actions = this.props.actions;
    let player1Style = {minHeight:"65px",backgroundColor:"green",margin:"5px",borderRadius:"50%",border:"1px green solid"};
    let player2Style = {minHeight:"65px",backgroundColor:"black",margin:"5px",borderRadius:"50%"};
    let flexContainer = {display:"flex",flexDirection:"row",flexWrap:"no-wrap",justifyContent:"space-between",alignContent:"stretch"};

    let empty = {};
    let rowCount=-1;
    return (<div>

            <div>
            {settings.board.map((r)=>{
              rowCount++;
              let columnCount = -1
              return (<div style={flexContainer} key={rowCount}>
                {r.map((c)=>{columnCount++;

                 return <div style={{flex:1,minHeight:"75px",float:"left",border:"1px solid black",margin:"5px"}}
                             onClick={actions.playerMove.bind(this,settings)}
                             onMouseOver={actions.hoverLocation.bind(this,this.props,{row:rowCount,column:columnCount})} key={`${rowCount}:${columnCount}`}>
                        <div style={c == 0 ? empty : (c == 1 || c==10) ? player1Style : player2Style}></div>


                 </div>
                })}</div>)})}
               </div></div>)
  }
}

