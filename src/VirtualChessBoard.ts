import Piece from './Piece/Piece';
import {Coordinate} from './Types/Coordinate';

export default class virtualChessboard {
  private chessBoard: Piece[][];

  constructor () {
    this.initializeChessBoard();
  }

  public setUpPieces(piecesSetUp: Piece[]): void {
    for (let i = 0; i < piecesSetUp.length; i++) {
      this.addPiece(piecesSetUp[i])
    }
  }

  public getPiece(x: number, y: number): Piece {
    return this.chessBoard[x][y];
  }

  public setPiece(piece: Piece, x: number, y: number): void {
    this.chessBoard[x][y] = piece;
    this.chessBoard[x][y].updatePosition({
      x: x,
      y: y
    });
  }

  public addPiece(piece: Piece): void {
    let x = piece.getWPosition().x;
    let y = piece.getWPosition().y;

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

  protected initializeChessBoard(): void {
    this.chessBoard = [];

    for (let i = 0; i < 8; i++) {
      this.chessBoard[i] = [];

      for (let j = 0; j < 8; j++) {
        this.chessBoard[i][j] = null;
      }
    }
  }
}
