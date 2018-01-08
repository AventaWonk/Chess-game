import Bishop from '../src/Piece/Bishop';
import VirtualChessboard from '../src/VirtualChessboard';

describe("Virtual chessboard class test", () => {
  let vcb = new VirtualChessboard();

  it("checks setPiece and getPiece methods", () => {
    let bishop = new Bishop(0);
    vcb.setPiece(0, 0, bishop);

    expect(vcb.getPiece(0, 0)).toEqual(bishop);
  });

  it("checks removePiece method", () => {
    vcb.removePiece(0, 0);

    expect(vcb.getPiece(0, 0)).toEqual(null);
  });

  /*
  / @TODO
  / it("checks setUpPieces method", () => {
  /
  / });
  */
});
