import {Point} from '../../Interfaces/Point';
import {IPiece} from '../../Interfaces/Piece';
import {playerId} from '../../Constants/defaults';
import VirtualChessboard from './VirtualChessboard';

export abstract class AbstractPiece implements IPiece {
  private position: Point;
  private side: number;
  private _isFirstMove: boolean = true;
  protected notationIdentifier: String;

  constructor(side: number, position: Point) {
    this.side = side;
    this.position = position;
  }

  public abstract getMoves(virtualChessboardLink: VirtualChessboard): Point[];
  public abstract getWeight(): number;
  public abstract getCode(): string;
  protected abstract getWhiteImage(): string;
  protected abstract getBlackImage(): string;

  public static unserialize(number: number): AbstractPiece {
    let bits = number.toString(2);
    let side = parseInt(bits[1], 2);
    let firstMoveFlag = parseInt(bits[2], 2);
    let pieceCode = bits.substr(3, 3);
    let position = {
      x: parseInt(bits.substr(6, 3), 2),
      y: parseInt(bits.substr(9, 3), 2),
    }
    let piece;

    switch (pieceCode) {
      case "001":
        piece = new Pawn(side, position);
        break;

      case "111":
        piece = new Rook(side, position);
        break;

      case "011":
      piece = new Bishop(side, position);
        break;
    }

    if (!firstMoveFlag) {
      piece.setFirstMoveAsIsDone();
    }

    return piece;
  }

  public serialize(): number {
    let x = this.addZerro(this.position.x.toString(2), 3);
    let y = this.addZerro(this.position.y.toString(2), 3);

    return parseInt("1" + this.getSide().toString() + Number(this.isFirstMove).toString() + this.getCode() + x + y, 2); // Side|1 + First move flag|1 + Piece code|3
  }

  public getImage(): string {
    if (this.side == playerId.WHITE) {
      return this.getWhiteImage();
    }

    return this.getBlackImage();
  }

  public setFirstMoveAsIsDone() {
     this._isFirstMove = false;
  }

  public getSide(): number {
    return this.side;
  }

  public updatePosition(position: Point): void {
    this.position = position;
  }

  public getPosition(): Point {
    return this.position;
  }

  public getNotationIdentifer(): String {
    return this.notationIdentifier;
  }

  private addZerro(string: string, to: number): string {
    let newString = string;

    if (newString.length == to) {
      return newString;
    }

    while (newString.length < to) {
      newString = "0" + newString;
    }

    return newString;
  }

  protected get isFirstMove() {
    return this._isFirstMove;
  }

  protected isOutOfBoard(point: Point): boolean {
    return (point.x > 7 || point.y > 7) || (point.x < 0 || point.y < 0);
  }

  protected getValidMoves(points: Point[]): Point[] {
    let validMoves = [];

    for (let i = 0; i < points.length; i++) {
      if (!this.isOutOfBoard(points[i])) {
        validMoves.push(points[i]);
      }
    }

    return validMoves;
  }
}

export class Pawn extends AbstractPiece {
   getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhitePawn.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackPawn.png";
  }

  getWeight() {
    return 50;
  }

  getCode() {
    return "001";
  }

  public getMoves(virtualChessboardLink: VirtualChessboard) {
    let moves: Point[] = [];
    let currentPosition = this.getPosition();
    let l: number;

    if (this.getSide() == playerId.WHITE) {
      l = 1;
    } else {
      l = -1;
    }

    let piece = virtualChessboardLink.getPiece(currentPosition.x, currentPosition.y + l);
    if (!piece) {
      moves.push({
        x: currentPosition.x,
        y: currentPosition.y + l,
      });
    }

    piece = virtualChessboardLink.getPiece(currentPosition.x, currentPosition.y + 2 * l);
    if (this.isFirstMove  && !piece) {
      moves.push({
        x: currentPosition.x,
        y: currentPosition.y + 2 * l,
      });
    }

    piece = virtualChessboardLink.getPiece(currentPosition.x + 1, currentPosition.y + l);
    if (piece && piece.getSide() != this.getSide()) {
      moves.push({
        x: currentPosition.x + 1,
        y: currentPosition.y + l,
      });
    }

    piece = virtualChessboardLink.getPiece(currentPosition.x - 1, currentPosition.y + l);
    if (piece && piece.getSide() != this.getSide()) {
      moves.push({
        x: currentPosition.x - 1,
        y: currentPosition.y + l,
      });
    }

    // if (true) { // "En passant" flag
    //
    // }

    return moves;
  }
}

