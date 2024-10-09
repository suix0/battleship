import getShipDirection from "./getShipDirection.js";

const initializeCoordinates = (shipLength, gameBoard) => {
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

const initializeRandomCoordinates = () => {
  let x = parseInt(Math.random() * 10);
  let y = parseInt(Math.random() * 10);
  do {
    x = parseInt(Math.random() * 10);
    y = parseInt(Math.random() * 10);
    const cell = document.querySelector(`.player[data-row="${x}"][data-column="${y}"]`)
    if (!cell.dataset.isHit) {
      break;
    }
  } while (true);
  return [x, y];
}


export { initializeCoordinates, initializeRandomCoordinates };