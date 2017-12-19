import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

class King extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteKing.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackKing.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    let vectorA: Coordinate = {
      i: coordinate.i,
      j: coordinate.j,
    };
    let vectorB: Coordinate = {
      i: coordinate.i,
      j: coordinate.j,
    };
    let vectorC: Coordinate = {
      i: coordinate.i,
      j: coordinate.j,
    };
    let vectorD: Coordinate = {
      i: coordinate.i,
      j: coordinate.j,
    };

    for (let i = 0; i < 3; i++) {
      if (vectorA.i != 0) {
        vectorA.i + i;
      } else {
        vectorA.i - i
      }
      if (!this.isOutOfBoard(vectorA)) {
        moves.push(vectorA);
      }

      if (vectorB.i != 0) {
        vectorB.j + i;
      } else {
        vectorB.j - i
      }
      if (!this.isOutOfBoard(vectorB)) {
        moves.push(vectorB);
      }

      if (vectorC.i != 0) {
        vectorC.i + i;
        vectorC.j + i;
      } else {
        vectorC.i - i
        vectorC.j + i;
      }
      if (!this.isOutOfBoard(vectorC)) {
        moves.push(vectorC);
      }
    }

    return moves;
  }
}
