interface BoardPoint {
  piece: any;
  squareLink: HTMLElement;
}

export default class ChessGame {
  private static SQUARE_SIZE = "60";
  private static WHITE_SQUARE_COLOR = "#ffccb3";
  private static BLACK_SQUARE_COLOR = "#af6744";
  // public static PLAYER_WHTIE = 1;
  // public static PLAYER_BLACK = 2;
  private chessBoard: BoardPoint[][] = Array(8);

  constructor() {
    this.chessBoard = [[],[],[],[],[],[],[],[]];
    this.onBoardClickCallback = this.onBoardClickCallback.bind(this);
  }

  private onBoardClickCallback(e: Event) {
    let i = parseInt((e.target as HTMLElement).dataset.i, 10);
    let j = parseInt((e.target as HTMLElement).dataset.j, 10);

    if (i != NaN && j != NaN) {
      //
    }
  }

  private getSquareColor(i: number, j: number) {
    if ((i % 2) != 0) {
      if ((j % 2) != 0) {
        return ChessGame.WHITE_SQUARE_COLOR;
      } else {
        return ChessGame.BLACK_SQUARE_COLOR;
      }
    } else {
      if ((j % 2) == 0) {
        return ChessGame.WHITE_SQUARE_COLOR;
      } else {
        return ChessGame.BLACK_SQUARE_COLOR;
      }
    }
  }

  private setUpPieceOnSquare(boardPoint: BoardPoint, piece: any) {
    if (boardPoint.piece) {
      boardPoint.squareLink.removeChild(boardPoint.squareLink.lastChild);
    }
    boardPoint.squareLink.appendChild(piece.getImage());
    boardPoint.piece = piece;
  }

  private setUpPiecesOnBoard(a: any) {
    for (let i = 0; i < a.length; i++) {

    }
  }

  public createChessBoard() {
    let boardElement = document.createElement("table");
    boardElement.setAttribute("style", "border-collapse:collapse;");

    for (let i = 0; i < 8; i++) {
      let line = document.createElement("tr");

        for (let j = 0; j < 8; j++) {
            let square = document.createElement("td");
            square.dataset.i = i.toString();
            square.dataset.j = j.toString();
            let color = this.getSquareColor(i, j);

            square.style.height = ChessGame.SQUARE_SIZE + "px";
            square.style.width = ChessGame.SQUARE_SIZE + "px";
            square.style.background = color;

            line.appendChild(square);
            this.chessBoard[i][j] = {
              piece: 0,
              squareLink: square,
            }
        }
        boardElement.appendChild(line);
    }

    boardElement.addEventListener("click", this.onBoardClickCallback);
    return boardElement;
  }
}
