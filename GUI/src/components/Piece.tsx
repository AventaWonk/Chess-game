import * as React from "react";
import {Point} from '../../../Interfaces/Point';

export interface PieceProps {
  position: Point;
  width: number;
  imageLink: string;
  onPieceSelection: Function;
  onPieceDeselection: Function;
  borderColor: string;
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
    if (this.state.isSelected) {
      // unselect

      this.setState({
        isSelected: false,
      });
      this.props.onPieceDeselection();
    } else {
      // select piece

      this.setState({
        isSelected: true,
      });
      this.props.onPieceSelection(this.props.position);
    }
  }

  render() {
    let style: any = {
      width: this.props.width + 'px',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
    }

    if (this.state.isSelected) {
      style.border = `3px solid ${this.props.borderColor}`;
      style.borderRadius = "10px";
    }

    return (
      <img src={this.props.imageLink} style={style} onClick={this.handleClick}/>
    );
  }
}
