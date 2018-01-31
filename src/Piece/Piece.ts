import {Coordinate} from '../Types/Coordinate';

export default abstract class Piece {
  protected whiteImageLink: string;
  protected blackImageLink: string;
  protected position: Coordinate;
  protected weight: number = 0;
  protected side: number;


  constructor(side: number, position: Coordinate) {
    this.side = side;
    this.position = position;
  }

  public abstract getMoves(): Coordinate[];

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

  public getSide(): number {
    return this.side;
  }

  public getWeight(): number {
    return this.weight;
  }

  public updatePosition(position: Coordinate): void {
    this.position = position;
  }

  public getPosition(): Coordinate {
    return this.position;
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
