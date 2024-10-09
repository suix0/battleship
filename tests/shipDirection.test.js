import getShipDirection from "../src/getShipDirection";
import initializeCordinates from "../src/coordinates";
import { Gameboard } from "../src/gameBoard";

test('getShipDirection function exists', () => {
  expect(typeof getShipDirection).toBe('function');
})

test('getShipDirection should return at least one possible direction given a random coordinate - 1st test', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  const shipDirection = getShipDirection(x, y, 5, gameboardObject.gameBoard);
  expect(shipDirection).not.toBeUndefined();
})

test('getShipDirection should return at least one possible direction given a random coordinate - 2nd test', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  const shipDirection = getShipDirection(x, y, 5, gameboardObject.gameBoard);
  expect(shipDirection).not.toBeUndefined();
})

test('getShipDirection should return at least one possible direction given a random coordinate - 3rd test', () => {
  const gameboardObject = Gameboard();
  const coordinates = initializeCordinates(5, gameboardObject.gameBoard);
  const x = coordinates[0];
  const y = coordinates[1];
  const shipDirection = getShipDirection(x, y, 5, gameboardObject.gameBoard);
  expect(shipDirection).not.toBeUndefined();
})