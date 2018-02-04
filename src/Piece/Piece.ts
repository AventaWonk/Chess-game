import ChessGame from '../ChessGame';
import VirtualChessboard from '../VirtualChessboard';
import {Coordinate} from '../Types/Coordinate';

export default abstract class Piece {
  // protected whiteImageLink: string;
  // protected blackImageLink: string;
  // protected weight: number = 0;
  private position: Coordinate;
  private side: number;
  protected notationIdentifier: String;
  protected virtualChessboardLink: VirtualChessboard

  constructor(side: number, position: Coordinate, virtualChessboardLink: VirtualChessboard) {
    this.side = side;
    this.position = position;
    this.virtualChessboardLink = virtualChessboardLink;
  }

  public abstract getMoves(): Coordinate[];
  public abstract getWeight(): number;
  protected abstract getWhiteImage(): string;
  protected abstract getBlackImage(): string;

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

  protected getVirtualChessboardLink() {
    return this.virtualChessboardLink;
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
