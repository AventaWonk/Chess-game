import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Queen extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackQueen.png";
    this.notationIdentifier = 'Q';
  }

  public getMoves() {
    let moves: Coordinate[] = [];

    for (let x = 0; x < 8; x++) {
      let y1 = x - this.position.x + this.position.y; // 135 deg
      let y2 = this.position.x - x + this.position.y; // 45 deg

      if (y1 >= 0 && y1 <= 7 && x != this.position.x) {
        moves.push({
          x: x,
          y: y1
        });
      }
      if (y2 >= 0 && y2 <= 7 && x != this.position.x) {
        moves.push({
          x: x,
          y: y2
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != this.position.x) {
        moves.push({
          x: x,
          y: this.position.y
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != this.position.x) {
        moves.push({
          x: this.position.x,
          y: x
        });
      }
    }

    return moves;
  }
}
