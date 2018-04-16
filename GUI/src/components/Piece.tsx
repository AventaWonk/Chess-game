import * as React from "react";
import {Point} from '../../../../Interfaces/Point';

export interface PieceProps {
  position: Point;
  size: number;
  imageLink: string;
  onClick: (position: Point) => boolean;
  onPieceSelection?: Function;
  onPieceDeselection?: Function;
  borderColor: string;
}

interface PieceState {
  isSelected: boolean;
}

export default class Piece extends React.Component<PieceProps, PieceState> {

  constructor(props: PieceProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isSelected: false,
    }
  }

  handleClick() {
    let result = this.props.onClick(this.props.position);

    this.setState({
      isSelected: result,
    });
    // if (this.state.isSelected) {
    //   // unselect
    //
    //   this.setState({
    //     isSelected: false,
    //   });
    //   this.props.onPieceDeselection();
    // } else {
    //   // select piece
    //
    //   this.setState({
    //     isSelected: true,
    //   });
    //   this.props.onPieceSelection(this.props.position);
    // }
  }

  render() {
    let squareSize = 62;
    let imgSize = 40;

    let style: any = {
      width: this.props.size + 'px',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
      position: 'absolute',
      top: this.props.position.y * (squareSize) + (squareSize -2  - imgSize) + 'px',
      left: this.props.position.x * (squareSize) + (squareSize -2  - imgSize) + 'px',
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
