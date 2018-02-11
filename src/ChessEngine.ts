import {Coordinate} from './Types/Coordinate';
import {VirtualMove} from './Types/VirtualMove';
import VirtualChessboard from './VirtualChessboard';
import Piece from './Piece/Piece';

export default class ChessEngine {
  private player: number;
  private virtualChessBoard: VirtualChessboard;
  private onMoveDeterminedEvent: Function;

  constructor(onMoveDeterminedEvent: Function) {
    this.virtualChessBoard = new VirtualChessboard();
    this.onMoveDeterminedEvent = onMoveDeterminedEvent.bind(this);
  }

  private getAvalibleMoves(virtualChessBoard: VirtualChessboard): VirtualMove[] {
    let avalibleMoves: VirtualMove[] = [];
    let allPieces = virtualChessBoard.getAllPiecesBySide(this.player);

    for (let i = 0; i < allPieces.length; i++) {
      let currentPiece = allPieces[i];
      let avaliblePieceMoves = currentPiece.getMoves();

      avalibleMoves.push({
        position: currentPiece.getPosition(),
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

  private evaluateMove(virtualChessboard: VirtualChessboard, oldCoordinate: Coordinate, newCoordinate: Coordinate): number {
    let evaluation: number = 0;
    let currentPiece = virtualChessboard.getPiece(oldCoordinate.x, oldCoordinate.y);
    let pieceOnTargetSquare = virtualChessboard.getPiece(newCoordinate.x, newCoordinate.y);
    if (pieceOnTargetSquare) {
      evaluation += pieceOnTargetSquare.getWeight();
    }

    let rivalPieces = virtualChessboard.getAllPiecesBySide(this.player ^ 1);
    for (let i = 0; i < rivalPieces.length; i++) {
      let avalibleRivalMoves = rivalPieces[i].getMoves();

      for (let j = 0; j < avalibleRivalMoves.length; j++) {

        if (avalibleRivalMoves[j].x == oldCoordinate.x && avalibleRivalMoves[j].y ==oldCoordinate.y) {
          evaluation -= currentPiece.getWeight();
          return evaluation;
        }
      }
    }

    return evaluation;
  }

  // private getMove(depth: number) {
  //   if (depth < depth) {
  //       f = this.getMove(depth);
  //   }
  //   return ;
  // }

  public analize(depth: number): void {
    let lastSelectedMove: VirtualMove;
    let moves: any[] = [];

    let vcb = this.virtualChessBoard;
    // for (let i = 0; i < depth; i++) {
    //   let avalibleMoves: VirtualMove[] = this.getAvalibleMoves(vcb);
    //
    //   for (let j = 0; j < avalibleMoves.length; j++) {
    //     let evaluation = this.evaluateMove(vcb, avalibleMoves[j]);
    //
    //     moves[i].push({
    //       evaluation: evaluation,
    //       move: avalibleMoves[j],
    //     });
    //
    //
    //     // TODO: Use alpha–beta pruning
    //   }

    let avalibleMoves: VirtualMove[] = this.getAvalibleMoves(vcb);

    for (let j = 0; j < avalibleMoves.length; j++) {
      for (let k = 0; k < avalibleMoves[j].newPoints.length; k++) {
        let evaluation = this.evaluateMove(vcb, avalibleMoves[j].position, avalibleMoves[j].newPoints[k]);

        moves.push({
          evaluation: evaluation,
          oldPoint: avalibleMoves[j].position,
          newPoint: avalibleMoves[j].newPoints[k],
        });
      }
    }
    console.log(moves);
    // if (!lastSelectedMove) {
    //   throw new Error("");
    // }
    //
    // this.onMoveDeterminedEvent(lastSelectedMove);
  }

  public move(oldCoordinate: Coordinate, newCoordinate: Coordinate): void {
    let movablePiece = this.virtualChessBoard.getPiece(oldCoordinate.x, oldCoordinate.y);

    this.virtualChessBoard.setPiece(movablePiece, newCoordinate.x, newCoordinate.y);
    this.virtualChessBoard.removePiece(oldCoordinate.x, oldCoordinate.y);
  }

  public setPlayer(player: number) {
    this.player = player;
  }

  public setUpPieces(picesSetup: Piece[]) {
    this.virtualChessBoard.setUpPieces(picesSetup);
  }

  public getVirtualChessboardLink() {
    return this.virtualChessBoard;
  }
}
