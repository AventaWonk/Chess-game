import ChessEngine from './ChessEngine';
import {Coordinate} from './Types/Coordinate';
import Piece from './Piece/Piece';
import Pawn from './Piece/Pawn';

interface BoardPoint {
  piece: Piece;
  squareLink: HTMLElement;
}

export default class ChessGame {
  public static WHTIE = 1;
  public static BLACK = 2;
  private static SQUARE_SIZE = "60";
  private static IMAGE_SIZE = "40";
  private static WHITE_SQUARE_COLOR = "#ffccb3";
  private static BLACK_SQUARE_COLOR = "#af6744";
  private player: number;
  // private selectedPiece: virtualBoardPoint = null;
  private chessBoard: BoardPoint[][];
  private chessBoardElement: HTMLElement;
  private engine: ChessEngine;

  constructor(player: number) {
    this.player = player;
    this.initializeChessboardElement();
    this.setUpPiecesOnBoard();
    this.onBoardClickEvent = this.onBoardClickEvent.bind(this);
    this.onMoveAnalizedEvent = this.onMoveAnalizedEvent.bind(this);
    // this.engine = new ChessEngine(player, defaultPiecesSetup, this.onMoveAnalizedEvent);
  }

  private onBoardClickEvent(e: Event) {
    let target = e.target as HTMLElement;

    if (target.nodeName != "TD") {
      target = target.parentNode as HTMLElement;
    }

    let x: number;
    let y: number;
    if (!target.dataset.x || !target.dataset.y) {
      return;
    }

    x = parseInt(target.dataset.x, 10);
    y = parseInt(target.dataset.y, 10);
    let current = this.chessBoard[x][y];
    let coordinate = {
      i: i,
      j: j,
    };

    if (this.selectedPiece) {
      let selected = this.chessBoard[this.selectedPiece.coordinate.i][this.selectedPiece.coordinate.j];

      if (current.piece && selected.piece.getSide() == current.piece.getSide()) { // @TODO castling
        return;
      }

      this.removePiecefromPoint(this.selectedPiece.coordinate);
      this.setPieceOnPoint(coordinate, this.selectedPiece.piece);
      selected.squareLink.style.background = "#ffccb3";
      this.engine.move(this.selectedPiece.coordinate, coordinate);
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

  // private onKeyClickCallback(e: Event) {
  //   if (this.selectedPiece) {
  //     this.selectedPiece = null;
  //   }
  // }

  private removePiecefromPoint(coordinate: Coordinate) {
    let x = coordinate.x;
    let y = coordinate.y;
    let currentSquare = this.chessBoard[x][y];

    if (currentSquare.squareLink.childElementCount) {
      currentSquare.squareLink.removeChild(currentSquare.squareLink.lastChild);
    }
    currentSquare.piece = null;
  }

  private setPieceOnPoint(piece: Piece, position: Coordinate) {
    let x = position.x;
    let y = position.y;
    let currentSquare = this.chessBoard[x][y];

    this.chessBoard[x][y].piece = piece;
    if (currentSquare.squareLink.childElementCount) {
      currentSquare.squareLink.removeChild(currentSquare.squareLink.lastChild);
    }
    let pieceInmage = piece.getImage(ChessGame.IMAGE_SIZE);
    currentSquare.squareLink.appendChild(pieceInmage);
  }

  private setUpPiecesOnBoard(pieces: Piece[]) {
    for (let i = 0; i < pieces.length; i++) {
      let piecePosition = pieces[i].getWPosition();
      this.setPieceOnPoint(pieces[i], piecePosition);
    }
  }

  private onMoveAnalizedEvent(coordinate: Coordinate, newCoordinate: Coordinate) {
    if (!coordinate) { // Сheckmate
      // this.onCheckmateEvent();
      return;
    }

    let movedPiece = this.chessBoard[coordinate.x][coordinate.y].piece;
    if (this.chessBoard[newCoordinate.x][newCoordinate.y].piece) {
      this.removePiecefromPoint(newCoordinate);
    }
    this.setPieceOnPoint(newCoordinate, movedPiece);
    this.removePiecefromPoint(coordinate);
    // this.move();
  }

  private getSquareColor(x: number, y: number) {
    if ((x % 2) != 0) {
      if ((y % 2) != 0) {
        return ChessGame.WHITE_SQUARE_COLOR;
      } else {
        return ChessGame.BLACK_SQUARE_COLOR;
      }
    } else {
      if ((y % 2) == 0) {
        return ChessGame.WHITE_SQUARE_COLOR;
      } else {
        return ChessGame.BLACK_SQUARE_COLOR;
      }
    }
  }

  private initializeChessboardElement() {
    this.chessBoard = [];
    let boardElement = document.createElement("table");
    boardElement.setAttribute("style", "border-collapse:collapse;");

    for (let i = 0; i < 8; i++) {
      this.chessBoard[i] = [];
      let line = document.createElement("tr");

      for (let j = 0; j < 8; j++) {
        let square = document.createElement("td");

        square.dataset.x = i.toString();
        square.dataset.y = j.toString();
        square.style.height = ChessGame.SQUARE_SIZE + "px";
        square.style.width = ChessGame.SQUARE_SIZE + "px";
        square.style.background = this.getSquareColor(i, j);;
        square.style.textAlign = "center";

        line.appendChild(square);
        this.chessBoard[i][j] = {
          piece: null,
          squareLink: square,
        }
      }
      boardElement.appendChild(line);
    }

    boardElement.addEventListener("click", this.onBoardClickEvent);
    return boardElement;
  }

  public getChessBoard() {
    return this.chessBoardElement;
  }
}
