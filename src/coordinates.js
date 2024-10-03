import getShipDirection from "./getShipDirection.js";

const initializeCordinates = (shipLength, gameBoard) => {
  let x = Math.ceil(Math.random() * 9);
  let y = Math.ceil(Math.random() * 9);
  let shipDirection = getShipDirection(x, y, shipLength, gameBoard);

  // Continously find x and y coordinates until an optimal baord position
  // is found without non-empty adjacencies with sufficient empty adjacent cells
  // Note: This is implemented with a do-while loop as an insurance as well
  // to ensure that we are getting valid coordinates with possible directions
  do {
    x = Math.ceil(Math.random() * 9);
    y = Math.ceil(Math.random() * 9);
    shipDirection = getShipDirection(x, y, shipLength, gameBoard);
    if (shipDirection !== undefined && gameBoard[x][y] === null) {
      break;
    }
  } while (true);

  return [x, y, shipDirection];
}

export default initializeCordinates;