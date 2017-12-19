import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];
    let l: number = 1;

    if (this.side == 2) {
      l = -1;
    }

    let vectorA: Coordinate = {
      i: coordinate.i + l,
      j: coordinate.j,
    };
    let vectorB: Coordinate = {
      i: coordinate.i + l,
      j: coordinate.j + l,
    };
    let vectorC: Coordinate = {
      i: coordinate.i + l,
      j: coordinate.j - l,
    };

    if (!this.isOutOfBoard(vectorA)) {
      moves.push(vectorA);
    }

    if (!this.isOutOfBoard(vectorB)) {
      moves.push(vectorB);
    }

    if (!this.isOutOfBoard(vectorC)) {
      moves.push(vectorC);
    }

    return moves;
  }
}
