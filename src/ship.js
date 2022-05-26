export function createShip(length) {
  let ship = {};

  ship.length = length;
  ship.hitCount = 0;
  ship.isSunk = false;

  if (ship.length === 1) {
    ship.name = 'submarine';
  } else if (ship.length === 2) {
    ship.name = 'destroyer';
  } else if (ship.length === 3) {
    ship.name = 'cruiser';
  } else if (ship.length === 4) {
    ship.name = 'battleship';
  } else if (ship.length === 5) {
    ship.name = 'carrier';
  }

  ship.hit = () => {
    ship.hitCount += 1;
    ship.checkSunk();
  };

  ship.checkSunk = () => {
    if (ship.hitCount === ship.length) {
      ship.isSunk = true;
    }
  };

  return ship;
}
