import * as React from "react";
import Chessboard from './Chessboard';
import {DEFAULT_PIECE_SETUP} from '../../../Constants/defaults';

export interface GUIProps {}
interface GUIState {}

export default class GUI extends React.Component<GUIProps, GUIState> {

  render() {
    return (
      <div>
        <Chessboard side={1} pieces={DEFAULT_PIECE_SETUP}/>
      </div>
    );
  }
}
