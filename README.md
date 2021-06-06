# Snake

This is my version of snake written in TypeScript
and using the HTML5 Canvas component.

I simply wrote it to get some experience with setting up
a TypeScript project and using the canvas component.

The game itself can be improved by
- Introducing a Food component that
    - disappears after a certain time
    - makes the snake grow with a different size depending on the type of food
    - use images for the different kind of foods
- Improving the time it takes to react to a keyboard press

## The source code
Start with app.ts.
It is included in index.html and it creates the snake's territory and sets everything in motion.


Next look at territory.ts which is the place where the snake lives.
It is made up of a number of cells.
You can adjust them to get a different size.

Finally look at snake.ts. It controls the snake.

The cell.ts and point.ts files are merely there to support the other classes.