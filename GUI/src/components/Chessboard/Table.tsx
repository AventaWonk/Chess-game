import * as React from "react";
import Square from './Square';
import {playerId} from '../../../../Constants/defaults';
import {NOTATION_LETTERS} from '../../../../Constants/defaults';
import {Point} from '../../../../Interfaces/Point';
import {IPiece} from '../../../../Interfaces/Piece';
import {IChessEngine} from '../../../../Interfaces/ChessEngine';

const getArray = () => {
  let chessBoard: any[] = [];

  for (let i = 0; i < 8; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 8; j++) {
      chessBoard[i][j] = null;
    }
  }

  return chessBoard;
}

export interface TableProps {
  orientationForPlayer: number;
  isHold: boolean;
  squareSize: number;
  whiteSquareColor: string;
  blackSquareColor: string;
  highlightColor: string;
  highlightedSquares: boolean[][];
  onSquareClickEvent: (position: Point) => void;
}

interface TableState {}

export default class Table extends React.Component<TableProps, TableState> {

  constructor(props: TableProps) {
    super(props);
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  componentWillReceiveProps(nextProps: TableProps) {
    if (this.props.isHold != nextProps.isHold) {

    }
  }

  handleSquareClick(position: Point) {
    this.props.onSquareClickEvent(position);
  }

  getSquareColor(x: number, y: number): string {
    if (x % 2 != y % 2) {
      return this.props.whiteSquareColor;
    }

    return this.props.blackSquareColor;
  }

  getRowsAndColumns() {
    let chessBoardElement: any = [];
    for (let i = 7; i > -1; i--) {
      let rowSquares: any[] = [];

      for (let j = 0; j < 8; j++) {
        rowSquares.push(
          <Square coordinate={{x: j, y: i}} size={this.props.squareSize} isHighlighted={this.props.highlightedSquares[i][j]}
          color={this.getSquareColor(i, j)} highlightedColor={this.props.highlightColor}
          onClick={this.handleSquareClick} key={(i+1) * (j+64)}/>
        );
      }
      chessBoardElement.push(
        <tr key={i}>{rowSquares}</tr>
      );
    }
    return chessBoardElement;
  }

  render() {
    let pointerEvents = 'all';
    if (this.props.isHold) {
      pointerEvents = 'none';
    }

    let transform = '';
    if (this.props.orientationForPlayer == playerId.BLACK) {
      transform = 'rotate(180deg)';
    }

    let tableStyle = {
      borderCollapse: 'collapse',
      pointerEvents: pointerEvents,
      transform: transform,
    }

    let chessBoardElement = this.getRowsAndColumns();

    return (
      <table style={tableStyle}>
        <tbody>
          {chessBoardElement}
        </tbody>
      </table>
    );
  }
}
