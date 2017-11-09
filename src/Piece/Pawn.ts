import Piece from "./Piece";

interface Coordinate {
  i: number;
  j: number;
}

export default class Pawn extends Piece {
  constructor(side: number) {
    super(side);
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    if (!this.isOutOfBoard(coordinate.i + 1, coordinate.j) && !chessBoard[coordinate.i + 1][coordinate.j]) {
      moves.push({
        i: coordinate.i + 1,
        j: coordinate.j,
      });
    }

    if (chessBoard[coordinate.i + 1][coordinate.j + 1]) {
      moves.push({
        i: coordinate.i + 1,
        j: coordinate.j + 1,
      });
    }

    if (chessBoard[coordinate.i + 1][coordinate.j + 1]) {
      moves.push({
        i: coordinate.i - 1,
        j: coordinate.j + 1,
      });
    }

    return moves;
  }
}
