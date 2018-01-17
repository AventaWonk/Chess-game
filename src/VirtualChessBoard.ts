import Piece from './Piece/Piece';

interface Coordinate {
  x: number;
  y: number;
}

interface PiecesSetup {
  coordinate: Coordinate;
  piece: Piece;
}

export default class virtualChessboard {
  private chessBoard: Piece[][];

  constructor () {
    this.chessBoard = this.initializeChessBoard();
  }

  public setUpPieces(piecesSetUp: PiecesSetup[]): void {
    for (let i = 0; i < piecesSetUp.length; i++) {
      let currentPiece = piecesSetUp[i];
      this.chessBoard[currentPiece.coordinate.x][currentPiece.coordinate.y] = piecesSetUp[i].piece;
    }
  }

  public getPiece(x: number, y: number): Piece {
    return this.chessBoard[x][y];
  }

  public setPiece(x: number, y: number, piece: Piece): void {
    this.chessBoard[x][y] = piece;
  }

  public removePiece(x: number, y: number): void {
    this.chessBoard[x][y] = null;
  }

  public getAllPieces(): Piece[] {
    let allPieces: Piece[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.chessBoard[i][j]) {
          allPieces.push(this.chessBoard[i][j]);
        }
      }
    }

    return allPieces;
  }

  protected initializeChessBoard(): Piece[][]{
    let chessBoard: Piece[][] = [];

    for (let i = 0; i < 8; i++) {
      chessBoard[i] = [];

      for (let j = 0; j < 8; j++) {
        chessBoard[i][j] = null;
      }
    }

    return chessBoard;
  }
}
