import {Point}  from '../../Interfaces/Point';
import {Move, AvailableMoves} from '../../Interfaces/Move';
import {AbstractPiece} from './Piece';
import {PieceSet} from './PieceSet';
import {IChessEngine} from '../../Interfaces/ChessEngine';
import VirtualChessboard from './VirtualChessboard';

interface Result {
  eval: number,
  move: Move,
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

  private calculateEvaluation(initialSide: number,
                              currentDepth: number,
                              maxDepth: number,
                              vcb: VirtualChessboard,
                              side: number,
                              alpha: number,
                              beta: number): Result {
    let result: Result = {
      eval: 0,
      move: null,
    }

    let evaluation = 0;
    let bestEval = 0;
    let moves = this.getAllAvailableMoves(vcb, side);

    if (!moves) {
      return result;
    }

    for (let i = 0; i < moves.length; i++) {
      let currentMove = moves[i];

      for (let j = 0; j < currentMove.newPoints.length; j++) {
        let currentNewPoint = currentMove.newPoints[j];
        // let vcbCopy = Object.create(vcb);
        let vcbCopy = VirtualChessboard.unserialize(vcb.serialize());
        evaluation = this.evaluateMove(vcbCopy, currentMove.currentPosition, currentNewPoint);

        if (side != initialSide) {
          evaluation = -evaluation;
        }

        if (currentDepth < maxDepth * 2) {
          vcbCopy.movePiece(vcbCopy.getPiece(currentMove.currentPosition.x, currentMove.currentPosition.y), currentNewPoint);
          evaluation += this.calculateEvaluation(initialSide, currentDepth + 1, maxDepth, vcbCopy, side ^ 1, alpha, beta).eval;
        }

        if ((side == initialSide && evaluation > bestEval) || (side != initialSide && evaluation < bestEval) ||  (i == 0 && j == 0)) {
          bestEval = evaluation;
          result.eval = evaluation;

          if (currentDepth == 1) {
            result.move = {
              oldPosition: currentMove.currentPosition,
              newPosition: currentMove.newPoints[j],
            };
          }
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

    return result;
  }

  public analyze(side: number, depth: number): Move {
    return this.calculateEvaluation(side, 1, depth, this.virtualChessBoard, side, -10000, 10000).move;
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

  public getCurrentPieceSet(): PieceSet {
    let pieceSet = new PieceSet();

    this.virtualChessBoard.getAllPieces().forEach(piece => {
      pieceSet.addPiece(piece);
    });

    return pieceSet;
  }
}
