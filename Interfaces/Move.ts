import {Point} from './Point';

export interface Move {
  oldPosition: Point;
  newPosition: Point;
}

export interface AvailableMoves {
  currentPosition: Point;
  newPoints: Point[];
}
