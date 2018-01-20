import {Coordinate} from '../src/Types/Coordinate';
import Piece from '../src/Piece/Piece';
import Bishop from '../src/Piece/Bishop';
import VirtualChessboard from '../src/VirtualChessboard';

describe("Virtual chessboard class test", () => {
  let vcb = new VirtualChessboard();

  it("checks setPiece and getPiece methods", () => {
    let bishop = new Bishop(0, {
      x: 0,
      y: 0
    });
    vcb.addPiece(bishop);

    expect(vcb.getPiece(0, 0)).toEqual(bishop);
  });

  it("checks removePiece method", () => {
    vcb.removePiece(0, 0);

    expect(vcb.getPiece(0, 0)).toEqual(null);
  });

  it("checks setUpPieces method", () => {
    let bishop1 = new Bishop(0, {
      x: 1,
      y: 1
    });
    let bishop2 = new Bishop(1, {
      x: 2,
      y: 2
    });
    let piecesSetUp: Piece[] = [
      bishop1,
      bishop2
    ];
    vcb.setUpPieces(piecesSetUp);

    expect(vcb.getPiece(1, 1)).toEqual(bishop1);
    expect(vcb.getPiece(2, 2)).toEqual(bishop2);
  });

  it("checks getAllPieces method", () => {
    let bishop1 = new Bishop(0, {
      x: 1,
      y: 1
    });
    let bishop2 = new Bishop(1, {
      x: 2,
      y: 2
    });
    let piecesSetUp: Piece[] = [
      bishop1,
      bishop2
    ];
    vcb.setUpPieces(piecesSetUp);

    expect(vcb.getAllPieces()).toEqual([
      bishop1,
      bishop2
    ]);
  });

});
