import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Rook extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteRook.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackRook.png";
  }

  public getMoves() {
    let moves: Coordinate[] = [];

    for (let x = 0; x < 8; x++) {
      if (x != this.position.x) {
        moves.push({
          x: x,
          y: this.position.y
        });
      }
      if (x != this.position.y) {
        moves.push({
          x: this.position.x,
          y: x
        });
      }
    }

    return moves;
  }
}
