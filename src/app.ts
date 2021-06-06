import { Territory } from "./territory.js";

/*
 * Snake app.
 * A button is created that starts the game when clicked.
 */
document.addEventListener('DOMContentLoaded', event => {
  const playButton = document.getElementById('play') as HTMLButtonElement;
  playButton.addEventListener('click', clickEvent => {
    play();
  });
});

/**
 * Play the game of snake.
 */
function play() {
  // Hide the "Play" button while playing
  const playButton = document.getElementById('play') as HTMLButtonElement;
  playButton.hidden = true;

  // Reset message
  const messageElement = document.getElementById('message') as HTMLHeadingElement;
  messageElement.textContent = '';

  // Reset score
  const scoreElement = document.getElementById('score') as HTMLSpanElement;
  scoreElement.textContent = '1';

  // Create the territory and Update it on a regular basis
  const territory = new Territory();
  const interval =  setInterval(() => {
    try {
      territory.update();
    } catch (error) {
      clearInterval(interval);
      messageElement.textContent = "Game over!";
      playButton.hidden = false;
    }
  }, 250);
}
