import * as React from "react";
import Piece from './Piece';
import Square from './Square';
import {size, color, playerId, NOTATION_LETTERS} from '../../../Constants/defaults';
import {Point} from '../../../Interfaces/Point';
import {IPiece} from '../../../Interfaces/Piece';
import {IChessEngine} from '../../../Interfaces/ChessEngine';

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
  chessEngine: IChessEngine;
  onGameOverEvent: Function;
  isHold: boolean;
}

interface ChessboardState {
  selectedPiecePosition: Point;
  pieceImages: string[][];
  highlightedSquares: boolean[][];
}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private selectedPieceBorderColor = color.DEFAULT_SELECTED_PIECE_BORDER_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private pieceSize = size.DEFAULT_IMAGE_SIZE;

  constructor(props: ChessboardProps) {
    super(props);
    this.handlePieceSelection = this.handlePieceSelection.bind(this);
    this.handlePieceDeselection = this.handlePieceDeselection.bind(this);
    this.handleMove = this.handleMove.bind(this);

    let highlightedSquares = generateChessboard();
    let pieceImages = generateChessboard();
    for (let i = 0; i < props.pieces.length; i++) {
      let currentPiece = props.pieces[i];
      let piecePosition = currentPiece.getPosition();
      pieceImages[piecePosition.x][piecePosition.y] = currentPiece.getImage();
    }

    this.state = {
      selectedPiecePosition: null,
      pieceImages: pieceImages,
      highlightedSquares: highlightedSquares,
    };
  }

  componentWillReceiveProps(nextProps: ChessboardProps) {
    if (this.props.isHold != nextProps.isHold) {
      let pieceImages = generateChessboard();
      for (let i = 0; i < this.props.pieces.length; i++) {
        let currentPiece = this.props.pieces[i];
        let piecePosition = currentPiece.getPosition();
        pieceImages[piecePosition.x][piecePosition.y] = currentPiece.getImage();
      }

      this.setState({
        selectedPiecePosition: null,
        pieceImages: pieceImages,
        highlightedSquares: generateChessboard(),
      });
    }
  }

  handlePieceSelection(point: Point) {
    let availableSquares = this.props.chessEngine.getAvailableMoves(point);

    let newHighlightedSquaresState: any = {...this.state.highlightedSquares};
    for (let i = 0; i < availableSquares.length; i++) {
      let currentPoint = availableSquares[i];
      newHighlightedSquaresState[currentPoint.x][currentPoint.y] = true;
    }

    this.setState({
      selectedPiecePosition: point,
      highlightedSquares: newHighlightedSquaresState,
    })
  }

  handlePieceDeselection() {
    let newHighlightedSquaresState = generateChessboard();

    this.setState({
      selectedPiecePosition: null,
      highlightedSquares: newHighlightedSquaresState,
    })
  }

  handleMove(from: Point, to: Point) {
    if (!this.state.highlightedSquares[to.x][to.y]) {
      return;
    }

    this.movePiece(from, to);
    this.props.chessEngine.move(from, to);
    let determinedMove = this.props.chessEngine.analyze(this.props.side ^ 1, 2);
    this.movePiece(determinedMove.oldPosition, determinedMove.newPosition);
    this.props.chessEngine.move(determinedMove.oldPosition, determinedMove.newPosition);
  }

  movePiece(from: Point, to: Point) {
    let newPieceImagesState: any = {...this.state.pieceImages};
    newPieceImagesState[to.x][to.y] = newPieceImagesState[from.x][from.y];
    newPieceImagesState[from.x][from.y] = null;

    let newHighlightedSquaresState = generateChessboard();

    this.setState({
      pieceImages: newPieceImagesState,
      selectedPiecePosition: null,
      highlightedSquares: newHighlightedSquaresState,
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
    // let i = 7;
    // let j = 0;
    // if (this.props.side == playerId.BLACK) {
    //   i = 0;
    //   j = 7;
    // }

    for (let i = 7; i > -1; i--) {
      let rowSquares: any[] = [];

      for (let j = 0; j < 8; j++) {
        let coordinate: Point = {
          x: j,
          y: i,
        }
        let pieceImage = this.state.pieceImages[j][i];
        let piece;

        if (pieceImage) {
          piece = <Piece position={coordinate} width={this.pieceSize} imageLink={pieceImage} onPieceSelection={this.handlePieceSelection}
                  onPieceDeselection={this.handlePieceDeselection} borderColor={this.selectedPieceBorderColor}/>
        }

        let squareColor = this.getSquareColor(i, j);
        if (this.state.highlightedSquares[j][i]) {
          squareColor = this.highlightColor;
        }

        rowSquares.push(
          <Square coordinate={coordinate} color={squareColor} size={this.squareSize} selectedPiecePosition={this.state.selectedPiecePosition}
          onMove={this.handleMove} key={(i+1) * (j+64)}>
            {piece}
          </Square>
        );
      }
      chessBoardElement.push(
        <tr key={i}>{rowSquares}</tr>
      );
    }

    let pointerEvents = 'all';
    if (this.props.isHold) {
      pointerEvents = 'none';
    }

    let tableStyle = {
      borderCollapse: 'collapse',
      pointerEvents: pointerEvents,
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
