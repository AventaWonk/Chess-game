interface Coordinate {
  i: number;
  j: number;
}

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

  protected isOutOfBoard(i: number, j: number): boolean {
    return (i > 7 || j > 7) || (i < 0 || j < 0);
  }
}
