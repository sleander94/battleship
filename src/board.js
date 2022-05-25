import { createShip } from './ship';

export function createBoard(width, height) {
  let board = {};
  board.width = width;
  board.height = height;
  board.cells = width * height;

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
    let newShip = createShip(length);

    for (let i = 0; i < length; i++) {
      board.grid[y - 1][x - 1 + i] = newShip.name;
    }

    return newShip;
  };

  return board;
}
