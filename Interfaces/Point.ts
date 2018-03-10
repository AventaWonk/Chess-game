import {IPiece} from './Piece';

export interface Point {
  x: number;
  y: number;
}

export interface BoardPoint {
  piece: IPiece;
  squareLink: HTMLTableDataCellElement;
}
