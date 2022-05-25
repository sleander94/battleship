export function createShip(length) {
  let ship = {};

  ship.length = length;
  ship.hitCount = 0;
  ship.isSunk = false;

  if (ship.length === 1) {
    ship.name = 'Submarine';
  } else if (ship.length === 2) {
    ship.name = 'Destroyer';
  } else if (ship.length === 3) {
    ship.name = 'Cruiser';
  } else if (ship.length === 4) {
    ship.name = 'Battleship';
  } else if (ship.length === 5) {
    ship.name = 'Aircraft Carrier';
  }

  ship.hit = function () {
    ship.hitCount += 1;
    ship.checkSunk();
  };

  ship.checkSunk = function () {
    if (ship.hitCount === ship.length) {
      ship.isSunk = true;
    }
  };

  return ship;
}
