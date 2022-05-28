import { createBoard } from '../board';
let testBoard;

beforeEach(() => {
  testBoard = createBoard();
});

test('Generate empty grid with correct dimensions', () => {
  expect(testBoard.grid.length).toBe(10);
  expect(testBoard.grid[0].length).toBe(10);
});

test('Add ship to board at specified coordinates', () => {
  testBoard.addShip(3, 5, 4);
  expect(testBoard.grid[3][3]).toBe('');
  expect(testBoard.grid[3][4]).toBe('cruiser');
  expect(testBoard.grid[3][5]).toBe('cruiser');
  expect(testBoard.grid[3][6]).toBe('cruiser');
  expect(testBoard.grid[3][7]).toBe('');
});

test('Prevent ship placement if space is occupied by another ship', () => {
  testBoard.addShip(3, 1, 1);
  expect(testBoard.addShip(3, 1, 2));
  expect(testBoard.addShip(3, 4, 1, 'vertical'));
  expect(testBoard.ships.length).toBe(3);
  testBoard.addShip(3, 1, 1);

  testBoard.addShip(3, 2, 1);
  testBoard.addShip(3, 2, 1, 'vertical');
  expect(testBoard.ships.length).toBe(3);
});

test('Prevent horizontal ship placement if it overflows board', () => {
  expect(testBoard.addShip(3, 8, 8));
  testBoard.addShip(3, 9, 9);
  expect(testBoard.ships.length).toBe(1);
});

test('Prevent vertical ship placement if it overflows board', () => {
  expect(testBoard.addShip(3, 8, 8, 'vertical'));
  testBoard.addShip(3, 9, 9, 'vertical');
  expect(testBoard.ships.length).toBe(1);
});

test('Add ship vertically', () => {
  testBoard.addShip(3, 5, 5, 'vertical');
  expect(testBoard.grid[4][5]).toBe('');
  expect(testBoard.grid[4][3]).toBe('');
  expect(testBoard.grid[4][4]).toBe('cruiser');
  expect(testBoard.grid[5][4]).toBe('cruiser');
  expect(testBoard.grid[6][4]).toBe('cruiser');
});

test('Receive attack at occupied coordinate and register hit', () => {
  testBoard.addShip(3, 1, 1);
  testBoard.receiveAttack(1, 1);
  expect(testBoard.grid[0][0]).toBe('hit');
});

test('Increase hitCount of ship when hit is registered', () => {
  testBoard.addShip(3, 1, 1);
  testBoard.receiveAttack(2, 1);
  expect(testBoard.ships[0].hitCount).toBe(1);
});

test('Receive attack at empty coordinate and register miss', () => {
  testBoard.receiveAttack(1, 1);
  expect(testBoard.grid[0][0]).toBe('miss');
});

test('Check if all ships on board are sunk', () => {
  testBoard.addShip(3, 1, 1);
  testBoard.receiveAttack(1, 1);
  testBoard.receiveAttack(2, 1);
  expect(testBoard.fleetSunk()).toBeFalsy();
  testBoard.receiveAttack(3, 1);
  expect(testBoard.fleetSunk()).toBeTruthy();
});
