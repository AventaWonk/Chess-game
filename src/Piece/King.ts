import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class King extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteKing.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackKing.png";
  }

  public getMoves() {
    let moves: Coordinate[] = [];

    let vectorA: Coordinate = {
      x: this.position.x,
      y: this.position.y,
    };
    let vectorB: Coordinate = {
      x: this.position.x,
      y: this.position.y,
    };
    let vectorC: Coordinate = {
      x: this.position.x,
      y: this.position.y,
    };
    let vectorD: Coordinate = {
      x: this.position.x,
      y: this.position.y,
    };

    for (let i = 0; i < 3; i++) {
      if (vectorA.x != 0) {
        vectorA.x + i;
      } else {
        vectorA.x - i
      }
      moves.push(vectorA);


      if (vectorB.x != 0) {
        vectorB.y + i;
      } else {
        vectorB.y - i
      }
      moves.push(vectorB);

      if (vectorC.x != 0) {
        vectorC.x + i;
        vectorC.y + i;
      } else {
        vectorC.x - i
        vectorC.y + i;
      }
      moves.push(vectorC);
    }

    return this.getValidMoves(moves);
  }
}
