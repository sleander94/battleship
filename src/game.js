import './style.css';
import { createPlayer } from './player';
import { startAttackLoop, renderBoard, renderPage } from './dom-interaction';

(function gameLoop() {
  let players = [];
  let human = createPlayer('human');
  let computer = createPlayer('computer');
  players.push(human);
  players.push(computer);

  renderPage(document.body);

  players.forEach((player) => {
    for (let i = 1; i <= 5; i++) {
      player.board.addShip(i, 1, i);
    }
    renderBoard(player, document.querySelector('.gameArea'));
  });

  startAttackLoop(human, computer, document.querySelector('.gameArea'));
})();
