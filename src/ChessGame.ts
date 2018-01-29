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
  private selectedSquare: BoardPoint = null;
  private chessBoard: BoardPoint[][];
  private chessBoardElement: HTMLElement;
  private engine: ChessEngine;

  constructor(player: number) {
    this.player = player;
    this.initializeChessboardElement();
    this.onBoardClickEvent = this.onBoardClickEvent.bind(this);
    this.onMoveAnalizedEvent = this.onMoveAnalizedEvent.bind(this);
    this.engine = new ChessEngine(this.onMoveAnalizedEvent);
    this.engine.setPlayer(player);
    let pieceSetup = this.getDefaultPieceSetup(player);
    this.setUpPiecesOnBoard(pieceSetup);
  }

  private onBoardClickEvent(e: Event) {
    let target = e.target as HTMLElement;
    if (target.nodeName != "TD") {
      target = target.parentNode as HTMLElement;
    }
    if (!target.dataset.x || !target.dataset.y) {
      return;
    }

    let selectedSquareCoordinate = this.getSquareCoordinate(target as HTMLTableDataCellElement);
    let currentBoardPoint = this.chessBoard[selectedSquareCoordinate.x][selectedSquareCoordinate.y];

    if (this.selectedSquare) { // move
      // let selected = this.chessBoard[this.selectedSquare.coordinate.i][this.selectedSquare.coordinate.j];
      if (currentBoardPoint.piece && this.selectedSquare.piece.getSide() == currentBoardPoint.piece.getSide()) { // @TODO check castling
        return;
      }

      let oldPoint = this.getSquareCoordinate(this.selectedSquare.squareLink as HTMLTableDataCellElement);
      this.engine.move(oldPoint, selectedSquareCoordinate);
      this.removePiecefromPoint(oldPoint);
      this.setPieceOnPoint(this.selectedSquare.piece, selectedSquareCoordinate);
      // this.engine.move(this.selectedSquare.coordinate, coordinate);
      this.unhighlightSquare(this.selectedSquare.squareLink as HTMLTableDataCellElement)
      this.selectedSquare = null;
      this.engine.analize(1);
    } else if (currentBoardPoint.piece) { // select piece
      this.highlightSquare(target as HTMLTableDataCellElement);
      // this.selectedSquare = {
      //   piece: current.piece,
      //   coordinate: coordinate,
      // }
      // current.squareLink.style.background = "#ffcaa1";
    }
  }

  // private onKeyClickCallback(e: Event) {
  //   if (this.selectedSquare) {
  //     this.selectedSquare = null;
  //   }
  // }
  private getDefaultPieceSetup(player: number): Piece[] {
    // return [
    //   new Bishop(0, {
    //     x: 0,
    //     y: 0
    //   }),
    //   new Bishop(0, {
    //     x: 1,
    //     y: 0
    //   }),
    //   new Bishop(0, {
    //     x: 2,
    //     y: 0
    //   }),
    // ];
  }

  private getSquareCoordinate(square: HTMLTableDataCellElement): Coordinate {
    return {
      x: parseInt(square.dataset.x, 10),
      y: parseInt(square.dataset.y, 10),
    };
  }

  private highlightSquare(square: HTMLTableDataCellElement): void {
    square.style.background = "#ffcaa1";
  }

  private unhighlightSquare(square: HTMLTableDataCellElement) {
    let squareCoordinate = this.getSquareCoordinate(square);
    square.style.background = this.getSquareColor(squareCoordinate.x, squareCoordinate.y);
  }

  private removePiecefromPoint(coordinate: Coordinate): void {
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
    this.engine.setUpPieces(pieces);
    for (let i = 0; i < pieces.length; i++) {
      let piecePosition = pieces[i].getWPosition();
      this.setPieceOnPoint(pieces[i], piecePosition);
    }
  }

  private onMoveAnalizedEvent(coordinate: Coordinate, newCoordinate: Coordinate) {
    // if (!coordinate) { // Сheckmate
    //   // this.onCheckmateEvent();
    //   return;
    // }
    //
    // let movedPiece = this.chessBoard[coordinate.x][coordinate.y].piece;
    // if (this.chessBoard[newCoordinate.x][newCoordinate.y].piece) {
    //   this.removePiecefromPoint(newCoordinate);
    // }
    // this.setPieceOnPoint(newCoordinate, movedPiece);
    // this.removePiecefromPoint(coordinate);
    // // this.move();
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
