import * as React from "react";
import {size, color, playerId, NOTATION_LETTERS} from '../defaults'
import Square from './Square';
// import {Point, BoardPoint} from '../types/Coordinate';
// import {Move} from '../types/Move';
// import {AbstractPiece, Bishop, King, Knight, Pawn, Queen, Rook} from '../types/Piece';

export interface ChessboardProps {
  side: number;
  pieces: any[];
}

interface ChessboardState {

}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  // private chessBoard: BoardPoint[][];
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private chessBoardElement: any[] = [];

  constructor(props: ChessboardProps) {
    super(props);

    if (props.side == playerId.BLACK) {
      let rowSquares: any[] = [];

      for (let i = 0; i < 8; i++) {
        rowSquares.push(
          <th>{i + 1}</th>
        );
        for (let j = 7; j > -1; j--) {
          rowSquares.push(
            <Square x={j} y={i - 1} color={this.getSquareColor(i, j)} size={this.squareSize} key={(i+1) * (j+64)}/>
          );
        }
        this.chessBoardElement.push(
          <tr key={i}>{rowSquares}</tr>
        );
        rowSquares = [];
      }

      rowSquares.push(
        <th></th>
      );
      for (let i = 7; i > -1; i--) {
        rowSquares.push(
          <th>{NOTATION_LETTERS[i]}</th>
        );
      }
      this.chessBoardElement.push(
        <tr key={99}>{rowSquares}</tr>
      );



    } else {
      for (let i = 7; i > -1; i--) {
        let rowSquares: any[] = [];

        for (let j = 0; j < 8; j++) {

          rowSquares.push(
            <Square x={j} y={i - 1} color={this.getSquareColor(i, j)} size={this.squareSize} key={(i+1) * (j+64)}/>
          );
        }
        this.chessBoardElement.push(
          <tr key={i}>{rowSquares}</tr>
        );
      }
    }
  }

  private getSquareColor(x: number, y: number): string {
    if (x % 2 != y % 2) {
      return this.whiteSquareColor;
    }

    return this.blackSquareColor;
  }

  render() {
    let tableStyle = {
      borderCollapse: "collapse",
    }

    return (
      <table style={tableStyle}>
        <tbody>
          {this.chessBoardElement}
        </tbody>
      </table>
    );
  }
}
