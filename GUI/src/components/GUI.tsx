import * as React from "react";
import Chessboard from './Chessboard';
import {playerId, DEFAULT_PIECE_SETUP, DEFAULT_CHESS_ENGINE} from '../../../Constants/defaults';
import {IChessEngine} from '../../../Interfaces/ChessEngine';
import {IPiece} from '../../../Interfaces/Piece';

export interface GUIProps {}
interface GUIState {}

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
  }

  render() {
    return (
      <div>
        <Chessboard side={this.player} pieces={this.pieceSetup} chessEngine={this.chessEngine}/>
      </div>
    );
  }
}
