import * as React from "react";
import {Point} from '../../../Interfaces/Point';

export interface PieceProps {
  position: Point;
  width: number;
  imageLink: string;
  onPieceSelection: Function;
}

interface PieceState {
  isSelected: boolean;
}

export default class Piece extends React.Component<PieceProps, PieceState> {

  constructor(props: PieceProps) {
    super(props);
    this.state = {
      isSelected: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isSelected: true,
    });

    // select piece
    this.props.onPieceSelection(this.props.position);
  }

  render() {
    if (this.state.isSelected) {

    }

    let style = {
      width: this.props.width + 'px',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
    }

    return (
      <img src={this.props.imageLink} style={style} onClick={this.handleClick}/>
    );
  }
}
