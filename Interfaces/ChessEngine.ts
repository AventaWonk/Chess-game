import {Move} from './Move';
import {IPiece} from './Piece';
import {Point} from './Point';
import {PieceSet} from '../Engine/src/PieceSet';

export interface IChessEngine {
  setUpPieces(piecesSetup: IPiece[]): void;
  analyze(side: number, depth: number): Move;
  analyzeByTime(side: number, time: number): Move;
  move(from: Point, to: Point): void;
  getAvailableMoves(position: Point): Point[];
  getCurrentPieceSet(): PieceSet;
}
