import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Rook extends Piece {

  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteRook.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackRook.png";
  }

  getWeight() {
    return 1;
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();

    for (let x = 0; x < 8; x++) {
      if (x != currentPosition.x) {
        moves.push({
          x: x,
          y: currentPosition.y
        });
      }
      if (x != currentPosition.y) {
        moves.push({
          x: currentPosition.x,
          y: x
        });
      }
    }

    return moves;
  }
}
