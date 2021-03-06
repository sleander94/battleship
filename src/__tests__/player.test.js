import { createPlayer } from '../player';
import { createBoard } from '../board';
let testPlayer1;
let testPlayer2;

beforeEach(() => {
  testPlayer1 = createPlayer('human');
  testPlayer2 = createPlayer('computer');
});

test('Player has type property with value of parameter', () => {
  expect(testPlayer1.type).toBe('human');
  expect(testPlayer2.type).toBe('computer');
});

test('Player has empty board on creation', () => {
  let testBoard = createBoard();
  expect(testPlayer1.board.grid).toEqual(testBoard.grid);
});

test("Player can attack opponent's board at specified coordinates", () => {
  testPlayer1.makeAttack(testPlayer2, 1, 1);
  expect(testPlayer2.board.grid[0][0]).toBe('miss');
});

test('Cannot attack previously attacked space', () => {
  testPlayer1.makeAttack(testPlayer2, 1, 1);
  expect(testPlayer1.makeAttack(testPlayer2, 1, 1)).toBe(undefined);
});

test('Make attack without x, y parameters if player type is computer', () => {
  testPlayer2.makeAttack(testPlayer1);
  let attackCounter = 0;
  for (let i = 0; i < 10; i++) {
    if (testPlayer1.board.grid[i].includes('miss')) {
      attackCounter += 1;
      expect(attackCounter).toBe(1);
    }
  }
});
