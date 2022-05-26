import { createPlayer } from '../player';
import { createBoard } from '../board';
let testPlayer1;
let testPlayer2;

beforeEach(() => {
  testPlayer1 = createPlayer('foo', 'human');
  testPlayer2 = createPlayer('bar', 'computer');
});

test('Player has name & type properties with value of parameters', () => {
  expect(testPlayer1.name).toBe('foo');
  expect(testPlayer1.type).toBe('human');
});

test('Player has empty board on creation', () => {
  let testBoard = createBoard();
  expect(testPlayer1.board.grid).toEqual(testBoard.grid);
});

test("Player can attack opponent's board at specified coordinates", () => {
  testPlayer1.makeAttack(testPlayer2, 1, 1);
  expect(testPlayer2.board.grid[0][0]).toBe('miss');
});

test('Make random attack if player type is computer', () => {
  testPlayer2.makeAttack(testPlayer1);
  let attackCounter = 0;
  for (let i = 0; i < 10; i++) {
    if (testPlayer1.board.grid[i].includes('miss')) {
      attackCounter += 1;
      expect(attackCounter).toBe(1);
    }
  }
});

// continue attacking if space has been attacked
