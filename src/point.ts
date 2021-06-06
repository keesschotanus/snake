
/**
 * Abstraction of a point on the canvas that is represented by xy coordinates.
 * The origin (0, 0) of a point is at the top-left corner.
 */
export class Point {
  readonly x: number;
  readonly y: number;

  /**
   * Constructs a point.
   * @param x x coordinate.
   * @param y y coordinate.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}