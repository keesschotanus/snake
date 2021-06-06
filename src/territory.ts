import { Cell } from "./cell.js";
import { Snake } from "./snake.js";


/**
 * This is the territory where the snake lives.
 */
export class Territory {

  /**
   * Number of horizontal cells in the territory.
   */
  public static readonly GRID_WIDTH_IN_CELLS = 20;

  /**
   * Number of vertical cells in the territory.
   */
  public static readonly GRID_HEIGHT_IN_CELLS = 20;

  /**
   * Number of horizontal pixels in a single cell.
   */
  public static GRID_CELL_WIDTH_IN_PIXELS: number;

  /**
   * Number of vertical pixels in a single cell.
   */
  public static GRID_CELL_HEIGHT_IN_PIXELS: number;

  /**
   * The canvas to draw the snake's territory on.
   */
  private readonly canvas: HTMLCanvasElement;

  /**
   * The canvas context used for drawing on the canvas.
   */
  private readonly ctx: CanvasRenderingContext2D;

  /**
   * Maybe python would have been more appropriate.
   */
  private snake: Snake;

  /**
   * Food that makes the snake grow bigger.
   */
  food!: Cell;

  /**
   * Creates the territory by getting the canvas and adding a snake to the territory.
   */
  constructor() {
    this.canvas = document.getElementById('snakeTerritory') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Note: Canvas likes integers and they avoid rounding errors during cell to pixels computation.
    Territory.GRID_CELL_WIDTH_IN_PIXELS = Math.floor(this.canvas.width / Territory.GRID_WIDTH_IN_CELLS + 0.5);
    Territory.GRID_CELL_HEIGHT_IN_PIXELS = Math.floor(this.canvas.height / Territory.GRID_HEIGHT_IN_CELLS + 0.5);

    this.snake = new Snake(this);
    this.addFood();
  }

  /**
   * Updates this territory by moving the snake and keeping track of food.
   */  
  update() {
    this.snake.move(this.ctx);
  }

  /**
   * Adds food to this territory, avoiding the snake.
   */
  addFood() {
    let row, col;

    do {
      row = Math.floor(Math.random() * Territory.GRID_HEIGHT_IN_CELLS);
      col = Math.floor(Math.random() * Territory.GRID_WIDTH_IN_CELLS)
    } while (this.snake.isPartOfSnake(row, col));

    this.food = new Cell(row, col);
    this.ctx.fillStyle = 'red';
    const point = this.food.toPoint();
    this.ctx.fillRect(point.x, point.y, Territory.GRID_CELL_WIDTH_IN_PIXELS, Territory.GRID_CELL_HEIGHT_IN_PIXELS);
  }
}
