import * as React from "react";
import {size, color} from '../defaults'
import Square from './Square';
// import {Point, BoardPoint} from '../types/Coordinate';
// import {Move} from '../types/Move';
// import {AbstractPiece, Bishop, King, Knight, Pawn, Queen, Rook} from '../types/Piece';

export interface ChessboardProps {

}

interface ChessboardState {

}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  // private chessBoard: BoardPoint[][];
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private notationLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  constructor(props: ChessboardProps) {
    super(props);
  }

  private getSquareColor(x: number, y: number): string {
    if (x % 2 == y % 2) {
      return this.whiteSquareColor;
    }

    return this.blackSquareColor;
  }

  render() {
    let chessBoardElement = [];

    for (let i = 7; i > -1; i--) {
      let rowSquares: any[] = [];

      for (let j = 0; j < 8; j++) {
        let squareColor = this.getSquareColor(i, j);

        rowSquares.push(
          <Square x={j} y={i - 1} color={squareColor} size={this.squareSize} key={(i+1) * (j+64)}/>
        );
      }
      chessBoardElement.push(
        <tr key={i}>{rowSquares}</tr>
      );
    }
    let tableStyle = {
      borderCollapse: "collapse",
    }

    return (
      <table style={tableStyle}>
        <tbody>
          {chessBoardElement}
        </tbody>
      </table>
    );
  }
}
