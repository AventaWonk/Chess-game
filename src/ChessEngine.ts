import {Coordinate} from './Types/Coordinate';
import {VirtualMove} from './Types/VirtualMove';
import VirtualChessboard from './VirtualChessboard';
import Piece from './Piece/Piece';

export default class ChessEngine {
  private player: number;
  private virtualChessBoard: VirtualChessboard;
  private onMoveDeterminedEvent: Function;

  constructor(player: number, picesSetup: Piece[], onMoveDeterminedEvent: Function) {
    this.player = player;
    this.virtualChessBoard = new VirtualChessboard();
    this.virtualChessBoard.setUpPieces(picesSetup);
    this.onMoveDeterminedEvent = onMoveDeterminedEvent;
  }

  private getAvalibleMoves(): VirtualMove[] {
    let avalibleMoves: VirtualMove[] = [];
    let allPieces = this.virtualChessBoard.getAllPieces();

    for (let i = 0; i < allPieces.length; i++) {
      let currentPiece = allPieces[i];

      if (currentPiece.getSide() != this.player) {
        continue;
      }

      let avaliblePieceMoves = currentPiece.getMoves(); // TODO: validate in getMoves()
      avalibleMoves.push({
        position: allPieces[i].getWPosition(),
        newPoints: avaliblePieceMoves,
      });
    }

    return avalibleMoves;
  }

  private validateMove(oldCoordinate: Coordinate, newCoordinate: Coordinate): boolean {
    let movablePiece = this.virtualChessBoard.getPiece(oldCoordinate.x, oldCoordinate.y);

    if (!movablePiece) {
      return false;
    }

    if (movablePiece.getSide() != this.player) {
      return false;
    }

    if ((newCoordinate.x > 7 || newCoordinate.y > 7) || (newCoordinate.x < 0 || newCoordinate.y < 0)) {
      return false;
    }

    return true;
  }

  public analize(): void {
    let lastSelectedMove: VirtualMove;
    let avalibleMoves: VirtualMove[] = this.getAvalibleMoves();

    for (let i = 0; i < avalibleMoves.length; i++) {
      // TODO: Use alpha–beta pruning
    }

    if (!lastSelectedMove) {
      throw new Error("");
    }

    this.onMoveDeterminedEvent(lastSelectedMove);
  }

  public move(oldCoordinate: Coordinate, newCoordinate: Coordinate): void {
    let movablePiece = this.virtualChessBoard.getPiece(oldCoordinate.x, oldCoordinate.y);

    if (!this.validateMove(oldCoordinate, newCoordinate)) {
      throw new Error("");
    }

    this.virtualChessBoard.setPiece(movablePiece, newCoordinate.x, newCoordinate.y);
    this.virtualChessBoard.removePiece(newCoordinate.x, newCoordinate.y);
  }
}
