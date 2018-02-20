import {Coordinate} from './Types/Coordinate';
import {Move, AvalibleMoves, EvaluatedMove} from './Types/Move';
import VirtualChessboard from './VirtualChessboard';
import {AbstractPiece} from './Piece';

interface Brunch {
  vcb: number[];
  side: number;
  move: Move;
  evaluation: number;
  childrens?: any[];
}

interface Result {
  move: Move;
  evaluation: number;
}

export default class ChessEngine {
  private side: number;
  private virtualChessBoard: VirtualChessboard;
  private onMoveDeterminedEvent: Function;

  constructor(onMoveDeterminedEvent: Function) {
    this.virtualChessBoard = new VirtualChessboard();
    this.onMoveDeterminedEvent = onMoveDeterminedEvent.bind(this);
  }

  private getAllAvalibleMoves(virtualChessBoard: VirtualChessboard, side: number): AvalibleMoves[] {
    let avalibleMoves: AvalibleMoves[] = [];
    let allPieces = virtualChessBoard.getAllPiecesBySide(side);

    for (let i = 0; i < allPieces.length; i++) {
      let currentPiece = allPieces[i];
      let avaliblePieceMoves = currentPiece.getMoves(virtualChessBoard);

      if (avaliblePieceMoves.length > 0) {
        avalibleMoves.push({
          currentPosition: currentPiece.getPosition(),
          newPoints: avaliblePieceMoves,
        });
      }
    }

    return avalibleMoves;
  }

  private evaluateMove(virtualChessboard: VirtualChessboard, oldCoordinate: Coordinate, newCoordinate: Coordinate): number {
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
      let avalibleRivalMoves = rivalPieces[i].getMoves(vcbCopy);

      for (let j = 0; j < avalibleRivalMoves.length; j++) {
        if (avalibleRivalMoves[j].x == newCoordinate.x && avalibleRivalMoves[j].y == newCoordinate.y) {
          evaluation -= currentPiece.getWeight();
          i = rivalPieces.length;
          j = avalibleRivalMoves.length;
        }
      }
    }

    // evaluate position
    if (newCoordinate.x > 2 && newCoordinate.x < 7) {
      evaluation += 2;
    }

    return evaluation;
  }

  private generateMoves (currentDepth: number, maxDepth: number, vcb: VirtualChessboard, side: number, alpha: number = 0, beta: number = 0): Brunch[] {
    let brunchs: Brunch[] = [];
    let moves = this.getAllAvalibleMoves(vcb, side);
    let alpha1 = 0;
    let beta1 = 0;

    if (!moves) {
      return null;
    }

    for (let i = 0; i < moves.length; i++) {
      let currenMove = moves[i];

      for (let k = 0; k < currenMove.newPoints.length; k++) {
        let currentNewPoint = currenMove.newPoints[k];
        let a = vcb.serialize();
        let newVcb = VirtualChessboard.unserialize(a);
        let evaluation = this.evaluateMove(newVcb, currenMove.currentPosition, currentNewPoint);
        newVcb.movePiece(newVcb.getPiece(currenMove.currentPosition.x, currenMove.currentPosition.y), currentNewPoint);

        let newBrunch = {
          vcb: newVcb.serialize(),
          side: side,
          move: {
            oldPosition: currenMove.currentPosition,
            newPosition: currentNewPoint,
          },
          evaluation: evaluation,
        }
        brunchs.push(newBrunch);
      }
    }

    // if (currentDepth < maxDepth * 2) {
    //   for (let i = 0; i < brunchs.length; i++) {
    //     // generate moves for each vcb
    //     brunchs[i].childrens = [];
    //     let currentVcb = VirtualChessboard.unserialize(brunchs[i].vcb);
    //     let generatedMoves = this.generateMoves(currentDepth + 1, maxDepth, currentVcb, side ^ 1, alpha1, beta1);
    //     brunchs[i].childrens.push(generatedMoves);
    //   }
    // }

    return brunchs;
  }

  private calculateEvaluation(currentDepth: number, maxDepth: number, vcb: VirtualChessboard, side: number, alpha: number, beta: number): number {
    let evaluation = 0;
    let bestEval = 0;
    let moves = this.getAllAvalibleMoves(vcb, side);

    if (!moves) {
      return 0;
    }

    for (let i = 0; i < moves.length; i++) {
      let currenMove = moves[i];

      for (let j = 0; j < currenMove.newPoints.length; j++) {
        let currentNewPoint = currenMove.newPoints[j];
        let vcbCopy = VirtualChessboard.unserialize(vcb.serialize());
        evaluation = this.evaluateMove(vcbCopy, currenMove.currentPosition, currentNewPoint);

        if (side != this.side) {
          evaluation = -evaluation;
        }

        if (currentDepth < maxDepth * 2) {
          vcbCopy.movePiece(vcbCopy.getPiece(currenMove.currentPosition.x, currenMove.currentPosition.y), currentNewPoint);
          evaluation += this.calculateEvaluation(currentDepth + 1, maxDepth, vcbCopy, side ^ 1, alpha, beta);
        }

        if ((side == this.side && evaluation > bestEval) || (side != this.side && evaluation < bestEval) ||  (i == 0 && j == 0)) {
          bestEval = evaluation;
        }

        if (side == this.side) {
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

  public analyze(depth: number): void {
    let movesTree = this.generateMoves(1, 1, this.virtualChessBoard, this.side);

    let max = -1000;
    let max_R;
    for (let i = 0; i < movesTree.length; i++) {
      let vcb = VirtualChessboard.unserialize(movesTree[i].vcb);
      let evaluation = this.calculateEvaluation(1, 2, vcb, this.side ^ 1, -10000, 10000);
      evaluation += movesTree[i].evaluation;

      if (evaluation > max) {
          max = evaluation;
          max_R = movesTree[i].move;
      }

    }

    this.onMoveDeterminedEvent(max_R);
  }

  public move(move: Move): void {
    let movablePiece = this.virtualChessBoard.getPiece(move.oldPosition.x, move.oldPosition.y);

    this.virtualChessBoard.movePiece(movablePiece, move.newPosition)
    this.virtualChessBoard.setPiece(movablePiece, move.newPosition.x, move.newPosition.y);
    this.virtualChessBoard.removePiece(move.oldPosition.x, move.oldPosition.y);
  }

  public setPlayer(side: number) {
    this.side = side;
  }

  public setUpPieces(picesSetup: AbstractPiece[]) {
    this.virtualChessBoard.setUpPieces(picesSetup);
  }

  public getVirtualChessboardLink() {
    return this.virtualChessBoard;
  }

  // private validateMove(oldCoordinate: Coordinate, newCoordinate: Coordinate): boolean {
  //   let movablePiece = this.virtualChessBoard.getPiece(oldCoordinate.x, oldCoordinate.y);
  //
  //   if (!movablePiece) {
  //     return false;
  //   }
  //
  //   if (movablePiece.getSide() != this.side) {
  //     return false;
  //   }
  //
  //   if ((newCoordinate.x > 7 || newCoordinate.y > 7) || (newCoordinate.x < 0 || newCoordinate.y < 0)) {
  //     return false;
  //   }
  //
  //   return true;
  // }
}
