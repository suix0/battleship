import { markAdjacentCells } from "./shipAdjacencies.js";

const markShipCoordinates = (x, y, ship, shipLength, shipDirection, gameBoard) => {
  // Place the ships
  let shipCoordinates = [];
  for (let i = 0; i < shipLength; i++) {
    if (shipDirection === 'leftHorizontal') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      y--;
    } else if (shipDirection === 'rightHorizontal') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      y++;
    } else if (shipDirection === 'upwardVertical') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      x--;
    } else if (shipDirection === 'downwardVertical') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      x++;
    }
  }
  // Mark adjacent cells after placing ships
  gameBoard = markAdjacentCells(gameBoard, shipCoordinates, shipLength, shipDirection);
  return gameBoard;
}



export { markShipCoordinates };