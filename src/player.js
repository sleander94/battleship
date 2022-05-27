import { createBoard } from './board';

export function createPlayer(type) {
  let player = {};

  player.type = type;
  player.board = createBoard();

  player.makeAttack = (opponent, x, y) => {
    if (player.type === 'computer') {
      function randomCoord() {
        return (
          Math.floor(Math.random() * (Math.floor(9) - Math.ceil(1) + 1)) +
          Math.ceil(1)
        );
      }
      let x = randomCoord();
      let y = randomCoord();
      if (
        opponent.board.grid[y - 1][x - 1] !== 'miss' &&
        opponent.board.grid[y - 1][x - 1] !== 'hit'
      ) {
        return opponent.board.receiveAttack(x, y);
      } else {
        player.makeAttack(opponent);
      }
    } else if (player.type === 'human') {
      if (
        opponent.board.grid[y - 1][x - 1] !== 'miss' &&
        opponent.board.grid[y - 1][x - 1] !== 'hit'
      ) {
        opponent.board.receiveAttack(x, y);
        return true;
      }
    }
  };

  return player;
}
