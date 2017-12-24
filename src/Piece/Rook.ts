import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Rook extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteRook.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/BlackRook.png";
  }

  public getMoves(coordinate: Coordinate, chessBoard: any) {
    let moves: Coordinate[] = [];

    let vectorA: Coordinate = {
      i: coordinate.i,
      j: 0,
    };
    let vectorB: Coordinate = {
      i: 0,
      j: coordinate.j,
    };

    for (let i = 0; i < 8; i++) {
      moves.push({
        i: vectorA.i,
        j: vectorA.j + i,
      });
      moves.push({
        i: vectorB.i + i,
        j: vectorB.j,
      });
    }

    return this.getValidMoves(moves);
  }
}
