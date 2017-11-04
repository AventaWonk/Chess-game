import Piece from './Piece/Piece';
import Pawn from './Piece/Pawn';


interface Coordinate {
  i: number;
  j: number;
}

interface virtualBoardPoint {
  piece: Piece;
  coordinate: Coordinate;
}

interface virtualMove {
  piece: Piece;
  oldCoordinate: Coordinate;
  newCoordinates: Coordinate[];
}

export default class ChessEngine {
  private player: number;
  private chessBoard: Piece[][] = Array(8);
  private callback: Function;

  constructor(player: any, picesSetup: virtualBoardPoint[], callback: Function) {
    this.player = player;
    this.chessBoard = [[],[],[],[],[],[],[],[]];
    this.callback = callback;

    for (let i = 0; i < picesSetup.length; i++) {
      let currentPiceSetup = picesSetup[i];
      this.chessBoard[currentPiceSetup.coordinate.i][currentPiceSetup.coordinate.j] = currentPiceSetup.piece;
    }
  }

  public analize() {
    let moves: virtualMove[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.chessBoard[i][j] && this.chessBoard[i][j].getSide() != this.player) {
          moves.push({
            piece: this.chessBoard[i][j],
            oldCoordinate: {i: i,j: j},
            newCoordinates: this.chessBoard[i][j].getMoves({i: i,j: j}, this.chessBoard)
          });
        }
      }
    }

    return moves;
  }

  public move(coordinate1: Coordinate, coordinate2: Coordinate): any {
    let movedPiece = this.chessBoard[coordinate1.i][coordinate1.j];
    let targePiece = this.chessBoard[coordinate2.i][coordinate2.j];

    this.chessBoard[coordinate2.i][coordinate2.j] = this.chessBoard[coordinate1.i][coordinate1.j];
    this.chessBoard[coordinate1.i][coordinate1.j] = null;

    let avalibleMoves = this.analize();
    this.callback(avalibleMoves[0].oldCoordinate, avalibleMoves[0].newCoordinates[0])
  }

  public position() {
    // fo
  }

  public go() {
    // fo
  }

  public stop() {

  }
}
