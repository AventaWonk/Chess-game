import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Queen extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackQueen.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    let vectorA: Coordinate = {
      i: coordinate.i,
      j: 0,
    };
    let vectorB: Coordinate = {
      i: 0,
      j: coordinate.j,
    };

    let i, j;
    if (coordinate.i + coordinate.j > 7) {
      i = 0;
      j = coordinate.i + coordinate.j;
    } else {
      i = coordinate.j - (7 - coordinate.i);
      j = 7;
    }

    let vectorC: Coordinate = {
      i: i,
      j: j,
    };

    if (coordinate.j > coordinate.i) {
      i = 0;
      j = coordinate.j - coordinate.i;
    } else {
      i = coordinate.i - coordinate.j;
      j = 0;
    }

    let vectorD: Coordinate = {
      i: i,
      j: j,
    };

    for (let i = 0; i < 8; i++) {
      let newPoint: Coordinate = {
        i: vectorA.i,
        j: vectorA.j + i,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorB.i + i,
        j: vectorB.j,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorC.i + i,
        j: vectorC.j - i,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorD.i + i,
        j: vectorD.j + i,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }
    }

    return moves;
  }
}
