import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(side: number, position: Coordinate) {
    super(side, position);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
    this.notationIdentifier = '';
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let l: number = 1;

    if (this.side == 2) { // this.side == this.player
      l = -1;
    }

    moves.push({
      x: this.position.x + l,
      y: this.position.y,
    });
    moves.push({
      x: this.position.x + l,
      y: this.position.y + l,
    });
    moves.push({
      x: this.position.x + l,
      y: this.position.y - l,
    });


    return this.getValidMoves(moves);
  }
}
