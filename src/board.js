import { createShip } from './ship';

export function createBoard(width, height) {
  let board = {};
  board.ships = [];
  board.width = width;
  board.height = height;

  board.grid = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let i = 0; i < width; i++) {
      let cell = '';
      row.push(cell);
    }
    board.grid.push(row);
  }

  board.addShip = function (length, x, y) {
    let ship = createShip(length);
    board.ships.push(ship);
    for (let i = 0; i < length; i++) {
      board.grid[y - 1][x - 1 + i] = ship.name;
    }
  };

  board.receiveAttack = function (x, y) {
    let hitCoord = board.grid[y - 1][x - 1];
    if (hitCoord === '') {
      hitCoord = 'miss';
    } else {
      board.ships.forEach((ship) => {
        if (hitCoord === ship.name) {
          ship.hit();
        }
      });
      hitCoord = 'hit';
    }
    return (board.grid[y - 1][x - 1] = hitCoord);
  };

  return board;
}
