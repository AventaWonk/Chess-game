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
}

export default class GUI extends React.Component<GUIProps, GUIState> {
  private player: number;
  private pieceSetup: IPiece[];
  private chessEngine: IChessEngine;
  private lastChessClockTime: number;

  constructor(props: GUIProps) {
    super(props)
    this.player = playerId.WHITE;
    this.pieceSetup = DEFAULT_PIECE_SETUP;
    this.chessEngine = new DEFAULT_CHESS_ENGINE();
    this.chessEngine.setUpPieces(this.pieceSetup);
    this.lastChessClockTime = null;
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleNewGameStart = this.handleNewGameStart.bind(this);
    this.handleGameSave = this.handleGameSave.bind(this);
    this.handleTimeLeft = this.handleTimeLeft.bind(this);
    this.handleMoveDone = this.handleMoveDone.bind(this);
    this.handleChessClockTimerTick = this.handleChessClockTimerTick.bind(this);
    this.state = {
      isGameOver: false,
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

  handleMoveDone(side: number) {
    let currentInitialTime = this.*[side ^ 1];

    this.setState({
      currentInitialTime: currentInitialTime,
    });
  }

  handleChessClockTimerTick(time: number) {
    this.lastChessClockTime = time;
  }

  render() {
    let bodyElement;


    return (
      <div>
        <div>
          <Chessboard side={this.player} pieces={this.pieceSetup} chessEngine={this.chessEngine}
          isHold={this.state.isGameOver} onGameOverEvent={this.handleGameOver}
          onMoveDoneEvent={this.handleMoveDone}/>
          <ChessClock isPaused={false} secondsLimit={15} latestTime={this.lastChessClockTime}
          onTimeLeftEvent={this.handleTimeLeft} onTimerTickEvent={this.handleChessClockTimerTick} />
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
