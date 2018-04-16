import {Point} from './Point';

export interface IPiece {
   getWeight(): number;
   getCode(): string;
   getImage(): string;
   getPosition(): Point;
   updatePosition(position: Point): void;
}
