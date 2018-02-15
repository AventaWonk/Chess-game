import {Coordinate} from './Types/Coordinate';
import {Move, AvalibleMoves, EvaluatedMove} from './Types/Move';
import VirtualChessboard from './VirtualChessboard';
import {AbstractPiece} from './Piece';

interface Brunch {
  vcb: number[];
  move: Move;
  evaluation: number;
  childrens?: any[];
}

export default class ChessEngine {
  private player: number;
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

      avalibleMoves.push({
        currentPosition: currentPiece.getPosition(),
        newPoints: avaliblePieceMoves,
      });
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
    virtualChessboard.setPiece(currentPiece, newCoordinate.x, newCoordinate.y)
    virtualChessboard.removePiece(oldCoordinate.x, oldCoordinate.y);

    let rivalPieces = virtualChessboard.getAllPiecesBySide(this.player ^ 1);
    for (let i = 0; i < rivalPieces.length; i++) {
      let avalibleRivalMoves = rivalPieces[i].getMoves(virtualChessboard);

      for (let j = 0; j < avalibleRivalMoves.length; j++) {
        if (avalibleRivalMoves[j].x == newCoordinate.x && avalibleRivalMoves[j].y ==newCoordinate.y) {
          evaluation -= currentPiece.getWeight();
          i = rivalPieces.length;
          j = avalibleRivalMoves.length;
        }
      }
    }

    // undo move
    virtualChessboard.setPiece(currentPiece, oldCoordinate.x, oldCoordinate.y)
    virtualChessboard.removePiece(newCoordinate.x, newCoordinate.y);

    // evaluate position
    if (newCoordinate.x > 2 && newCoordinate.x < 7) {
      evaluation += 2;
    }

    return evaluation;
  }

  private generateMoves (currentDepth: number, maxDepth: number, vcb: VirtualChessboard, side: number): Brunch[] {
    let brunchs: Brunch[] = [];
    let moves = this.getAllAvalibleMoves(vcb, side);

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
          move: {
            oldPosition: currenMove.currentPosition,
            newPosition: currentNewPoint,
          },
          evaluation: evaluation,
        }
        brunchs.push(newBrunch);
      }
    }

    if (currentDepth < maxDepth * 2) {
      for (let i = 0; i < brunchs.length; i++) {
        // generate moves for each vcb
        brunchs[i].childrens = [];
        let currentVcb = VirtualChessboard.unserialize(brunchs[i].vcb);
        let generatedMoves = this.generateMoves(currentDepth + 1, maxDepth, currentVcb, side ^ 1);
        brunchs[i].childrens.push(generatedMoves);
      }
    }

    return brunchs;
  }

  public analyze(depth: number): void {
    let movesTree = this.generateMoves(1, 3, this.virtualChessBoard, this.player);


    let getArraySum = function(movesTree: Brunch[]): number[] {
      let results = [];

      for (let i = 0; i < movesTree.length; i++) {
        let currentBrunch = movesTree[i];
        results.push(analyzeTree(movesTree));
      }
      return results;
    }

    let analyzeTree = function(movesTree: Brunch[]) {
      let results = [];
      let sum = 0;

      for (let i = 0; i < movesTree.length; i++) {
        let currentBrunch = movesTree[i];

        if (currentBrunch.childrens) {
          for (let j = 0; j < currentBrunch.childrens.length; j++) {
            sum +=  analyzeTree(currentBrunch.childrens[j]) as number;
            // results[i] +=  results[i].concat(analyzeTree(currentBrunch.childrens[j]));
          }
          return sum;
        }

        sum += currentBrunch.evaluation;
      }
      return sum;
    }

    console.log(getArraySum(movesTree));


    // if (!lastSelectedMove) {
    //   throw new Error("");
    // }
    //

    // this.onMoveDeterminedEvent(lastSelectedMove);
  }

  public move(move: Move): void {
    let movablePiece = this.virtualChessBoard.getPiece(move.oldPosition.x, move.oldPosition.y);

    this.virtualChessBoard.movePiece(movablePiece, move.newPosition)
    this.virtualChessBoard.setPiece(movablePiece, move.newPosition.x, move.newPosition.y);
    this.virtualChessBoard.removePiece(move.oldPosition.x, move.oldPosition.y);
  }

  public setPlayer(player: number) {
    this.player = player;
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
  //   if (movablePiece.getSide() != this.player) {
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
