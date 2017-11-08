import Piece from './Piece/Piece';
import Pawn from './Piece/Pawn';


interface Coordinate {
  i: number;
  j: number;
}

interface virtualBoardPoint {
  piece: Piece;
  coordinate: Coordinate;
}

interface virtualMove {
  // pieceLink: Piece;
  oldCoordinate: Coordinate;
  newCoordinate: Coordinate;
}

interface virtualPiece {
  piece: Piece;
  coordinate: Coordinate;
}

export default class ChessEngine {
  private player: number;
  private virtualChessBoard: virtualPiece[][] = Array(8);
  private pieces: virtualPiece[] = [];
  private callback: Function;

  constructor(player: any, picesSetup: virtualBoardPoint[], callback: Function) {
    this.player = player;
    this.pieces = this.pieces.concat(picesSetup);
    this.virtualChessBoard = [[],[],[],[],[],[],[],[]];
    this.callback = callback;

    for (let i = 0; i < this.pieces.length; i++) {
      let currentPiceSetup = this.pieces[i];
      this.virtualChessBoard[currentPiceSetup.coordinate.i][currentPiceSetup.coordinate.j] = currentPiceSetup;
    }
  }

  private getAvalibleMoves() {
    let avalibleMoves: virtualMove[] = [];

    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].piece.getSide() != this.player) {
        let currentPiece = this.pieces[i];
        let avaliblePiecesMoves = currentPiece.piece.getMoves(currentPiece.coordinate, this.virtualChessBoard);

        for (let i = 0; i < avaliblePiecesMoves.length; i++) {
          let targetSquare = this.virtualChessBoard[avaliblePiecesMoves[i].i][avaliblePiecesMoves[i].j];

          if (targetSquare && (targetSquare.coordinate.i > 7 || targetSquare.coordinate.j > 7 || targetSquare.coordinate.j < 0 || targetSquare.coordinate.j < 0)) {
            break;
          }

          if (targetSquare && targetSquare.piece.getSide() != this.player) {
            break;
          }

          avalibleMoves.push({
            oldCoordinate: currentPiece.coordinate,
            newCoordinate: avaliblePiecesMoves[i],
          });
        }
      }
    }

    return avalibleMoves;
  }

  private movePiece(oldCoordinate: Coordinate, newCoordinate: Coordinate) {
    if (this.virtualChessBoard[newCoordinate.i][newCoordinate.j]) {
      for (let i = 0; i < this.pieces.length; i++) {
          if (this.pieces[i] == this.virtualChessBoard[newCoordinate.i][newCoordinate.j]) {
            this.pieces.splice(i, 1);
            break;
          };
      }
    }

    this.virtualChessBoard[newCoordinate.i][newCoordinate.j] = this.virtualChessBoard[oldCoordinate.i][oldCoordinate.j];
    this.virtualChessBoard[newCoordinate.i][newCoordinate.j].coordinate = newCoordinate;
    this.virtualChessBoard[oldCoordinate.i][oldCoordinate.j] = null;
  }
  
  private analize(): virtualMove {
    let avalibleMoves: virtualMove[] = this.getAvalibleMoves();
    let selectedMove: virtualMove;

    // for (let i = 0; i < array.length; i++) {
    //     array[i];
    // }

    selectedMove = avalibleMoves[0];
    this.movePiece(selectedMove.oldCoordinate, selectedMove.newCoordinate);

    return selectedMove;
  }

  private getPiece() {

  }

  public position() {
    // fo
  }

  public go() {
    // fo
  }

  public stop() {

  }

  public move(oldCoordinate: Coordinate, newCoordinate: Coordinate): any {
    this.movePiece(oldCoordinate, newCoordinate);

    let selectedMove = this.analize();
    this.callback(selectedMove.oldCoordinate, selectedMove.newCoordinate)
  }
}
