export function createShip(length) {
  let ship = {};

  ship.length = length;
  ship.hitCount = 0;
  ship.isSunk = false;

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
