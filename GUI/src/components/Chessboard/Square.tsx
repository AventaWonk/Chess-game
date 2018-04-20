import * as React from "react";
import {Point} from '../../../../Interfaces/Point';

export interface SquareProps {
  coordinate: Point;
  isHighlighted: boolean,
  highlightedColor: string;
  color: string;
  size: number;
  onClick: (position: Point) => void
}

interface SquareState {}

export default class Square extends React.Component<SquareProps, SquareState> {
  constructor(props: SquareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.coordinate);
  }

  render() {
    let backgroundColor;
    if (this.props.isHighlighted) {
      backgroundColor = this.props.highlightedColor;
    } else {
      backgroundColor = this.props.color;
    }

    let style = {
      background: backgroundColor,
      height: this.props.size + "px",
      width: this.props.size + "px",
    }

    return (
      <td style={style} onClick={this.handleClick}>
      </td>
    );
  }
}
