import * as React from "react";
import Chessboard from './Chessboard';
import ChessClock from './ChessClock';
import {playerId, DEFAULT_PIECE_SETUP, DEFAULT_CHESS_ENGINE} from '../../../Constants/defaults';
import {IChessEngine} from '../../../Interfaces/ChessEngine';
import {IPiece} from '../../../Interfaces/Piece';
import {PieceSet} from '../../../Engine/src/PieceSet';

interface GUIProps {

}

interface GUIState {
  isGameOver: boolean,
  playerIdMove: number,
}

export default class GUI extends React.Component<GUIProps, GUIState> {
  private player: number;
  private pieceSetup: IPiece[];
  private chessEngine: IChessEngine;

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
    this.handleMoveDone = this.handleMoveDone.bind(this);

    this.state = {
      isGameOver: false,
      playerIdMove: playerId.WHITE,
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

  handleMoveDone(side: number, onDoneEvent?: () => void) {
    this.setState({
      playerIdMove: side ^ 1,
    }, onDoneEvent)
  }

  render() {
    let bodyElement;

    let isWhitePlayerMove: boolean = this.state.playerIdMove == playerId.WHITE;

    return (
      <div>
        <div>
          <Chessboard side={this.player} pieces={this.pieceSetup} chessEngine={this.chessEngine}
          isHold={false} onGameOverEvent={this.handleGameOver}
          onMoveDoneEvent={this.handleMoveDone}/>
          <ChessClock isPaused={!isWhitePlayerMove} secondsLimit={15} onTimeLeftEvent={this.handleTimeLeft} />
          <ChessClock isPaused={isWhitePlayerMove} secondsLimit={15} onTimeLeftEvent={this.handleTimeLeft} />
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
