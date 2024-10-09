import initializeCoordinates from "../src/coordinates";
import { Gameboard } from "../src/gameBoard";

test('initializeCoordinates function should exist', () => {
  expect(typeof initializeCoordinates).toBe('function');
})

test('generate valid coordinates in a 5-length ship', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCoordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  expect(gameboardObject.gameBoard[x][y]).not.toBeUndefined();
})

test('generate valid coordinates in a 4-length ship', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCoordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  expect(gameboardObject.gameBoard[x][y]).not.toBeUndefined();
})


test('generate valid coordinates in a 3-length ship', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCoordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  expect(gameboardObject.gameBoard[x][y]).not.toBeUndefined();
})

test('generate valid coordinates in a 2-length ship', () => {
  const gameboardObject = Gameboard();
  expect(gameboardObject.gameBoard[3][2]).not.toBeUndefined();
})