
export interface IPiece {
   getWeight(): number;
   getCode(): string;
   getImage(imageSize: string): HTMLImageElement ;
}
