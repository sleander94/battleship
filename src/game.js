import './style.css';
import { createPlayer } from './player';
import {
  startAttackLoop,
  renderBoard,
  renderPage,
  placeFleet,
  placeRandomFleet,
} from './dom-interaction';

(function gameLoop() {
  let players = [];
  let human = createPlayer('human');
  let computer = createPlayer('computer');
  players.push(human);
  players.push(computer);

  renderPage(document.body);

  players.forEach((player) => {
    renderBoard(player, document.querySelector('.gameArea'));
  });

  placeFleet(human, document.getElementById('human'), 5);

  startAttackLoop(human, computer, document.querySelector('.gameArea'));
})();
