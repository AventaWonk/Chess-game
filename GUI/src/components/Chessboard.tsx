import * as React from "react";
import Piece from './Piece';
import Square from './Square';
import {size, color, playerId, NOTATION_LETTERS} from '../../../Constants/defaults';
import {Point} from '../../../Interfaces/Point';
import {IPiece} from '../../../Interfaces/Piece';

const generateChessboard = () => {
  let chessBoard: any[] = [];

  for (let i = 0; i < 8; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 8; j++) {
      chessBoard[i][j] = null;
    }
  }

  return chessBoard;
}

// const generateChessboardElement = (side: number) => {
//   let chessBoard = [];
//
//   if (side == playerId.BLACK) {
//     let rowSquares: any[] = [];
//
//     for (let i = 0; i < 8; i++) {
//       rowSquares.push(
//         <th>{i + 1}</th>
//       );
//       for (let j = 7; j > -1; j--) {
//         rowSquares.push(
//           <Square x={j} y={i - 1} color={this.getSquareColor(i, j)} size={size.DEFAULT_SQUARE_SIZE} isPieceSelected={false} key={(i+1) * (j+64)}/>
//         );
//       }
//       chessBoard.push(
//         <tr key={i}>{rowSquares}</tr>
//       );
//       rowSquares = [];
//     }
//
//     rowSquares.push(
//       <th></th>
//     );
//     for (let i = 7; i > -1; i--) {
//       rowSquares.push(
//         <th>{NOTATION_LETTERS[i]}</th>
//       );
//     }
//     chessBoard.push(
//       <tr key={99}>{rowSquares}</tr>
//     );
//   } else {
//     for (let i = 7; i > -1; i--) {
//       let rowSquares: any[] = [];
//
//       for (let j = 0; j < 8; j++) {
//
//         rowSquares.push(
//           <Square x={j} y={i - 1} color={this.getSquareColor(i, j)} size={size.DEFAULT_SQUARE_SIZE} isPieceSelected={false} key={(i+1) * (j+64)}/>
//         );
//       }
//       chessBoard.push(
//         <tr key={i}>{rowSquares}</tr>
//       );
//     }
//   }
//
//   return chessBoard;
// }

export interface ChessboardProps {
  side: number;
  pieces: IPiece[];
}

interface ChessboardState {
  pieceImages: string[];
}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private pieceSize = size.DEFAULT_IMAGE_SIZE;

  constructor(props: ChessboardProps) {
    super(props);
    // let chessBoardElement = generateChessboardElement(props.side);

    let pieceImages = generateChessboard();
    for (let i = 0; i < props.pieces.length; i++) {
      let currentPiece = props.pieces[i];
      let piecePosition = currentPiece.getPosition();
      let pieceImage = currentPiece.getImage();
      pieceImages[piecePosition.x][piecePosition.y] = currentPiece.getImage();
    }

    this.state = {
      pieceImages: pieceImages,
    };
  }

  doMove(from: Point, to: Point) {
    let newChessboardState: any = {...this.state.pieceImages};
    newChessboardState[to.x][to.y] = newChessboardState[from.x][from.y];
    newChessboardState[from.x][from.y] = null;

    this.setState({
      pieceImages: newChessboardState,
    });
  }

  getSquareColor(x: number, y: number): string {
    if (x % 2 != y % 2) {
      return this.whiteSquareColor;
    }

    return this.blackSquareColor;
  }

  render() {
    let chessBoardElement: any = [];
    for (let i = 7; i > -1; i--) {
      let rowSquares: any[] = [];

      for (let j = 0; j < 8; j++) {
        let pieceImage = this.state.pieceImages[i][j];
        let piece;

        if (pieceImage) {
          piece = <Piece width={this.pieceSize} imageLink={pieceImage}/>
        }

        rowSquares.push(
          <Square x={j} y={i - 1} color={this.getSquareColor(i, j)} size={this.squareSize} isPieceSelected={false} key={(i+1) * (j+64)}>
            {piece}
          </Square>
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
