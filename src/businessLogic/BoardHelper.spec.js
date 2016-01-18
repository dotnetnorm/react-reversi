import chai from 'chai';
import BoardHelper from "./BoardHelper"

chai.should();

describe('Playing Board',()=>{
  it("Initialize should have 1s for player 1 and player 2",()=> {
    let board = BoardHelper().setupInitialBoard();
    board[3][3].should.equal(1);
    board[3][4].should.equal(-1);
    board[4][3].should.equal(-1);
    board[4][4].should.equal(1);
  });
});
