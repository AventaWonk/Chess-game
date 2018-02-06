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
    let currentPosition = this.getPosition();
    let vcb = this.getVirtualChessboardLink();
    let pointsOnVector1: Coordinate[] = [];
    let pointsOnVector2: Coordinate[] = [];
    let vector1IsOpen = true;
    let vector2IsOpen = true;

    for (let x = 0; x < 8; x++) {
      if (vector1IsOpen) {
        let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
        let newCoordinate1 = {
          x: x,
          y: y1
        };

        if (y1 >= 0 && y1 <= 7 && currentPosition.x != x) {
          let pieceOnSquare = vcb.getPiece(newCoordinate1.x, newCoordinate1.y);

          if (pieceOnSquare && pieceOnSquare.getSide() == this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector1 = [];
            } else {
              vector1IsOpen = false;
            }
          } else if (pieceOnSquare && pieceOnSquare.getSide() != this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector1 = [];
              pointsOnVector1.push(newCoordinate1);
            } else {
              pointsOnVector1.push(newCoordinate1);
              vector1IsOpen = false;
            }
          } else {
            pointsOnVector1.push(newCoordinate1);
          }
        }
      }

      if (vector2IsOpen) {
        let y2 = currentPosition.x - x + currentPosition.y; // 45 deg
        let newCoordinate2 = {
          x: x,
          y: y2
        };

        if (y2 >= 0 && y2 <= 7 && currentPosition.x != x) {
          let pieceOnSquare = vcb.getPiece(newCoordinate2.x, newCoordinate2.y);

          if (pieceOnSquare && pieceOnSquare.getSide() == this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector2 = [];
            } else {
              vector2IsOpen = false;
            }
          } else if (pieceOnSquare && pieceOnSquare.getSide() != this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector2 = [];
              pointsOnVector2.push(newCoordinate2);
            } else {
              pointsOnVector2.push(newCoordinate2);
              vector2IsOpen = false;
            }
          } else {
            pointsOnVector2.push(newCoordinate2);
          }
        }
      }
    }

    return [].concat(pointsOnVector1, pointsOnVector2);;
  }
}
