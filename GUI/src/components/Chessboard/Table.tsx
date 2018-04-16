import * as React from "react";
import Square from './Square';
import {size, color, playerId, NOTATION_LETTERS} from '../../../../Constants/defaults';
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
  highlightedSquares: boolean[][];
  onSquareClickEvent: (position: Point) => void;
}

interface TableState {

}

export default class Table extends React.Component<TableProps, TableState> {
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private selectedPieceBorderColor = color.DEFAULT_SELECTED_PIECE_BORDER_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private pieceSize = size.DEFAULT_IMAGE_SIZE;

  constructor(props: TableProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps: TableProps) {
    if (this.props.isHold != nextProps.isHold) {

    }
  }

  handleClick(position: Point) {
    this.props.onSquareClickEvent(position);
  }

  getSquareColor(x: number, y: number): string {
    if (x % 2 != y % 2) {
      return this.whiteSquareColor;
    }

    return this.blackSquareColor;
  }

  getRowsAndColumns() {
    let chessBoardElement: any = [];
    for (let i = 7; i > -1; i--) {
      let rowSquares: any[] = [];

      for (let j = 0; j < 8; j++) {
        rowSquares.push(
          <Square coordinate={{x: j, y: i}} size={this.squareSize} isHighlighted={this.props.highlightedSquares[i][j]}
          color={this.getSquareColor(i, j)} highlightedColor={this.highlightColor}
          onClick={this.handleClick} key={(i+1) * (j+64)}/>
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

    let tableStyle = {
      borderCollapse: 'collapse',
      pointerEvents: pointerEvents,
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
