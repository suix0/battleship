import { gameboardInstance, a, b } from '../src/gameBoard';


test('receiveAttack function should exist', () => {
  expect(typeof gameboardInstance.receiveAttack).toBe('function');
})

// function should properly mark the cell
test('increase the hitCount property of the ship that is hit', () => {
  gameboardInstance.receiveAttack(a, b);
  const value = gameboardInstance.gameBoard[a][b].getHitCount();
  expect(value).toBeGreaterThan(0);
})

test('function should mark the object as hit after receiving attack', () => {
  gameboardInstance.receiveAttack(a, b);
  const value = gameboardInstance.gameBoard[a][b].getHitCount();
  const isHit = gameboardInstance.gameBoard[a][b].isShipHit();
  expect(value).toBeGreaterThan(1);
  expect(isHit).toBe(true);
})