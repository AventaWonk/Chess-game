import {Coordinate} from './Types/Coordinate';
import {VirtualMove} from './Types/VirtualMove';
import VirtualChessboard from './VirtualChessboard';
import Piece from './Piece/Piece';



export default class ChessEngine {
  private player: number;
  private virtualChessBoard: VirtualChessboard;
  private callback: Function;

  private enginePiecesCount: number = 0;
  private opponentPiecesCount: number = 0;
  private enginePiecesWeight: number = 0;
  private opponentPiecesWeight: number = 0;

  constructor(player: number, picesSetup: Piece[], callback: Function) {
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
    let allPieces = this.virtualChessBoard.getAllPieces();

    for (let i = 0; i < allPieces.length; i++) {
      let currentPiece = allPieces[i];

      if (currentPiece.getSide() != this.player) {
        continue;
      }

      let avaliblePieceMoves = currentPiece.getMoves();
      for (let i = 0; i < avaliblePieceMoves.length; i++) {
        if (this.moveIsValid(avalibleMoves[i])) {
          avalibleMoves.push({
            oldCoordinate: currentPiece.getWPosition(),
            newCoordinate: avaliblePieceMoves[i],
          });
        }
      }
    }

    return avalibleMoves;
  }

  private movePiece(oldCoordinate: Coordinate, newCoordinate: Coordinate) {
    let movablePiece = this.virtualChessBoard.getPiece(oldCoordinate.x, oldCoordinate.y);

    if (!movablePiece) {
      throw new Error("");
    }

    this.virtualChessBoard.setPiece(movablePiece, newCoordinate.x, newCoordinate.y);
    this.virtualChessBoard.removePiece(newCoordinate.x, newCoordinate.y);

    /* @TODO
    /
    / recalculate stats
    /
    */
  }

  private analize(): virtualMove {
    let avalibleMoves: virtualMove[] = this.getAvalibleMoves();
    let lastSelectedMove: virtualMove;
    lastSelectedMove = avalibleMoves[Math.floor(Math.random() * (avalibleMoves.length))];

    for (let i = 0; i < avalibleMoves.length; i++) {
      // let newOpponentPiecesCount = this.emulateMove(avalibleMoves[i])
      //
      // if (newOpponentPiecesCount < this.opponentPiecesCount) {
      //  lastSelectedMove = avalibleMoves[i];
      // }
    }

    this.movePiece(lastSelectedMove.oldCoordinate, lastSelectedMove.newCoordinate);
    return lastSelectedMove;
  }

  private emulateMove(move: virtualMove): number {
    // let newOpponentPiecesCount = this.opponentPiecesCount;
    // let newOpponentPiecesWeight = this.opponentPiecesWeight;
    //
    // if (this.virtualChessBoard[move.newCoordinate.i][move.newCoordinate.j]) {
    //   newOpponentPiecesWeight -= this.virtualChessBoard[move.newCoordinate.i][move.newCoordinate.j].piece.getWeight();
    //   newOpponentPiecesCount -= 1;
    // }
    //
    // return newOpponentPiecesCount;
  }

  private moveIsValid(move: virtualMove) {
    if (this.isOutOfBoard(move.newCoordinate)) {
      return false;
    }

    let targetPiece = this.virtualChessBoard.getPiece(move.newCoordinate.x, move.newCoordinate.y);
    if (targetPiece && targetPiece.getSide() != this.player) {
      return false;
    }

    return true;
  }

  protected isOutOfBoard(point: Coordinate): boolean {
    return (point.x > 7 || point.y > 7) || (point.x < 0 || point.y < 0);
  }


  public move(oldCoordinate: Coordinate, newCoordinate: Coordinate): any {
    this.movePiece(oldCoordinate, newCoordinate);

    let selectedMove = this.analize();
    this.callback(selectedMove.oldCoordinate, selectedMove.newCoordinate)
  }
}
