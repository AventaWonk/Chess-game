import {Move} from './Move';
import {IPiece} from './Piece';
import {Point} from './Point';

export interface IChessEngine {
  setUpPieces(picesSetup: IPiece[]): void;
  analyze(side: number, depth: number): Move;
  move(from: Point, to: Point): void;
  getAvalibleMoves(position: Point): Point[];
}
