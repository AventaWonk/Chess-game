import {Coordinate} from '../src/Types/Coordinate';
import {PiecesSetup} from '../src/Types/PiecesSetup';
import Piece from '../src/Piece/Piece';
import Bishop from '../src/Piece/Bishop';
import King from '../src/Piece/King';
import Knight from '../src/Piece/Knight';
import Pawn from '../src/Piece/Pawn';
import Queen from '../src/Piece/Queen';
import Rook from '../src/Piece/Rook';
import VirtualChessboard from '../src/VirtualChessboard';

describe("Chess pieces classes test", () => {
  let vcb = new VirtualChessboard();
  let bishop = new Bishop(0);
  let king = new King(0);
  let knight = new Knight(0);
  let pawn = new Pawn(0);
  let queen = new Queen(0);
  let rook = new Rook(0);
  let piecesSetUp: PiecesSetup[] = [
    {
      piece: bishop,
      coordinate: {
        x: 1,
        y: 1
      }
    },
    {
      piece: king,
      coordinate: {
        x: 2,
        y: 2
      }
    },
    {
      piece: knight,
      coordinate: {
        x: 3,
        y: 3
      }
    },
    {
      piece: pawn,
      coordinate: {
        x: 4,
        y: 4
      }
    },
    {
      piece: queen,
      coordinate: {
        x: 5,
        y: 5
      }
    },
    {
      piece: rook,
      coordinate: {
        x: 6,
        y: 6
      }
    },
  ];
  vcb.setUpPieces(piecesSetUp);

  it("checks Bishop piece", () => {
    expect(bishop.getMoves()).toEqual([
      {
        x: 1,
        y: 1
      }
    ]);
  });
});
