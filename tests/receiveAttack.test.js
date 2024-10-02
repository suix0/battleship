import { Gameboard } from '../src/gameBoard';

const gameboard = Gameboard();

test('receiveAttack function should exist', () => {
  expect(typeof gameboard.receiveAttack).toBe('function');
})