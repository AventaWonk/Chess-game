import ChessEngine from './ChessEngine';
import {Coordinate} from './Types/Coordinate';
import {Move} from './Types/Move';
import {AbstractPiece, Bishop, King, Knight, Pawn, Queen, Rook} from './Piece';

interface BoardPoint {
  piece: AbstractPiece;
  squareLink: HTMLTableDataCellElement;
}

export default class ChessGame {
  public static WHTIE = 0;
  public static BLACK = 1;
  private static SQUARE_SIZE = "60";
  private static IMAGE_SIZE = "40";
  private static WHITE_SQUARE_COLOR = "#ffccb3";
  private static BLACK_SQUARE_COLOR = "#af6744";
  private static HIGHLIGHTED_SQUARE_COLOR = "#8a7e78";
  private player: number;
  private selectedSquare: BoardPoint = null;
  private chessBoard: BoardPoint[][];
  private notationLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  private movesHistory: String[];
  private chessBoardElement: HTMLElement;
  private engine: ChessEngine;
  private highlightedSquares: HTMLTableDataCellElement[] = [];

  constructor(player: number) {
    this.player = player;
    this.movesHistory = [];
    this.chessBoard = [];
    for (let i = 0; i < 8; i++) {
        this.chessBoard.push(new Array(8));
    }

    this.onBoardClickEvent = this.onBoardClickEvent.bind(this);
    this.onMoveAnalizedEvent = this.onMoveAnalizedEvent.bind(this);

    this.initializeChessboardElement();
    this.engine = new ChessEngine(this.onMoveAnalizedEvent);
    this.engine.setPlayer(player ^ 1);
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

    let currentSquareCoordinate = this.getSquareCoordinate(target as HTMLTableDataCellElement);
    let currentBoardPoint = this.chessBoard[currentSquareCoordinate.x][currentSquareCoordinate.y];

    if (this.selectedSquare) {
      // move

      if (!target.dataset.isAvailable) {
        return
      }

      for (let i = 0; i < this.highlightedSquares.length; i++) {
        this.unhighlightSquare(this.highlightedSquares[i]);
      }

      this.highlightedSquares = []
      let moveNotation = "";
      let captureNotation = "";

      if (currentBoardPoint.piece && this.selectedSquare.piece.getSide() == currentBoardPoint.piece.getSide()) { // @TODO check castling
        this.unhighlightSquare(this.selectedSquare.squareLink as HTMLTableDataCellElement);
        moveNotation = "0-0"; // @TODO or "0-0-0"
        this.movesHistory.push(moveNotation);
        this.selectedSquare = null;
        return;
      }

      if (currentBoardPoint.piece) {
        captureNotation = "x";
      }

      moveNotation = this.selectedSquare.piece.getNotationIdentifer() + captureNotation + this.notationLetters[currentSquareCoordinate.x] + (currentSquareCoordinate.y + 1);
      this.movesHistory.push(moveNotation);

      let oldPoint = this.getSquareCoordinate(this.selectedSquare.squareLink as HTMLTableDataCellElement);
      let move: Move = {
        oldPosition: oldPoint,
        newPosition: currentSquareCoordinate,
      }

      this.engine.move(move);
      this.setPieceOnPoint(this.selectedSquare.piece, currentSquareCoordinate);
      this.unhighlightSquare(this.selectedSquare.squareLink as HTMLTableDataCellElement);
      this.selectedSquare = null;
      this.removePiecefromPoint(oldPoint);
      this.engine.analyze(1);
    } else if (currentBoardPoint.piece) {

      // select piece
      this.highlightSquare(target as HTMLTableDataCellElement);
      this.selectedSquare = currentBoardPoint;

      //highlight available squares
      let availableSquares = currentBoardPoint.piece.getMoves(this.engine.getVirtualChessboardLink());
      for (let i = 0; i < availableSquares.length; i++) {
        let square = this.chessBoard[availableSquares[i].x][availableSquares[i].y].squareLink;
        this.highlightedSquares.push(square);
        this.highlightAvailableSquare(square);
      }
    }
  }

