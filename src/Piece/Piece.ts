export default abstract class Piece {
  protected whiteImageLink: string;
  protected blackImageLink: string;
  protected side: number;

  constructor(side: number) {
    this.side = side;
  }

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
}
