export interface ParsedPaginationToken {
    direction: Direction
    reference?: string
}

export enum Direction {
  Forward = "Forward",
  Backward = "Backward"
}
