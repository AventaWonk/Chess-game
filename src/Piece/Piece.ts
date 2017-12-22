import {Coordinate} from '../Types/Coordinate';

export default abstract class Piece {
  protected whiteImageLink: string;
  protected blackImageLink: string;
  protected weight: number = 0;
  protected side: number;

  constructor(side: number) {
    this.side = side;
  }

  public abstract getMoves(coordinate: Coordinate, chessBoard: any): Coordinate[];

  public getImage(imageSize: string): HTMLImageElement {
    let img = document.createElement("img");

    if (this.side == 1) {
      img.src = this.whiteImageLink;
    } else {
      img.src = this.blackImageLink;
    }
    img.style.height = imageSize + "px";

    return img;
  }

  public getSide() {
    return this.side;
  }

  public getWeight() {
    return this.weight;
  }

  protected isOutOfBoard(point: Coordinate): boolean {
    return (point.i > 7 || point.j > 7) || (point.i < 0 || point.j < 0);
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
