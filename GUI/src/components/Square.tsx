import * as React from "react";
import {size, color} from '../../../Constants/defaults';
import {Point} from '../../../Interfaces/Point';

export interface SquareProps {
  coordinate: Point;
  color: string;
  size: number;
  selectedPiecePosition: Point;
  onMove: Function;
}

interface SquareState {

}

export default class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.selectedPiecePosition) {
      // do move
      this.props.onMove(this.props.selectedPiecePosition, this.props.coordinate);
    }
  }

  render() {
    let style = {
      background: this.props.color,
      height: this.props.size + "px",
      width: this.props.size + "px",
    }

    return (
      <td style={style} onClick={this.handleClick}>
        {this.props.children}
      </td>
    );
  }
}
