import {Coordinate} from './Coordinate';

export interface VirtualMove {
  position: Coordinate;
  newPoints: Coordinate[];
}
