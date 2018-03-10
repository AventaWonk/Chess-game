import {Point} from '../../Interfaces/Point';
import {AbstractPiece} from './Piece';

export default class VirtualChessboard {
  private chessBoard: AbstractPiece[][];

  constructor () {
    this.initializeChessBoard();
  }

  public setUpPieces(piecesSetUp: AbstractPiece[]): void {
    for (let i = 0; i < piecesSetUp.length; i++) {
      this.addPiece(piecesSetUp[i])
    }
  }

  public getPiece(x: number, y: number): AbstractPiece {
    if (x > 7 || x < 0 || y > 7 || y < 0) {
      return null;
    }

    return this.chessBoard[x][y];
  }

  public setPiece(piece: AbstractPiece, x: number, y: number): void {
    this.chessBoard[x][y] = piece;
    this.chessBoard[x][y].updatePosition({
      x: x,
      y: y
    });
  }

  public addPiece(piece: AbstractPiece): void {
    let x = piece.getPosition().x;
    let y = piece.getPosition().y;

    this.chessBoard[x][y] = piece;
  }

  public removePiece(x: number, y: number): void {
    this.chessBoard[x][y] = null;
  }

  public movePiece(piece: AbstractPiece, newPoint: Point): void {
    let oldX = piece.getPosition().x;
    let oldY = piece.getPosition().y;
    this.setPiece(piece, newPoint.x, newPoint.y);
    this.removePiece(oldX, oldY);
    piece.setFirstMoveAsIsDone();
  }

  public getAllPieces(): AbstractPiece[] {
    let allPieces: AbstractPiece[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.chessBoard[i][j]) {
          allPieces.push(this.chessBoard[i][j]);
        }
      }
    }

    return allPieces;
  }

  public getAllPiecesBySide(side: number): AbstractPiece[] {
    let allPieces: AbstractPiece[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.chessBoard[i][j] && this.chessBoard[i][j].getSide() == side) {
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

  public serialize(): number[] {
    let array = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!this.chessBoard[i][j]) {
          array.push(null);
          continue;
        }

        array.push(this.chessBoard[i][j].serialize());
      }
    }

    return array;
  }

  public static unserialize(array: number[]): VirtualChessboard {
    let vcb = new VirtualChessboard();

    for (let i = 0; i < 64; i++) {
      let x = Math.floor(i / 8) + 1;
      let y = 8 - 8 * x + i;

      if (array[i]) {
        let piece = AbstractPiece.unserialize(array[i]);
        vcb.setPiece(piece, x - 1, y)
      }
    }

    return vcb;
  }
}
