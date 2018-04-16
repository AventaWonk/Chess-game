import * as React from "react";
import {size, color, playerId, NOTATION_LETTERS} from '../../../../Constants/defaults';
import {Point} from '../../../../Interfaces/Point';
import {IPiece} from '../../../../Interfaces/Piece';
import {IChessEngine} from '../../../../Interfaces/ChessEngine';
import Table from './Table';
import Square from './Square';
import Piece from './Piece';

const generateArray2D = () => {
  let array2D: any[] = [];

  for (let i = 0; i < 8; i++) {
    array2D[i] = [];
    for (let j = 0; j < 8; j++) {
      array2D[i][j] = null;
    }
  }

  return array2D;
}

export interface ChessboardProps {
  side: number;
  pieces: IPiece[];
  isHold: boolean;
  chessEngine: IChessEngine;
  onMoveDoneEvent: (side: number, onDoneEvent?: () => void) => void;
  onGameOverEvent: Function;
}

interface ChessboardState {
  highlightedSquares: boolean[][];
  pieces: IPiece[]
}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
  private selectedPiece: IPiece;

  constructor(props: ChessboardProps) {
    super(props);
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this);
    this.state = {
      pieces: [...this.props.pieces],
      highlightedSquares: generateArray2D(),
    }
  }

  handleSquareClick(position: Point) {
    if (this.selectedPiece) {
      let pieces = [...this.state.pieces];

      for (let i = 0; i < pieces.length; i++) {

        if (pieces[i] == this.selectedPiece) {
          pieces[i].updatePosition(position)
          this.setState({
            pieces: pieces,
          })
          break;
        }
      }
    }
  }

  handlePieceClick(position: Point) {
    let piece = this.getPieceByPosition(position);

    if (this.selectedPiece ) {
      return;
    }

    let availablePointsForMove = this.props.chessEngine.getAvailableMoves(position);
    let highlightedSquares = this.getHighlightedSquaresByPoints(availablePointsForMove);

    this.setState({
      highlightedSquares: highlightedSquares,
    })

    return true;
  }

  getPieceByPosition(position: Point): IPiece{
    let currentPiece: IPiece;

    for (let i = 0; i < this.state.pieces.length; i++) {
      let piecePosition = this.state.pieces[i].getPosition();

      if (piecePosition.x == position.x && piecePosition.y == position.y) {
        currentPiece = this.state.pieces[i];
      }
    }

    return currentPiece;
  }

  getHighlightedSquaresByPoints(pointsArray: Point[]): boolean[][] {
    let array2D = generateArray2D();

    for (let i = 0; i < pointsArray.length; i++) {
      let x = pointsArray[i].x;
      let y = pointsArray[i].y;
      array2D[x][y] = true;
    }

    return array2D;
  }

  render() {
    let pieces = this.props.pieces.map((piece) =>
      <Piece position={piece.getPosition()} size={size.DEFAULT_IMAGE_SIZE} imageLink={piece.getImage()}
      onClick={this.handlePieceClick} borderColor={color.DEFAULT_SELECTED_PIECE_BORDER_COLOR}/>
    );

    return (
      <React.Fragment>
        {pieces}
        <Table orientationForPlayer={0} isHold={false} highlightedSquares={this.state.highlightedSquares}
        onSquareClickEvent={this.handleSquareClick}/>
      </React.Fragment>
    );
  }
}
