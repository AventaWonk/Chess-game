import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Bishop extends Piece {

  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteBishop.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackBishop.png";
  }

  getWeight() {
    return 1;
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();
    let vcb = this.getVirtualChessboardLink();
    let pointsOnVector1: Coordinate[] = [];
    let pointsOnVector2: Coordinate[] = [];
    let vector1IsOpen = true;
    let vector2IsOpen = true;

    for (let x = 0; x < 8; x++) {
      let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
      let y2 = currentPosition.x - x + currentPosition.y; // 45 deg
      let newCoordinate1 = {
        x: x,
        y: y1
      };
      let newCoordinate2 = {
        x: x,
        y: y2
      };

      if (y1 >= 0 && y1 <= 7 && vector1IsOpen && vcb.getPiece(newCoordinate1.x, newCoordinate1.y) && newCoordinate1 != currentPosition) {
        if (x < currentPosition.x) {
          pointsOnVector1 = [];
        } else {
          vector1IsOpen = false;
        }
      } else {
        pointsOnVector1.push(newCoordinate1);
      }

      if (y2 >= 0 && y2 <= 7 && vector2IsOpen && vcb.getPiece(newCoordinate2.x, newCoordinate2.y) && newCoordinate2 != currentPosition) {
        if (x < currentPosition.x) {
          pointsOnVector2 = [];
        } else {
          vector2IsOpen = false;
        }
      } else {
        pointsOnVector2.push(newCoordinate1);
      }
    }

    return moves;
  }
}
