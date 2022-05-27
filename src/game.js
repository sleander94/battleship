import './style.css';
import { createPlayer } from './player';
import {
  listenForAttack,
  renderBoard,
  createGameArea,
} from './dom-interaction';

(function gameLoop() {
  let players = [];
  let human = createPlayer('human');
  let computer = createPlayer('computer');
  players.push(human);
  players.push(computer);

  createGameArea(document.body);

  players.forEach((player) => {
    for (let i = 1; i <= 5; i++) {
      player.board.addShip(i, 1, i);
    }
    renderBoard(player, document.querySelector('.gameArea'));
  });

  listenForAttack(human, computer, document.querySelector('.gameArea'));
})();
