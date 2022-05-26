import { createBoard } from './board';

export function createPlayer(name, type) {
  let player = {};

  player.name = name;
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
        opponent.board.grid[y][x] !== 'miss' ||
        opponent.board.grid[y][x] !== 'hit'
      ) {
        return opponent.board.receiveAttack(x, y);
      } else {
        player.makeAttack(opponent);
      }
    }
    opponent.board.receiveAttack(x, y);
  };

  return player;
}
