import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Knight extends Piece {

  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteKnight.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackKnight.png";
  }

  getWeight() {
    return 1;
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();

    moves.push({
      x: currentPosition.x + 2,
      y: currentPosition.y + 1,
    });
    moves.push({
      x: currentPosition.x + 2,
      y: currentPosition.y - 1,
    });
    moves.push({
      x: currentPosition.x + 1,
      y: currentPosition.y + 2,
    });
    moves.push({
      x: currentPosition.x + 1,
      y: currentPosition.y - 2,
    });
    moves.push({
      x: currentPosition.x - 2,
      y: currentPosition.y + 1,
    });
    moves.push({
      x: currentPosition.x - 2,
      y: currentPosition.y - 1 ,
    });
    moves.push({
      x: currentPosition.x - 1,
      y: currentPosition.y + 2,
    });
    moves.push({
      x: currentPosition.x - 1,
      y: currentPosition.y - 2,
    });

    return this.getValidMoves(moves);
  }

  public getNotationIdentifer(): String {
    return "N";
  }
}
