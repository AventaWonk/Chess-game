import * as React from "react";
import Chessboard from './Chessboard/index';
import ChessClock from './ChessClock';
import Piece from './Piece';
import {playerId, color, size, DEFAULT_PIECE_SETUP, DEFAULT_CHESS_ENGINE} from '../../../Constants/defaults';
import {IChessEngine} from '../../../Interfaces/ChessEngine';
import {IPiece} from '../../../Interfaces/Piece';
import {PieceSet} from '../../../Engine/src/PieceSet';
import {Point} from '../../../Interfaces/Point';

const generate2dArray = function <T>(): T[][] {
  let array2D: T[][] = [];

  for (let i = 0; i < 8; i++) {
    array2D[i] = [];
    for (let j = 0; j < 8; j++) {
      array2D[i][j] = null;
    }
  }

  return array2D;
}

interface GUIProps {

}

interface GUIState {
  isGameOver: boolean,
  playerIdMove: number,
  highlightedSquares: boolean[][];
  pieces: IPiece[]
}

export default class GUI extends React.Component<GUIProps, GUIState> {
  private player: number;
  private pieceSetup: IPiece[];
  private chessEngine: IChessEngine;
  private selectedPiece: IPiece = null;
  private whiteSquareColor = color.DEFAULT_WHITE_SQUARE_COLOR;
  private blackSquareColor = color.DEFAULT_BLACK_SQUARE_COLOR;
  private highlightColor = color.DEFAULT_HIGHLIGHTED_SQUARE_COLOR;
  private selectedPieceBorderColor = color.DEFAULT_SELECTED_PIECE_BORDER_COLOR;
  private squareSize = size.DEFAULT_SQUARE_SIZE;
  private pieceSize = size.DEFAULT_IMAGE_SIZE;

  constructor(props: GUIProps) {
    super(props)
    this.player = playerId.WHITE;
    this.pieceSetup = DEFAULT_PIECE_SETUP;
    this.chessEngine = new DEFAULT_CHESS_ENGINE();
    this.chessEngine.setUpPieces(this.pieceSetup);

    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleNewGameStart = this.handleNewGameStart.bind(this);
    this.handleGameSave = this.handleGameSave.bind(this);
    this.handleTimeLeft = this.handleTimeLeft.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);

    this.state = {
      isGameOver: false,
      playerIdMove: playerId.WHITE,
      pieces: [...this.pieceSetup],
      highlightedSquares: generate2dArray(),
    }
  }

  handleGameSave() {

  }

  handleNewGameStart() {
    this.setState({
      isGameOver: true,
    });
  }

  handleGameOver() {
    this.setState({
      isGameOver: true,
    });
  }

  handleTimeLeft() {
    this.setState({
      isGameOver: true,
    })
  }

  // handleSquareClick(side: number, onDoneEvent?: () => void) {
  //   this.setState({
  //     playerIdMove: side ^ 1,
  //   }, onDoneEvent)
  // }

  handleSquareClick(position: Point) {
    if (!this.selectedPiece) {
      return;
    }

    // if (!this.state.highlightedSquares[position.x][position.y]) {
    //   return;
    // }

    let pieces = [...this.state.pieces];
    for (let i = 0; i < pieces.length; i++) {

      if (pieces[i] == this.selectedPiece) {
        pieces[i].updatePosition(position)
        this.setState({
          pieces: pieces,
          playerIdMove: this.state.playerIdMove ^ 1
        })
        break;
      }
    }
  }

  handlePieceClick(position: Point, isSelected: boolean) {
    if (isSelected) {
      this.selectedPiece = null;
      this.setState({
        highlightedSquares: generate2dArray(),
      })
      return;
    }

    let piece = this.getPieceByPosition(position);

    // if (this.selectedPiece ) {
    //   // tryToDoMove()
    //   this.setState({
    //     highlightedSquares: generate2dArray(),
    //   })
    //   return;
    // }

    let availablePointsForMove = this.chessEngine.getAvailableMoves(position);
    let highlightedSquares = this.getHighlightedSquaresByPoints(availablePointsForMove);
    this.selectedPiece = piece;
    this.setState({
      highlightedSquares: highlightedSquares,
    })
  }

  doMove() {

  }

  getPieceByPosition(position: Point): IPiece {
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
    let array2D = generate2dArray<boolean>();

    for (let i = 0; i < pointsArray.length; i++) {
      let x = pointsArray[i].x;
      let y = pointsArray[i].y;
      array2D[x][y] = true;
    }

    return array2D;
  }

  render() {
    let isWhitePlayerMove: boolean = this.state.playerIdMove == playerId.WHITE;

    let pieces = this.state.pieces.map((piece) =>
      <Piece position={piece.getPosition()} size={this.pieceSize} imageLink={piece.getImage()}
      orientationForPlayer={this.state.playerIdMove}
      squareSize={this.squareSize} imgSize={this.pieceSize} onClick={this.handlePieceClick}
      borderColor={color.DEFAULT_SELECTED_PIECE_BORDER_COLOR}/>
    );

    return (
      <div>
        <div>
          {pieces}
          <Chessboard orientationForPlayer={this.state.playerIdMove} highlightedSquares={this.state.highlightedSquares}
          isHold={false} squareSize={this.squareSize} whiteSquareColor={this.whiteSquareColor}
          blackSquareColor={this.blackSquareColor} highlightColor={this.highlightColor} onSquareClickEvent={this.handleSquareClick}/>
        </div>
        <div>
          <button onClick={this.handleNewGameStart}>
            Start a new game
          </button>
          <button onClick={this.handleGameSave}>
            Save game
          </button>
        </div>
      </div>
    );
  }
}
