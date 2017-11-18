import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Queen extends Piece {
  constructor(side: number) {
    super(side);
    this.weight = 1;
    this.whiteImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
    this.blackImageLink = "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
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
    }
    let vectorC: Coordinate = {
      i: 0,
      j: coordinate.j,
    }
    let vectorD :Coordinate = {
      i: 0,
      j: coordinate.j,
    }

    for (let i = 0; i < 8; i++) {
      let newPoint: Coordinate = {
        i: vectorA.i,
        j: vectorA.j + i,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorA.i + i,
        j: vectorA.j,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorA.i + i,
        j: vectorA.j + i,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

      newPoint = {
        i: vectorA.i - i,
        j: vectorA.j + j,
      };

      if (!this.isOutOfBoard(newPoint)) {
        moves.push(newPoint);
      }

    return moves;
  }
}
