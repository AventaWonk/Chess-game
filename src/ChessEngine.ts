import {Coordinate} from './Types/Coordinate';
import {PiecesSetup} from './Types/PiecesSetup';
import VirtualChessboard from './VirtualChessboard';
import Piece from './Piece/Piece';

// interface virtualBoardPoint {
//   piece: Piece;
//   coordinate: Coordinate;
// }
//
interface virtualMove {
  // pieceLink: Piece;
  oldCoordinate: Coordinate;
  newCoordinate: Coordinate;
}
//
// interface virtualPiece {
//   piece: Piece;
//   coordinate: Coordinate;
// }

export default class ChessEngine {
  private player: number;
  private virtualChessBoard: VirtualChessboard;
  private callback: Function;

  private enginePiecesCount: number = 0;
  private opponentPiecesCount: number = 0;
  private enginePiecesWeight: number = 0;
  private opponentPiecesWeight: number = 0;

  constructor(player: number, picesSetup: PiecesSetup[], callback: Function) {
    this.player = player;
    this.virtualChessBoard = new VirtualChessboard();
    this.virtualChessBoard.setUpPieces(picesSetup);
    this.callback = callback;

    let allPieces = this.virtualChessBoard.getAllPieces();
    for (let i = 0; i < allPieces.length; i++) {
      let currentPice = allPieces[i];
      if (currentPice.getSide() == player) {
        this.opponentPiecesCount += 1;
        this.opponentPiecesWeight += currentPice.getWeight();
        continue;
      }
      this.enginePiecesCount += 1;
      this.enginePiecesWeight += currentPice.getWeight();
    }
  }

  private getAvalibleMoves() {
    let avalibleMoves: virtualMove[] = [];

    for (let i = 0; i < this.virtualPieces.length; i++) {
      if (this.virtualPieces[i].piece.getSide() != this.player) {
        let currentPiece = this.virtualPieces[i];
        let avaliblePieceMoves = currentPiece.piece.getMoves(currentPiece.coordinate, this.virtualChessBoard);

        for (let i = 0; i < avaliblePieceMoves.length; i++) {
          if (this.moveIsValid(avalibleMoves[i])) {
            avalibleMoves.push({
              oldCoordinate: currentPiece.coordinate,
              newCoordinate: avaliblePieceMoves[i],
            });
          }
        }
      }
    }

    return avalibleMoves;
  }

  private movePiece(oldCoordinate: Coordinate, newCoordinate: Coordinate) {
    if (this.virtualChessBoard[newCoordinate.i][newCoordinate.j]) {
      for (let i = 0; i < this.virtualPieces.length; i++) {
        if (this.virtualPieces[i] == this.virtualChessBoard[newCoordinate.i][newCoordinate.j]) {
          this.virtualPieces.splice(i, 1);
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

  private moveIsValid(move: virtualMove) {
    if (this.isOutOfBoard(move.newCoordinate)) {
      return false;
    }

    let targetSquare = this.virtualChessBoard[move.newCoordinate.i][move.newCoordinate.j];
    if (targetSquare.piece.getSide() != this.player) {
      return false;
    }

    return true;
  }

  protected isOutOfBoard(point: Coordinate): boolean {
    return (point.i > 7 || point.j > 7) || (point.i < 0 || point.j < 0);
  }


  public move(oldCoordinate: Coordinate, newCoordinate: Coordinate): any {
    this.movePiece(oldCoordinate, newCoordinate);

    let selectedMove = this.analize();
    this.callback(selectedMove.oldCoordinate, selectedMove.newCoordinate)
  }
}
