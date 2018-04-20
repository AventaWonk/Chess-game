import * as React from "react";
import {Point} from '../../../Interfaces/Point';
import {playerId} from '../../../Constants/defaults';

export interface PieceProps {
  position: Point;
  size: number;
  imageLink: string;
  orientationForPlayer: number;
  squareSize: number;
  imgSize: number;
  onClick: (position: Point, isSelected: boolean) => void;
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
    this.props.onClick(this.props.position, this.state.isSelected);

    this.setState((state) => ({isSelected : !state.isSelected}));
  }

  render() {
    let left, top;

    if (this.props.orientationForPlayer == playerId.BLACK) {
      left = (7 - this.props.position.x) * (this.props.squareSize + 2) + (this.props.squareSize - this.props.imgSize)
      top = this.props.position.y * (this.props.squareSize + 2) + (this.props.squareSize - this.props.imgSize);
    } else {
      left = this.props.position.x * (this.props.squareSize + 2) + (this.props.squareSize - this.props.imgSize);
      top = (7 - this.props.position.y) * (this.props.squareSize + 2) + (this.props.squareSize - this.props.imgSize);
    }

    let style: any = {
      zIndex: 5,
      width: this.props.size + 'px',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
      position: 'absolute',
      top: top + 'px',
      left: left + 'px',
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
