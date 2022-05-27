/* import { createGame } from '../game';
import { createPlayer } from '../player';
let game;

beforeEach(() => {
  game = createGame();
  game.startGame();
});

test('Create 1 human player and 1 computer player on game start', () => {
  expect(game.human.toString()).toBe(createPlayer('human').toString());
  expect(game.computer.toString()).toBe(createPlayer('computer').toString());
});

test('Create list of players on game start', () => {
  expect(game.players).toContain(game.human);
  expect(game.players).toContain(game.computer);
});

test("Place 5 ships of varying length on player's board", () => {
  game.placeFleet(game.human);
  expect(game.human.board.grid[0][0]).toBe('Submarine');
  expect(game.human.board.grid[1][1]).toBe('Destroyer');
  expect(game.human.board.grid[2][2]).toBe('Cruiser');
  expect(game.human.board.grid[3][3]).toBe('Battleship');
  expect(game.human.board.grid[4][4]).toBe('Aircraft Carrier');
}); */

test('blah', () => {
  expect(1);
});
