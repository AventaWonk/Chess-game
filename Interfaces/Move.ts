import {Point} from './Point';

export interface Move {
  oldPosition: Point;
  newPosition: Point;
}

export interface AvalibleMoves {
  currentPosition: Point;
  newPoints: Point[];
}
