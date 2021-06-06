import { Point } from "./point.js";
import { Territory } from "./territory.js";

/**
 * The snake's territory is made up of cells.
 * A single cell is identified by a row and column.
 */
export class Cell {
  readonly row: number;
  readonly col: number;

  /**
   * Constructs a cell from the supplied row and col.
   * @param row Row number of the cell (zero based).
   * @param col Column number of the cell (zero based).
   */
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  /**
   * Converts the coordinates of this cell to xy-coordinates.
   * @returns A point created from the row and column of this cell.
   */
  toPoint(): Point {
    return new Point(this.col * Territory.GRID_CELL_WIDTH_IN_PIXELS, this.row * Territory.GRID_CELL_HEIGHT_IN_PIXELS);
  }
    
}
  