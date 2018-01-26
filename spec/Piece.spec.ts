import {Coordinate} from '../src/Types/Coordinate';
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
  let bishop = new Bishop(0, {
    x: 0,
    y: 0
  });
  let king = new King(0, {
    x: 1,
    y: 1
  });
  let knight = new Knight(0, {
    x: 2,
    y: 2
  });
  let pawn = new Pawn(0, {
    x: 3,
    y: 3
  });
  let queen = new Queen(0, {
    x: 4,
    y: 4
  });
  let rook = new Rook(0, {
    x: 5,
    y: 5
  });
  let piecesSetUp: Piece[] = [
    bishop,
    king,
    knight,
    pawn,
    queen,
    rook
  ];
  vcb.setUpPieces(piecesSetUp);

  it("checks Bishop piece", () => {
    expect(bishop.getMoves()).toEqual([
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 5
      },
      {
        x: 6,
        y: 6
      },
      {
        x: 7,
        y: 7
      },
    ]);
  });

  it("checks King piece", () => {
    expect(king.getMoves()).toEqual([
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: 2
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 2,
        y: 0
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 1,
        y: 2
      }
    ]);
  });
});
