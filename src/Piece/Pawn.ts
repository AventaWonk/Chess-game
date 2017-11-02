import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(side: number) {
    super(side);
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }
}
