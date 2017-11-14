import {Coordinate} from './Types/Coordinate';
import Piece from './Piece/Piece';
import Pawn from './Piece/Pawn';

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
  private enginePiecesCount: number = 0;
  private opponentPiecesCount: number = 0;
  private enginePiecesWeight: number = 0;
  private opponentPiecesWeight: number = 0;

  constructor(player: number, picesSetup: virtualBoardPoint[], callback: Function) {
    this.player = player;
    this.pieces = this.pieces.concat(picesSetup);
    this.virtualChessBoard = [[],[],[],[],[],[],[],[]];
    this.callback = callback;

    for (let i = 0; i < this.pieces.length; i++) {
      let currentPiceSetup = this.pieces[i];
      this.virtualChessBoard[currentPiceSetup.coordinate.i][currentPiceSetup.coordinate.j] = currentPiceSetup;

      if (currentPiceSetup.piece.getSide() == player) {
        this.opponentPiecesCount += 1;
        this.opponentPiecesWeight += currentPiceSetup.piece.getWeight();
        continue;
      }
      this.enginePiecesCount += 1;
      this.enginePiecesWeight += currentPiceSetup.piece.getWeight();
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
    selectedMove = avalibleMoves[Math.floor(Math.random() * (avalibleMoves.length))];

    for (let i = 0; i < avalibleMoves.length; i++) {
      let newOpponentPiecesCount = this.emulateMove(avalibleMoves[i])

      if (newOpponentPiecesCount < this.opponentPiecesCount) {
       selectedMove = avalibleMoves[i];
      }
    }

    this.movePiece(selectedMove.oldCoordinate, selectedMove.newCoordinate);
    return selectedMove;
  }

  private emulateMove(move: virtualMove): number {
    let newOpponentPiecesCount = this.opponentPiecesCount;
    let newOpponentPiecesWeight = this.opponentPiecesWeight;

    if (this.virtualChessBoard[move.newCoordinate.i][move.newCoordinate.j]) {
      newOpponentPiecesWeight -= this.virtualChessBoard[move.newCoordinate.i][move.newCoordinate.j].piece.getWeight();
      newOpponentPiecesCount -= 1;
    }

    return newOpponentPiecesCount;
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
