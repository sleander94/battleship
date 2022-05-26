import { createShip } from './ship';

export function createBoard() {
  let board = {};
  board.ships = [];
  board.width = 10;
  board.height = 10;

  board.grid = [];
  for (let i = 0; i < board.height; i++) {
    let row = [];
    for (let i = 0; i < board.width; i++) {
      let cell = '';
      row.push(cell);
    }
    board.grid.push(row);
  }

  board.addShip = (length, x, y, vert) => {
    let ship = createShip(length);
    board.ships.push(ship);
    if (vert) {
      for (let i = 0; i < length; i++) {
        if (!board.grid[y - 1 + i]) {
          throw 'Placement out of bounds';
        } else if (board.grid[y - 1 + i][x - 1] !== '') {
          throw 'Space is occupied';
        }
      }
      for (let i = 0; i < length; i++) {
        board.grid[y - 1 + i][x - 1] = ship.name;
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (board.grid[y - 1][x - 1 + i] === undefined) {
          throw 'Placement out of bounds';
        } else if (board.grid[y - 1][x - 1 + i] !== '') {
          throw 'Space is occupied';
        }
      }
      for (let i = 0; i < length; i++) {
        board.grid[y - 1][x - 1 + i] = ship.name;
      }
    }
  };

  board.receiveAttack = (x, y) => {
    let hitCoord = board.grid[y - 1][x - 1];
    if (hitCoord === '') {
      hitCoord = 'miss';
    } else {
      board.ships.forEach((ship) => {
        if (hitCoord === ship.name) {
          ship.hit();
          hitCoord = 'hit';
          board.fleetSunk();
        }
      });
    }
    return (board.grid[y - 1][x - 1] = hitCoord);
  };

  board.fleetSunk = () => {
    let fleetDestroyed = true;
    board.ships.forEach((ship) => {
      if (ship.isSunk === false) {
        fleetDestroyed = false;
      }
    });
    return fleetDestroyed;
  };

  return board;
}
