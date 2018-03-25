import {Point}  from '../../Interfaces/Point';
import {Move, AvailableMoves} from '../../Interfaces/Move';
import {AbstractPiece} from './Piece';
import VirtualChessboard from './VirtualChessboard';
import {IChessEngine} from '../../Interfaces/ChessEngine';

interface Brunch {
  vcb: number[];
  move: Move;
  evaluation: number;
}

export default class ChessEngine implements IChessEngine {
  private virtualChessBoard: VirtualChessboard;

  constructor() {
    this.virtualChessBoard = new VirtualChessboard();
  }

  private getAllAvailableMoves(virtualChessBoard: VirtualChessboard, side: number): AvailableMoves[] {
    let availableMoves: AvailableMoves[] = [];
    let allPieces = virtualChessBoard.getAllPiecesBySide(side);
    for (let i = 0; i < allPieces.length; i++) {
      let currentPiece = allPieces[i];
      let availablePieceMoves = currentPiece.getMoves(virtualChessBoard);

      if (availablePieceMoves.length > 0) {
        availableMoves.push({
          currentPosition: currentPiece.getPosition(),
          newPoints: availablePieceMoves,
        });
      }
    }

    return availableMoves;
  }

  private evaluateMove(virtualChessboard: VirtualChessboard, oldCoordinate:Point, newCoordinate:Point): number {
    let evaluation: number = 0;
    let currentPiece = virtualChessboard.getPiece(oldCoordinate.x, oldCoordinate.y);
    let pieceOnTargetSquare = virtualChessboard.getPiece(newCoordinate.x, newCoordinate.y);
    if (pieceOnTargetSquare) {
      evaluation += pieceOnTargetSquare.getWeight();
    }

    // emulate move
    let vcbCopy = VirtualChessboard.unserialize(virtualChessboard.serialize());
    vcbCopy.setPiece(currentPiece, newCoordinate.x, newCoordinate.y)
    vcbCopy.removePiece(oldCoordinate.x, oldCoordinate.y);

    let rivalPieces = vcbCopy.getAllPiecesBySide(currentPiece.getSide() ^ 1);
    for (let i = 0; i < rivalPieces.length; i++) {
      let availableRivalMoves = rivalPieces[i].getMoves(vcbCopy);

      for (let j = 0; j < availableRivalMoves.length; j++) {
        if (availableRivalMoves[j].x == newCoordinate.x && availableRivalMoves[j].y == newCoordinate.y) {
          evaluation -= currentPiece.getWeight();
          i = rivalPieces.length;
          j = availableRivalMoves.length;
        }
      }
    }

    // evaluate position
    if (newCoordinate.x > 2 && newCoordinate.x < 7) {
      evaluation += 2;
    }

    return evaluation;
  }

  private generateMoves (side: number, vcb: VirtualChessboard): Brunch[] {
    let brunches: Brunch[] = [];
    let moves = this.getAllAvailableMoves(vcb, side);

    if (!moves) {
      return null;
    }

    for (let i = 0; i < moves.length; i++) {
      let currentMove = moves[i];

      for (let k = 0; k < currentMove.newPoints.length; k++) {
        let currentNewPoint = currentMove.newPoints[k];
        let newVcb = VirtualChessboard.unserialize(vcb.serialize());
        let evaluation = this.evaluateMove(newVcb, currentMove.currentPosition, currentNewPoint);
        let piece = newVcb.getPiece(currentMove.currentPosition.x, currentMove.currentPosition.y);
        // newVcb.movePiece(piece, currentNewPoint);
        piece.setFirstMoveAsIsDone()
        newVcb.setPiece(piece, currentNewPoint.x, currentNewPoint.y)
        newVcb.removePiece(currentMove.currentPosition.x, currentMove.currentPosition.y)

        let newBrunch = {
          vcb: newVcb.serialize(),
          move: {
            oldPosition: currentMove.currentPosition,
            newPosition: currentNewPoint,
          },
          evaluation: evaluation,
        }
        brunches.push(newBrunch);
      }
    }

    return brunches;
  }

  private calculateEvaluation(initialSide: number,
                              currentDepth: number,
                              maxDepth: number,
                              vcb: VirtualChessboard,
                              side: number,
                              alpha: number,
                              beta: number): number {
    let evaluation = 0;
    let bestEval = 0;
    let moves = this.getAllAvailableMoves(vcb, side);

    if (!moves) {
      return 0;
    }

    for (let i = 0; i < moves.length; i++) {
      let currentMove = moves[i];

      for (let j = 0; j < currentMove.newPoints.length; j++) {
        let currentNewPoint = currentMove.newPoints[j];
        let vcbCopy = VirtualChessboard.unserialize(vcb.serialize());
        evaluation = this.evaluateMove(vcbCopy, currentMove.currentPosition, currentNewPoint);

        if (side != initialSide) {
          evaluation = -evaluation;
        }

        if (currentDepth < maxDepth * 2) {
          vcbCopy.movePiece(vcbCopy.getPiece(currentMove.currentPosition.x, currentMove.currentPosition.y), currentNewPoint);
          evaluation += this.calculateEvaluation(initialSide, currentDepth + 1, maxDepth, vcbCopy, side ^ 1, alpha, beta);
        }

        if ((side == initialSide && evaluation > bestEval) || (side != initialSide && evaluation < bestEval) ||  (i == 0 && j == 0)) {
          bestEval = evaluation;
        }

        if (side == initialSide) {
          alpha = Math.max(alpha, evaluation);
        } else {
          beta = Math.min(beta, evaluation);
        }

        if (alpha >= beta) {
          break;
        }
      }
    }

    return bestEval;
  }

  public analyze(side: number, depth: number): Move {
    let movesTree = this.generateMoves(side, this.virtualChessBoard);
    let max = -1000;
    let max_R: Move;
    for (let i = 0; i < movesTree.length; i++) {
      let vcb = VirtualChessboard.unserialize(movesTree[i].vcb);
      let evaluation = this.calculateEvaluation(side, 1, depth, vcb, side ^ 1, -10000, 10000);
      evaluation += movesTree[i].evaluation;

      if (evaluation > max) {
          max = evaluation;
          max_R = movesTree[i].move;
      }

    }

    return max_R;
  }

  public getAvailableMoves(position: Point) {
    return this.virtualChessBoard.getPiece(position.x, position.y).getMoves(this.virtualChessBoard);
  }

  public move(from: Point, to: Point): void {
    let movablePiece = this.virtualChessBoard.getPiece(from.x, from.y);

    this.virtualChessBoard.movePiece(movablePiece, to);
    // this.virtualChessBoard.setPiece(movablePiece, to.x, to.y);
    // this.virtualChessBoard.removePiece(from.x, from.y);
  }

  public setUpPieces(piecesSetup: AbstractPiece[]) {
    let pieceSetupClone = piecesSetup.map((piece) => {
      return Object.create(piece)
    })
    this.virtualChessBoard.setUpPieces(pieceSetupClone);
  }
}
