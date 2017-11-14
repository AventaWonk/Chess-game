import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];
    let l: number = 1;

    if (this.side == 2) {
      l = -1;
    }

    if (!this.isOutOfBoard(coordinate.i + l, coordinate.j) && !chessBoard[coordinate.i + l][coordinate.j]) {
      moves.push({
        i: coordinate.i + l,
        j: coordinate.j,
      });
    }

    if (chessBoard[coordinate.i + l][coordinate.j + l]) {
      moves.push({
        i: coordinate.i + l,
        j: coordinate.j + l,
      });
    }

    if (chessBoard[coordinate.i + l][coordinate.j - l]) {
      moves.push({
        i: coordinate.i + l,
        j: coordinate.j - l,
      });
    }

    return moves;
  }
}
