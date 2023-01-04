export class ParsedPaginationToken {
  constructor(
    public direction: Direction = Direction.Forward,
    public reference?: string
  ) {  }
}

export enum Direction {
  Forward = "Forward",
  Backward = "Backward"
}
