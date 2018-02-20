import {Coordinate} from './Coordinate';

export interface Move {
  oldPosition: Coordinate;
  newPosition: Coordinate;
}

export interface AvalibleMoves {
  currentPosition: Coordinate;
  newPoints: Coordinate[];
}

export interface EvaluatedMove {
  evaluation: number;
  move: Move;
}
