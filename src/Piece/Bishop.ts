import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Bishop extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteBishop.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackBishop.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    let i, j;
    if (coordinate.i + coordinate.j > 7) {
      i = 0;
      j = coordinate.i + coordinate.j;
    } else {
      i = coordinate.j - (7 - coordinate.i);
      j = 7;
    }

    let vectorA: Coordinate = {
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

    let vectorB: Coordinate = {
      i: i,
      j: j,
    };

    for (let i = 0; i < 8; i++) {
      moves.push({
        i: vectorA.i + i,
        j: vectorA.j - i,
      });

      moves.push({
        i: vectorB.i + i,
        j: vectorB.j + i,
      });
    }

    return moves;
  }
}
