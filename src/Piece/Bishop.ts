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
    if (coordinate.x + coordinate.y > 7) {
      i = 0;
      j = coordinate.x + coordinate.y;
    } else {
      i = coordinate.y - (7 - coordinate.x);
      j = 7;
    }

    let vectorA: Coordinate = {
      x: i,
      y: j,
    };

    if (coordinate.y > coordinate.x) {
      i = 0;
      j = coordinate.y - coordinate.x;
    } else {
      i = coordinate.x - coordinate.y;
      j = 0;
    }

    let vectorB: Coordinate = {
      x: i,
      y: j,
    };

    for (let i = 0; i < 8; i++) {
      moves.push({
        x: vectorA.x + i,
        y: vectorA.y - i,
      });

      moves.push({
        x: vectorB.x+ i,
        y: vectorB.y + i,
      });
    }

    return moves;
  }
}
