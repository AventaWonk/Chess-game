import * as React from "react";
import {size, color} from '../../../Constants/defaults';
import {Point} from '../../../Interfaces/Point';
// import {AbstractPiece, Bishop, King, Knight, Pawn, Queen, Rook} from '../types/Piece';

export interface PieceProps {
  image: string;
}

interface PieceState {
  isSelected: boolean;
}

export default class Piece extends React.Component<PieceProps, PieceState> {

  constructor(props: PieceProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isSelected: true,
    });
    // select piece
  }

  render() {
    let style = {

    }
    if (this.state.isSelected) {

    }

    return (
      <img src={this.props.image} style={style} onClick={this.handleClick}/>
    );
  }
}
