import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteKnight.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackKnight.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    moves.push({
      i: coordinate.i + 2,
      j: coordinate.j + 1,
    });
    moves.push({
      i: coordinate.i + 2,
      j: coordinate.j - 1,
    });
    moves.push({
      i: coordinate.i + 1,
      j: coordinate.j + 2,
    });
    moves.push({
      i: coordinate.i + 1,
      j: coordinate.j - 2,
    });
    moves.push({
      i: coordinate.i - 2,
      j: coordinate.j + 1,
    });
    moves.push({
      i: coordinate.i - 2,
      j: coordinate.j - 1 ,
    });
    moves.push({
      i: coordinate.i - 1,
      j: coordinate.j + 2,
    });
    moves.push({
      i: coordinate.i - 1,
      j: coordinate.j - 2,
    });

    return this.getValidMoves(moves);
  }
}
