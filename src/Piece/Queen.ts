import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Queen extends Piece {

  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackQueen.png";
  }

  getWeight() {
    return 1;
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();

    for (let x = 0; x < 8; x++) {
      let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
      let y2 = currentPosition.x - x + currentPosition.y; // 45 deg

      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y1
        });
      }
      if (y2 >= 0 && y2 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y2
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: currentPosition.y
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: currentPosition.x,
          y: x
        });
      }
    }

    return moves;
  }
}
