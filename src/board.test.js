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
