import * as React from "react";
import Chessboard from './Chessboard';
import {playerId, DEFAULT_PIECE_SETUP, DEFAULT_CHESS_ENGINE} from '../../../Constants/defaults';
import {IChessEngine} from '../../../Interfaces/ChessEngine';
import {IPiece} from '../../../Interfaces/Piece';

export interface GUIProps {}
interface GUIState {
  isGameOver: boolean,
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
    this.state = {
      isGameOver: false,
    }
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

  render() {
    let bodyElement;

    return (
      <div>
        <div>
          <Chessboard side={this.player} pieces={this.pieceSetup} chessEngine={this.chessEngine}
          isHold={this.state.isGameOver} onGameOverEvent={this.handleGameOver}/>
        </div>
        <div>
          <button onClick={this.handleNewGameStart}>
            Start a new game
          </button>
        </div>
      </div>
    );
  }
}
