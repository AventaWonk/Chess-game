import * as React from "react";
import {size, color, playerId,} from '../../../../Constants/defaults';
import {Point} from '../../../../Interfaces/Point';
import {IPiece} from '../../../../Interfaces/Piece';
import {IChessEngine} from '../../../../Interfaces/ChessEngine';
import Table from './Table';
import Square from './Square';

export interface ChessboardProps {
  orientationForPlayer: number;
  highlightedSquares: boolean[][];
  isHold: boolean;
  squareSize: number;
  whiteSquareColor: string;
  blackSquareColor: string;
  highlightColor: string;
  onSquareClickEvent: (position: Point) => void;
}

interface ChessboardState {

}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  constructor(props: ChessboardProps) {
    super(props);
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(position: Point) {
    this.props.onSquareClickEvent(position);
  }

  render() {

    return (
      <React.Fragment>
        <Table orientationForPlayer={this.props.orientationForPlayer} isHold={this.props.isHold}
        squareSize={this.props.squareSize} whiteSquareColor={this.props.whiteSquareColor} blackSquareColor={this.props.blackSquareColor}
        highlightColor={this.props.highlightColor} highlightedSquares={this.props.highlightedSquares} onSquareClickEvent={this.handleSquareClick}/>
      </React.Fragment>
    );
  }
}
