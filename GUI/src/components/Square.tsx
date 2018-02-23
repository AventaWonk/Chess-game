import * as React from "react";
import {size, color} from '../defaults'
import {Point} from '../types/Point';
// import {AbstractPiece, Bishop, King, Knight, Pawn, Queen, Rook} from '../types/Piece';

export interface SquareProps {
  // position: Point,
  x: number,
  y: number,
  color: string,
  size: number,
}

interface SquareState {

}

export default class Square extends React.Component<SquareProps, SquareState> {
  // public position;
  public color: string;
  public size: number;

  constructor(props: Square) {
    super(props);
  }

  render() {
    let image = "";
    let style = {
      background: this.props.color,
      height: this.props.size + "px",
      width: this.props.size + "px",
    }

    return (
      <td style={style} >
        {image}
      </td>
    );
  }
}
