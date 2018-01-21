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

    let vectorA: Coordinate = {
      x: this.position.x,
      y: 0,
    };
    let vectorB: Coordinate = {
      x: 0,
      y: this.position.y,
    };

    for (let i = 0; i < 8; i++) {
      moves.push({
        x: vectorA.x,
        y: vectorA.y + i,
      });
      moves.push({
        x: vectorB.x + i,
        y: vectorB.y,
      });
    }

    return this.getValidMoves(moves);
  }
}
