import * as React from "react";
import {size, color} from '../../../Constants/defaults';
import {Point} from '../../../Interfaces/Point';

export interface SquareProps {
  x: number;
  y: number;
  color: string;
  size: number;
  isPieceSelected: boolean;
}

interface SquareState {

}

export default class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.isPieceSelected) {
      // do move
      let to: Point = {
        x: this.props.x,
        y: this.props.y,
      }
      this.props.doMove(from, to);
    }
  }

  render() {
    let style = {
      background: this.props.color,
      height: this.props.size + "px",
      width: this.props.size + "px",
    }

    return (
      <td style={style} >
        {this.props.children}
      </td>
    );
  }
}
