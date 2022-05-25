import { createBoard } from './board';
let testBoard;

beforeEach(() => {
  testBoard = createBoard(10, 10);
});

test('Generate empty grid with specified dimensions', () => {
  expect(testBoard.grid.length).toBe(10);
  expect(testBoard.grid[0].length).toBe(10);
});

test('Add ship to board at specified coordinates', () => {
  testBoard.addShip(3, 5, 4);
  expect(testBoard.grid[3][3]).toBe('');
  expect(testBoard.grid[3][4]).toBe('Cruiser');
  expect(testBoard.grid[3][5]).toBe('Cruiser');
  expect(testBoard.grid[3][6]).toBe('Cruiser');
  expect(testBoard.grid[3][7]).toBe('');
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