  private getDefaultPieceSetup(player: number): AbstractPiece[] {
    let pieceSetup: AbstractPiece[] = [

    ];

    // for (let i = 0; i < 8; i++) {
    //   pieceSetup.push(
    //     new Pawn(this.player, {
    //       x: i,
    //       y: 1
    //     })
    //   );
    //   pieceSetup.push(
    //     new Pawn(this.player ^ 1, { // TODO: Change side flags to binary (this.player ^ 1)
    //       x: i,
    //       y: 6
    //     })
    //   );
    // }
    //
    // return pieceSetup;
    return [
      new Pawn(this.player, {
        x: 3,
        y: 0
      }),
      new Pawn(this.player, {
        x: 4,
        y: 0
      }),
      new Bishop(this.player ^ 1, {
        x: 6,
        y: 6
      }),
      // new Pawn(this.player ^ 1, {
      //   x: 1,
      //   y: 6
      // })
    ];
  }

  private getSquareCoordinate(square: HTMLTableDataCellElement): Coordinate {
    return {
      x: parseInt(square.dataset.x, 10),
      y: parseInt(square.dataset.y, 10),
    };
  }

  private highlightAvailableSquare(square: HTMLTableDataCellElement): void {
    square.dataset.isAvailable = "1";
    square.style.background = ChessGame.HIGHLIGHTED_SQUARE_COLOR;
  }

  private highlightSquare(square: HTMLTableDataCellElement): void {
    square.style.background = ChessGame.HIGHLIGHTED_SQUARE_COLOR;
  }

  private unhighlightSquare(square: HTMLTableDataCellElement) {
    let squareCoordinate = this.getSquareCoordinate(square);
    square.style.background = this.getSquareColor(squareCoordinate.x, squareCoordinate.y);
    delete square.dataset.isAvailable;
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

  private setPieceOnPoint(piece: AbstractPiece, position: Coordinate) {
    let x = position.x;
    let y = position.y;
    let currentBoardPoint = this.chessBoard[x][y];

    currentBoardPoint.piece = piece;
    if (currentBoardPoint.squareLink.childElementCount) {
      currentBoardPoint.squareLink.removeChild(currentBoardPoint.squareLink.lastChild);
    }
    let pieceImage = piece.getImage(ChessGame.IMAGE_SIZE);
    currentBoardPoint.squareLink.appendChild(pieceImage);
  }

  private setUpPiecesOnBoard(pieces: AbstractPiece[]) {
    this.engine.setUpPieces(pieces);
    for (let i = 0; i < pieces.length; i++) {
      let piecePosition = pieces[i].getPosition();
      this.setPieceOnPoint(pieces[i], piecePosition);
    }
  }

  private onMoveAnalizedEvent(move: Move) {
    // if (!coordinate) { // Сheckmate
    //   // this.onCheckmateEvent();
    //   return;
    // }
    this.engine.move(move);
    let movedPiece = this.chessBoard[move.oldPosition.x][move.oldPosition.y].piece;

    this.setPieceOnPoint(movedPiece, move.newPosition);
    this.removePiecefromPoint(move.oldPosition);
    // this.move();
  }

  private getSquareColor(x: number, y: number) {
    if ((x + 1) % 2 !== (y + 1) % 2) {
      return ChessGame.WHITE_SQUARE_COLOR;
    }

    return ChessGame.BLACK_SQUARE_COLOR;
  }

  private initializeChessboardElement() {
    let boardElement = document.createElement("table");
    boardElement.setAttribute("style", "border-collapse:collapse;");

    for (let i = 7; i > -1; i--) {
      let row = document.createElement("tr");
      let rowNumber = document.createElement("td");
      rowNumber.insertAdjacentText('afterbegin', (i + 1).toString());
      row.appendChild(rowNumber);

      for (let j = 0; j < 8; j++) {
        let square = document.createElement("td");

        square.dataset.x = j.toString();
        square.dataset.y = i.toString();
        square.style.height = ChessGame.SQUARE_SIZE + "px";
        square.style.width = ChessGame.SQUARE_SIZE + "px";
        square.style.background = this.getSquareColor(i, j);;
        square.style.textAlign = "center";

        row.appendChild(square);
        this.chessBoard[j][i] = {
          piece: null,
          squareLink: square,
        };
      }
      boardElement.appendChild(row);
    }

    let row = document.createElement("tr");
    let columnLetter = document.createElement("td");
    row.appendChild(columnLetter);
    for (let i = 0; i < 8; i++) {
      columnLetter = document.createElement("td");
      columnLetter.insertAdjacentText('afterbegin', this.notationLetters[i].toString());
      row.appendChild(columnLetter);
    }
    boardElement.appendChild(row);

    boardElement.addEventListener("click", this.onBoardClickEvent);
    this.chessBoardElement = boardElement;
  }

  public getChessBoard() {
    return this.chessBoardElement;
  }
}
