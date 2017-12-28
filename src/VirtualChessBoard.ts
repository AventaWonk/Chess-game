import Piece from './Piece/Piece';

interface Coordinate {
  x: number;
  y: number;
}

class virtualChessBoard {
  private chessBoard: Piece[][];

  constructor () {
    this.chessBoard = this.initializeChessBoard();
  }

  public setUpPieces(piecesSetUp: any): void {
    /*
    / @TODO
    /
    / for (let i = 0; i < piecesSetUp.getArray().length; i++) {
    /   this.chessBoard[x][y] = piecesSetUp.getArray()[i].getPiece();
    / }
    /
    */
  }

  public getPiece(x: number, y: number): Piece {
    return this.chessBoard[x][y];
  }

  public setPiece(x: number, y: number, piece: Piece): void {
    this.chessBoard[x][y] = piece;
  }

  protected initializeChessBoard(): Piece[][]{
    let chessBoard: Piece[][] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        chessBoard[i][j] = null;
      }
    }

    return chessBoard;
  }
}
