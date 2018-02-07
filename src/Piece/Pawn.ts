import ChessGame from '../ChessGame';
import {Coordinate} from '../Types/Coordinate';
import Piece from "./Piece";

export default class Pawn extends Piece {
  private isFirstMove: boolean = true;

   getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }

  getWeight() {
    return 1;
  }

  public getMoves() {
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();
    let l: number;

    if (this.getSide() == ChessGame.WHTIE) {
      l = 1;
    } else {
      l = -1;
    }

    let piece = this.getVirtualChessboardLink().getPiece(currentPosition.x, currentPosition.y + l);
    if (!piece) {
      moves.push({
        x: currentPosition.x,
        y: currentPosition.y + l,
      });
    }

    piece = this.getVirtualChessboardLink().getPiece(currentPosition.x + 1, currentPosition.y + l);
    if (piece && piece.getSide() != this.getSide()) {
      moves.push({
        x: currentPosition.x + 1,
        y: currentPosition.y + l,
      });
    }

    piece = this.getVirtualChessboardLink().getPiece(currentPosition.x - 1, currentPosition.y + l);
    if (piece && piece.getSide() != this.getSide()) {
      moves.push({
        x: currentPosition.x - 1,
        y: currentPosition.y + l,
      });
    }

    if (this.isFirstMove) {
      moves.push({
        x: currentPosition.x,
        y: currentPosition.y + 2 * l,
      });
      delete this.isFirstMove;
    }

    // if (true) { // "En passant" flag
    //
    // }

    return moves;
  }
}
