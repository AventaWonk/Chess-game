import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteKnight.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackKnight.png";
  }

  public getMoves() {
    let moves: Coordinate[] = [];

    moves.push({
      x: this.position.x + 2,
      y: this.position.y + 1,
    });
    moves.push({
      x: this.position.x + 2,
      y: this.position.y - 1,
    });
    moves.push({
      x: this.position.x + 1,
      y: this.position.y + 2,
    });
    moves.push({
      x: this.position.x + 1,
      y: this.position.y - 2,
    });
    moves.push({
      x: this.position.x - 2,
      y: this.position.y + 1,
    });
    moves.push({
      x: this.position.x - 2,
      y: this.position.y - 1 ,
    });
    moves.push({
      x: this.position.x - 1,
      y: this.position.y + 2,
    });
    moves.push({
      x: this.position.x - 1,
      y: this.position.y - 2,
    });

    return this.getValidMoves(moves);
  }
}
