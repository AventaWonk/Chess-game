import {AbstractPiece} from './Piece';

export class PieceSet {
  private pieces: AbstractPiece[] = [];

  constructor() {

  }

  public addPiece(piece: AbstractPiece): void {
    this.pieces.push(piece);
  }

  public deletePiece(index: number): void {
    this.pieces.splice(index, 1);
  }

  public serialize(): string {
    let serializedData = "";

    for (let i = 0; i < this.pieces.length; i++) {
      serializedData = serializedData + '*' + this.pieces[i].serialize();
    }

    return serializedData;
  }

  public static unserialize(serializedData: string): PieceSet {
    let pieceSet = new PieceSet();

    let pieceArray = serializedData.split('*');

    return pieceSet;
  }
}
