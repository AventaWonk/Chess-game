import * as React from "react";
import Chessboard from './Chessboard';
import {DEFAULT_PIECE_SETUP, DEFAULT_CHESS_ENGINE} from '../../../Constants/defaults';
import {IChessEngine} from '../../../Interfaces/ChessEngine';

export interface GUIProps {}
interface GUIState {}

export default class GUI extends React.Component<GUIProps, GUIState> {
  private chessEngine: IChessEngine;

  constructor(props: GUIProps) {
    super(props)
    this.chessEngine = new DEFAULT_CHESS_ENGINE();
  }

  render() {
    return (
      <div>
        <Chessboard side={1} pieces={DEFAULT_PIECE_SETUP}/>
      </div>
    );
  }
}
