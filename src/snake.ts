import { Territory } from "./territory.js";
import { Cell } from "./cell.js";

/**
 * Directions into which the snake can move.
 */
enum Direction { North, East, South, West };

/**
 * The one and only snake.
 */
export class Snake {
  /**
   * Territory in which the snake lives.
   */
  private territory: Territory;

  /**
   * HTML element to keep track of the score.
   */
  private scoreElement = document.getElementById('score') as HTMLSpanElement;

  /**
   * The body of the snake is a collection of cells.
   */
  private body: Cell [] = [];

  /**
   * Current direction into which the snake moves.
   */
  private direction: Direction;

  /**
   * Creates the snake and places it somewhere in the territory.
   * Adds listeners for keydown events so the snake can be moved.
   * @param territory Territory in which the snake lives.
   */
  constructor(territory: Territory) {
    this.territory = territory;

    this.body.unshift(new Cell(Math.floor(Territory.GRID_HEIGHT_IN_CELLS / 2), Math.floor(Territory.GRID_WIDTH_IN_CELLS / 2)));
    this.direction = Direction.North;

    document.addEventListener('keydown', event => {
      this.onKeyDown(event);
    });
  }
  
  /**
   * Moves the snake by moving its head in the current direction
   * and then removing its tail.
   * @param ctx Context to render on the canvas. 
   */
  move(ctx: CanvasRenderingContext2D) {
    this.moveHead(ctx);
    this.eraseTail(ctx);
  }

  /**
   * Moves the head of the snake in the current direction.
   * @param ctx The context for drawing on the canvas.
   * @throws Error when the snake is moved into its own body.
   */
  moveHead(ctx: CanvasRenderingContext2D) {
    // Compute the new position of the head
    let row = this.body[0].row;
    let col = this.body[0].col;

    switch (this.direction) {
      case Direction.North:
        row = row === 0 ? Territory.GRID_HEIGHT_IN_CELLS - 1 : row - 1;
        break;
      case Direction.East:
        col = col === Territory.GRID_WIDTH_IN_CELLS - 1 ? 0 : col + 1;
        break;
      case Direction.South:
        row = row === Territory.GRID_HEIGHT_IN_CELLS - 1 ? 0 : row + 1;
        break;
      case Direction.West:
        col = col === 0 ? Territory.GRID_WIDTH_IN_CELLS - 1 : col - 1;
        break;
      default:
        break;
    }
    const newHead: Cell = new Cell(row, col);

    // Hit detection detects if the new head position of the snake, touches its body
    if (this.body.find(snakeCell => snakeCell.col === newHead.col && snakeCell.row === newHead.row)) {
      throw new Error('Hit');
    }

    this.body.unshift(newHead);

    // Draw the new head
    ctx.fillStyle = 'blue';
    const point = newHead.toPoint();
    ctx.fillRect(point.x, point.y, Territory.GRID_CELL_WIDTH_IN_PIXELS , Territory.GRID_CELL_HEIGHT_IN_PIXELS);
  }

  /**
   * Erases the tail of the snake,
   * but only if the snake is not eating.
   * Eating grows the snake from the tail.
   * @param ctx The context for drawing.
   */
  eraseTail(ctx: CanvasRenderingContext2D) {
    const head = this.body[0];
    if (this.territory.food && head.col === this.territory.food.col && head.row === this.territory.food.row) {
      this.territory.addFood();
      this.scoreElement.textContent = '' + this.body.length;
    } else {
      const tail = this.body.pop() as Cell;

      ctx.fillStyle = 'limegreen';
      const point = tail.toPoint();
      ctx.fillRect(point.x, point.y, Territory.GRID_CELL_WIDTH_IN_PIXELS, Territory.GRID_CELL_HEIGHT_IN_PIXELS);
    }
  }

  /**
   * Determines if the supplied row and col are part of the snake.
   * @param row Row number (zero based).
   * @param col Column number (zero based).
   * @returns True when the supplied row and col are part of the snake,
   *  otherwise false is returned.
   */
  isPartOfSnake(row: number, col: number) {
    return this.body.find(snakeCell => snakeCell.col === col && snakeCell.row === row) !== undefined;
  }

  /**
   * Handles changing the direction in which the snake moves.
   * @param event Keyboard event.
   */
  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
        this.direction = Direction.North;
        break;
      case 'ArrowRight':
        this.direction = Direction.East;
        break;
      case 'ArrowDown':
        this.direction = Direction.South;
        break;
      case 'ArrowLeft':
        this.direction = Direction.West;
        break;
      default:
        break;
    }
  }
    
} 