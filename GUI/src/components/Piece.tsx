import * as React from "react";
import {Point} from '../../../Interfaces/Point';

export interface PieceProps {
  width: number;
  imageLink: string;
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
    // this.props.selectPiece();
  }

  render() {
    if (this.state.isSelected) {

    }

    let style = {
      width: this.props.width + 'px',
      cursor: "pointer",
    }

    return (
      <img src={this.props.imageLink} style={style} onClick={this.handleClick}/>
    );
  }
}
