
let BoardHelper =  function()
{
  let resetPossibleMoves=function(board, lastPosition) {

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      let value = board[r][c];
      if (value != 0 && ((value % 10) == 0)) {
        board[r][c] = -(value / 10);
      }
    }

    if (lastPosition) {

      board[lastPosition.location.row][lastPosition.location.column] = lastPosition.value;
    }
  }

  return board;

}
  let moveIsPossible=function(location, player, board) {
  //we need to check the 9 spots around the location

  let row = location.row;
  let column = location.column;
  let otherPlayer = player == 1 ? 2 : 1;
  let locations = GetPossibleFlips(location.row, location.column, player, board);

  return locations;
}
  let  GetPossibleFlips = function(row, column, player, board) {
  let found = false;
  let locations = [];

  locations.push(processNorth(row, board, column, player));
  locations.push(processNorthEast(row, column, board, player));
  locations.push(processEast(column, board, row, player));
  locations.push(processSouthEast(row, column, board, player));
  locations.push(processSouth(row, board, column, player));
  //console.log("found locations", locations);
  locations.push(processSouthWest(row, column, board, player));
  locations.push(processWest(column, board, row, player));
  locations.push(processNorthWest(row, column, board, player));

  return locations;
}

  let processSouthEast =function(currentRow, currentColumn, board, player) {
   // console.log("processing South East");
    let locations = [];
    let found = false;
    currentRow = currentRow + 1;
    currentColumn = currentColumn + 1
    while (currentRow < 8 && currentColumn < 8) {
      let value = board[currentRow][currentColumn];
      if (value == -player) {
        locations.push({row: currentRow, column: currentColumn});
       // console.log("good Position Found");
      }
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentColumn++;
      currentRow++;
    }
    if (found) return locations;
    return [];
  }

  let processNorthEast = function(row, column, board, player)
  {
    let locations = [];
    let found = false;
    let currentRow = row - 1;
    let currentColumn = column + 1;

    while (currentRow > 0 && currentColumn > 0) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow--;
      currentColumn++;
    }

    return found ? locations : [];
  }
  let processNorth =function(row, board, column, player) {
    let locations = [];
    let found = false;
    for (var i = row - 1; i > -1; i--) {
      let value = board[i][column];
      if (value == -player) locations.push({row: i, column: column});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  let processEast=function(column, board, row, player) {
    let locations = [];
    let found = false;
    for (var i = column + 1; i < 8; i++) {
      let value = board[row][i];
      if (value == -player) locations.push({row: row, column: i});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  let processSouth = function(row, board, column, player) {
    let locations = [];
   // console.log("processing south", row, column);
    let found = false;
    for (var i = row + 1; i < 8; i++) {
      let value = board[i][column];
     // console.log(`${i}:${column}-${value}, player:${player}`);
      if (value == -(player)) {
       // console.log("good location going south");
        locations.push({row: i, column: column});
      }
      if (value == player) {
       // console.log("location is player");
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  let processSouthWest = function(row, column, board, player) {
    let locations = [];
    let found = false;
    let currentRow = row + 1;
    let currentColumn = column - 1;
    while (currentRow < 8 && currentColumn < 8) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (board[currentRow][currentColumn] == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow++;
      currentColumn--;
    }
    return found ? locations : [];
  }

  let processWest = function(column, board, row, player) {
    let locations = [];
    let found = false;
    for (var i = column - 1; i > 0; i--) {
      let value = board[row][i];
      if (value == -player) locations.push({row: row, column: i});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  let processNorthWest = function(row, column, board, player) {
    let currentRow = row - 1;
    let currentColumn = column - 1;
    let locations = [];
    let found = false;
    while (currentRow > -1 && currentColumn > -1) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow--;
      currentColumn--;
    }
    return found ? locations : [];
  }






  return {

    setupInitialBoard:function() {

      let board = [];


      var rows = 8;
      var columns = 8;
      for (var r = 0; r < rows; r++) {
        let newRow = [];

        for (var c = 0; c < columns; c++) {
          let newColumn = 0;
          if (r == 3 && c == 3) newColumn = 1;
          if (r == 3 && c == 4) newColumn = -1;
          if (r == 4 && c == 3) newColumn = -1;
          if (r == 4 && c == 4) newColumn = 1;
          newRow.push(newColumn);
        }
        board.push(newRow);
      }

     // console.log(board);
      return board;
    },

    resetPossibleMoves:function(board, lastPosition) {
    //  console.log(board);
      for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
          let value = board[r][c];
          if (value != 0 && ((value % 10) == 0)) {
            board[r][c] = -(value / 10);
          }
        }

        if (lastPosition) {

          board[lastPosition.location.row][lastPosition.location.column] = lastPosition.value;
        }
      }

      return board;

    },

    updateBoard:function(newState, location) {

      let board = resetPossibleMoves(newState.board, newState.lastPosition);
      let value = board[location.row][location.column];

      let locations = moveIsPossible(location, newState.currentPlayer, board);
      //console.log("locations found after move is possible", locations);
      let cellsSet = 0;
      if (locations.length > 0) {
        newState.flipLocations = locations;


        locations.forEach((l)=> {
          l.forEach((ll)=> {

            cellsSet++;
            board[ll.row][ll.column] = newState.currentPlayer * 10;
          });

        });
      }
      if (cellsSet > 0) {
        newState.goodLocation = true;
        board[location.row][location.column] = newState.currentPlayer * 10;
      }
      newState.board = board;
      newState.lastPosition = {location: location, value: value};

      return newState;
    },
    updateBoardForMove:function(state, player){

      state.flipLocations.forEach((row)=> {
        row.forEach((location)=> {

          state.board[location.row][location.column] = state.currentPlayer;
        });
      });

      state.board[state.lastPosition.location.row][state.lastPosition.location.column] = state.currentPlayer;

      state.currentPlayer = -1 * state.currentPlayer;
      return state;
    }

  }
}
export default BoardHelper;
