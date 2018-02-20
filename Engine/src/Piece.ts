import ChessGame from './ChessGame';
import VirtualChessboard from './VirtualChessboard';
import {Coordinate} from './Types/Coordinate';

export abstract class AbstractPiece {
  private position: Coordinate;
  private side: number;
  private _isFirstMove: boolean = true;
  protected notationIdentifier: String;

  constructor(side: number, position: Coordinate) {
    this.side = side;
    this.position = position;
  }

  public abstract getMoves(virtualChessboardLink: VirtualChessboard): Coordinate[];
  public abstract getWeight(): number;
  public abstract getCode(): string;
  protected abstract getWhiteImage(): string;
  protected abstract getBlackImage(): string;

  public static unserialize(number: number): AbstractPiece {
    let byte = number.toString(2);
    let side = parseInt(byte[1], 2);
    let firstMoveFlag = parseInt(byte[2], 2);
    let piceCode = byte.substr(3, 3);
    let piece;

    switch (piceCode) {
      case "001":
        piece = new Pawn(side, {x: 0, y: 0});
        break;

      case "111":
        piece = new Rook(side, {x: 0, y: 0});
        break;

      case "011":
      piece = new Bishop(side, {x: 0, y: 0});
        break;
    }

    if (!firstMoveFlag) {
      piece.setFirstMoveAsIsDone();
    }

    return piece;
  }

  public serialize() {
    return parseInt("1" + this.getSide().toString() + Number(this.isFirstMove).toString() + this.getCode(), 2); // Side|1 + First move flag|1 + Piece code|3
  }

  public getImage(imageSize: string): HTMLImageElement {
    let img = document.createElement("img");

    if (this.side == ChessGame.WHTIE) {
      img.src = this.getWhiteImage();
    } else {
      img.src = this.getBlackImage();
    }
    img.style.height = imageSize + "px";

    return img;
  }

  public setFirstMoveAsIsDone() {
     this._isFirstMove = false;
  }

  public getSide(): number {
    return this.side;
  }

  public updatePosition(position: Coordinate): void {
    this.position = position;
  }

  public getPosition(): Coordinate {
    return this.position;
  }

  public getNotationIdentifer(): String {
    return this.notationIdentifier;
  }

  protected get isFirstMove() {
    return this._isFirstMove;
  }

  protected isOutOfBoard(point: Coordinate): boolean {
    return (point.x > 7 || point.y > 7) || (point.x < 0 || point.y < 0);
  }

  protected getValidMoves(points: Coordinate[]): Coordinate[] {
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
    let moves: Coordinate[] = [];
    let currentPosition = this.getPosition();
    let l: number;

    if (this.getSide() == ChessGame.WHTIE) {
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
    let pointsOnVector1: Coordinate[] = [];
    let pointsOnVector2: Coordinate[] = [];
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

    return [].concat(pointsOnVector1, pointsOnVector2);;
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
    let moves: Coordinate[] = [];
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
    let moves: Coordinate[] = [];
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
    let moves: Coordinate[] = [];
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
