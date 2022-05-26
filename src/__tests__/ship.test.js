import { createShip } from '../ship';
let testShip;

beforeEach(() => {
  testShip = createShip(3);
});

test('Create new ship object with specified length', () => {
  expect(testShip.length).toBe(3);
});

test('Name ship according to length', () => {
  expect(createShip(1).name).toBe('submarine');
  expect(createShip(2).name).toBe('destroyer');
  expect(createShip(3).name).toBe('cruiser');
  expect(createShip(4).name).toBe('battleship');
  expect(createShip(5).name).toBe('carrier');
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
