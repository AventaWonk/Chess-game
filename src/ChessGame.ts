import Piece from './Piece/Piece';
import Pawn from './Piece/Pawn';

interface Coordinate {
  i: number;
  j: number;
}

interface virtualBoardPoint {
  piece: any;
  coordinate: Coordinate;
}

interface BoardPoint {
  piece: Piece;
  squareLink: HTMLElement;
}

export default class ChessGame {
  // public static PLAYER_WHTIE = 1;
  // public static PLAYER_BLACK = 2;
  private static SQUARE_SIZE = "60";
  private static IMAGE_SIZE = "40";
  private static WHITE_SQUARE_COLOR = "#ffccb3";
  private static BLACK_SQUARE_COLOR = "#af6744";
  private selectedPiece: virtualBoardPoint = null;
  private chessBoard: BoardPoint[][] = Array(8);
  private chessBoardElement: HTMLElement;

  constructor() {
    this.chessBoard = [[],[],[],[],[],[],[],[]];
    this.onBoardClickCallback = this.onBoardClickCallback.bind(this);
    this.chessBoardElement = this.createChessBoardElement();
    let piecesSetup = [
      {
        piece: new Pawn(),
        coordinate: {
          i: 1,
          j: 0,
        },
      },
      {
        piece: new Pawn(),
        coordinate: {
          i: 1,
          j: 1,
        },
      },
      {
        piece: new Pawn(),
        coordinate: {
          i: 1,
          j: 2,
        },
      },
      {
        piece: new Pawn(),
        coordinate: {
          i: 1,
          j: 3,
        },
      }
    ]
    this.setUpPiecesOnBoard(piecesSetup);

  }

  private onBoardClickCallback(e: Event) {
    let target = e.target as HTMLElement;

    if (target.nodeName != "TD") {
      target = target.parentNode as HTMLElement;
    }

    let i: number, j: number;
    if (!target.dataset.i || !target.dataset.j) {
      return;
    }

    i = parseInt(target.dataset.i, 10);
    j = parseInt(target.dataset.j, 10);
    let current = this.chessBoard[i][j];
    let coordinate = {
      i: i,
      j: j,
    };

    if (this.selectedPiece) {
      let selected = this.chessBoard[this.selectedPiece.coordinate.i][this.selectedPiece.coordinate.j];
      this.removePiecefromPoint(this.selectedPiece.coordinate);
      this.setPieceOnPoint(coordinate, this.selectedPiece.piece);
      selected.squareLink.style.background = "#ffccb3";
      this.selectedPiece = null;
    } else {
      if (current.piece) {
        this.selectedPiece = {
          piece: current.piece,
          coordinate: coordinate,
        }
        current.squareLink.style.background = "#ffcaa1";
      }
    }

  }

  private onKeyClickCallback(e: Event) {
    if (this.selectedPiece) {
      this.selectedPiece = null;
    }
  }

  private move(piece: virtualBoardPoint, coordinate: Coordinate): void {

  }

  private removePieceImgfromSquare(squareLink: HTMLElement) {
    if (squareLink.childElementCount) {
      squareLink.removeChild(squareLink.lastChild);
    }
  }

  private setUpPieceImgOnSquare(squareLink: HTMLElement, piece: Piece) {
    if (squareLink.childElementCount) {
      squareLink.removeChild(squareLink.lastChild);
    }
    squareLink.appendChild(piece.getImage(ChessGame.IMAGE_SIZE));
  }

  private removePiecefromPoint(coordinate: Coordinate) {
    let currentSquare = this.chessBoard[coordinate.i][coordinate.j];
    this.removePieceImgfromSquare(currentSquare.squareLink);
    currentSquare.piece = null;
  }

  private setPieceOnPoint(coordinate: Coordinate, piece: Piece) {
    let currentSquare = this.chessBoard[coordinate.i][coordinate.j];
    this.setUpPieceImgOnSquare(currentSquare.squareLink, piece)
    currentSquare.piece = piece;
  }

  private setUpPiecesOnBoard(a: virtualBoardPoint[]) {
    for (let i = 0; i < a.length; i++) {
      let currentSquare = this.chessBoard[a[i].coordinate.i][a[i].coordinate.j];
      this.setPieceOnPoint(a[i].coordinate, a[i].piece);
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

  private createChessBoardElement() {
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
            square.style.textAlign = "center";

            line.appendChild(square);
            this.chessBoard[i][j] = {
              piece: null,
              squareLink: square,
            }
        }
        boardElement.appendChild(line);
    }

    boardElement.addEventListener("click", this.onBoardClickCallback);
    return boardElement;
  }

  public getChessBoard() {
    return this.chessBoardElement;
  }
}
