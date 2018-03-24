import {Bishop, King, Knight, Pawn, Queen, Rook} from '../Engine/src/Piece';
import {IPiece} from '../Interfaces/Piece';
import ChessEngine from '../Engine/src/ChessEngine';

export const playerId = {
  WHITE: 0,
  BLACK: 1,
};
export const color = {
   DEFAULT_WHITE_SQUARE_COLOR: '#ffccb3',
   DEFAULT_BLACK_SQUARE_COLOR: '#af6744',
   DEFAULT_HIGHLIGHTED_SQUARE_COLOR: '#8a7e78',
   DEFAULT_SELECTED_PIECE_BORDER_COLOR: '#8a7e78',
};
export const size = {
  DEFAULT_SQUARE_SIZE: 60,
  DEFAULT_IMAGE_SIZE: 40,
};
export const NOTATION_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const DEFAULT_CHESS_ENGINE = ChessEngine;

let getDefaultPieceSetup = () => {
  let pieceSetup: IPiece[] = [];

  for (let i = 0; i < 8; i++) {
    pieceSetup.push(
      new Pawn(playerId.WHITE, {
        x: i,
        y: 1
      })
    );
    pieceSetup.push(
      new Pawn(playerId.BLACK, {
        x: i,
        y: 6
      })
    );
  }

  return pieceSetup;
}
export const DEFAULT_PIECE_SETUP: IPiece[] = getDefaultPieceSetup();
