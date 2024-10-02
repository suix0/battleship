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

const getShipDirection = (x, y, shipLength, gameBoard) => {
  let directions = {
    leftHorizontal: false,
    rightHorizontal: false,
    upwardVertical: false,
    downwardVertical: false
  }

  let [xCopy1, xCopy2, xCopy3, xCopy4] = [x, x, x, x];
  let [yCopy1, yCopy2, yCopy3, yCopy4] = [y, y, y, y];

  for(let i = 0; i < shipLength; i++) {
    // Check left horizontal for out of bound
    if ((yCopy1-- < gameBoard.length && yCopy1 > 0 && gameBoard[yCopy1] !== undefined) && (gameBoard[xCopy1][yCopy1] !== undefined)) {
      // Check for adjacencies and for ships in left horizontal
      if (gameBoard[xCopy1][yCopy1] !== null) {
        directions.leftHorizontal = true;
      }
    } else {
      directions.leftHorizontal = true;
    }
    // Check right horizontal for out of bound
    if ((yCopy2++ < gameBoard.length && yCopy2 > 0 && gameBoard[yCopy2] !== undefined) && (gameBoard[xCopy2][yCopy2] !== undefined)) {
      // Check for adjacencies and for ships in right horizontal
      if (gameBoard[xCopy2][yCopy2] !== null) {
        directions.rightHorizontal = true;
      }
    } else {
      directions.rightHorizontal = true;
    }
    // Check downward vertical for out of bound
    if ((xCopy3++ < gameBoard.length && xCopy3 > 0 && gameBoard[xCopy3] !== undefined) && (gameBoard[xCopy3][yCopy3] !== undefined)) {
      // Check for adjacencies and for ships in downward vertical
      if (gameBoard[xCopy3][yCopy3] !== null) {
        directions.downwardVertical = true;
      }
    } else {
      directions.downwardVertical = true;
    }
    // Check upward vertical for out of bound
    if ((xCopy4-- < gameBoard.length && xCopy4 > 0 && gameBoard[xCopy4] !== undefined) && (gameBoard[xCopy4][yCopy4] !== undefined)) {
      // Check for adjacencies and for ships in upwardVerticalvertical
      if (gameBoard[xCopy4][yCopy4] !== null) {
        directions.upwardVertical = true;
      }
    } else {
      directions.upwardVertical = true;
    }
  }
  let shipDirection = Object.keys(directions).filter((direction) => directions[direction] === false);
  shipDirection = shipDirection[parseInt(Math.random() * (shipDirection.length))];
  return shipDirection;
} 


export { markShipCoordinates, getShipDirection };