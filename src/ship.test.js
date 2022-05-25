import { createShip } from './ship';
let testShip;

beforeEach(() => {
  testShip = createShip(3);
});

test('Create new ship object with specified length', () => {
  expect(testShip.length).toBe(3);
});

test('Mark ship as sunk when hitCount = length', () => {
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk).toBe(true);
});

test('Add 1 to hitCount on hit function call', () => {
  testShip.hit();
  expect(testShip.hitCount).toBe(1);
});