export class Bishop extends AbstractPiece {
  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteBishop.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackBishop.png";
  }

  getWeight() {
    return 300;
  }

  getCode() {
    return "011";
  }

  public getMoves(virtualChessboardLink: VirtualChessboard) {
    let currentPosition = this.getPosition();
    let pointsOnVector1: Point[] = [];
    let pointsOnVector2: Point[] = [];
    let vector1IsOpen = true;
    let vector2IsOpen = true;

    for (let x = 0; x < 8; x++) {
      if (vector1IsOpen) {
        let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
        let newCoordinate1 = {
          x: x,
          y: y1
        };

        if (y1 >= 0 && y1 <= 7 && currentPosition.x != x) {
          let pieceOnSquare = virtualChessboardLink.getPiece(newCoordinate1.x, newCoordinate1.y);

          if (pieceOnSquare && pieceOnSquare.getSide() == this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector1 = [];
            } else {
              vector1IsOpen = false;
            }
          } else if (pieceOnSquare && pieceOnSquare.getSide() != this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector1 = [];
              pointsOnVector1.push(newCoordinate1);
            } else {
              pointsOnVector1.push(newCoordinate1);
              vector1IsOpen = false;
            }
          } else {
            pointsOnVector1.push(newCoordinate1);
          }
        }
      }

      if (vector2IsOpen) {
        let y2 = currentPosition.x - x + currentPosition.y; // 45 deg
        let newCoordinate2 = {
          x: x,
          y: y2
        };

        if (y2 >= 0 && y2 <= 7 && currentPosition.x != x) {
          let pieceOnSquare = virtualChessboardLink.getPiece(newCoordinate2.x, newCoordinate2.y);

          if (pieceOnSquare && pieceOnSquare.getSide() == this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector2 = [];
            } else {
              vector2IsOpen = false;
            }
          } else if (pieceOnSquare && pieceOnSquare.getSide() != this.getSide()) {
            if (x <= currentPosition.x) {
              pointsOnVector2 = [];
              pointsOnVector2.push(newCoordinate2);
            } else {
              pointsOnVector2.push(newCoordinate2);
              vector2IsOpen = false;
            }
          } else {
            pointsOnVector2.push(newCoordinate2);
          }
        }
      }
    }

    return [].concat(pointsOnVector1, pointsOnVector2);
  }
}

export class King extends AbstractPiece {
  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteKing.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackKing.png";
  }

  getWeight() {
    return 10000;
  }

  getCode() {
    return "110";
  }

  public getMoves() {
    let moves: Point[] = [];
    let currentPosition = this.getPosition();

    for (let x = currentPosition.x - 1; x < currentPosition.x + 2; x++) {
      let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
      let y2 = currentPosition.x - x + currentPosition.y; // 45 deg

      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y1
        });
      }
      if (y2 >= 0 && y2 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y2
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: currentPosition.y
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: currentPosition.x,
          y: x
        });
      }
    }

    return moves;
  }
}

export class Queen extends AbstractPiece {
  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteQueen.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackQueen.png";
  }

  getWeight() {
    return 1;
  }

  getCode() {
    return "010";
  }

  public getMoves() {
    let moves: Point[] = [];
    let currentPosition = this.getPosition();

    for (let x = 0; x < 8; x++) {
      let y1 = x - currentPosition.x + currentPosition.y; // 135 deg
      let y2 = currentPosition.x - x + currentPosition.y; // 45 deg

      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y1
        });
      }
      if (y2 >= 0 && y2 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: y2
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: x,
          y: currentPosition.y
        });
      }
      if (y1 >= 0 && y1 <= 7 && x != currentPosition.x) {
        moves.push({
          x: currentPosition.x,
          y: x
        });
      }
    }

    return moves;
  }
}

export class Rook extends AbstractPiece {
  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteRook.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackRook.png";
  }

  getWeight() {
    return 1;
  }

  getCode() {
    return "111";
  }

  public getMoves() {
    let moves: Point[] = [];
    let currentPosition = this.getPosition();

    for (let x = 0; x < 8; x++) {
      if (x != currentPosition.x) {
        moves.push({
          x: x,
          y: currentPosition.y
        });
      }
      if (x != currentPosition.y) {
        moves.push({
          x: currentPosition.x,
          y: x
        });
      }
    }

    return moves;
  }
}

export class Knight extends AbstractPiece {
  getWhiteImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/WhiteKnight.png";
  }

  getBlackImage() {
    return "https://marcelk.net/chess/pieces/cburnett/80/BlackKnight.png";
  }

  getWeight() {
    return 1;
  }

  getCode() {
    return "100";
  }

  public getMoves() {
    let moves: Point[] = [];
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
