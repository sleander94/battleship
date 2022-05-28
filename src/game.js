import './style.css';
import { createPlayer } from './player';
import {
  renderBoard,
  renderPage,
  placeFleet,
  placeRandomFleet,
} from './dom-interaction';

renderPage(document.body);
const messageContainer = document.querySelector('.messageContainer');
const startButton = document.createElement('button');
startButton.classList.toggle('startButton');
startButton.textContent = 'Start Game';
startButton.addEventListener('click', () => {
  gameLoop();
});
messageContainer.appendChild(startButton);

export function gameLoop() {
  document.querySelector('.gameArea').innerHTML = '';
  let players = [];
  let human = createPlayer('human');
  let computer = createPlayer('computer');
  players.push(human);
  players.push(computer);

  players.forEach((player) => {
    renderBoard(player, document.querySelector('.gameArea'));
  });

  placeFleet(human, computer, document.getElementById('human'), 5);
  placeRandomFleet(computer, document.getElementById('computer'), 5);
}
