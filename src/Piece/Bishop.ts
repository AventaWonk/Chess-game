import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Bishop extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteBishop.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackBishop.png";
  }

  public getMoves() {
    let moves: Coordinate[] = [];

    let i, j;
    if (this.position.x + this.position.y > 7) {
      i = 0;
      j = this.position.x + this.position.y;
    } else {
      i = this.position.y - (7 - this.position.x);
      j = 7;
    }

    let vectorA: Coordinate = {
      x: i,
      y: j,
    };

    if (this.position.y > this.position.x) {
      i = 0;
      j = this.position.y - this.position.x;
    } else {
      i = this.position.x - this.position.y;
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
