const getShipDirection = (x, y, shipLength, gameBoard) => {
  // Optimize the coordinates to make sure that it wont go to undefined
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
    if ((yCopy1-- > gameBoard.length && yCopy1 < 0 || gameBoard[yCopy1] === undefined) || (gameBoard[xCopy1][yCopy1] === undefined)) {
      directions.leftHorizontal = true;
    }
    // Check right horizontal for out of bound
    if ((yCopy2++ > gameBoard.length && yCopy2 < 0 || gameBoard[yCopy2] === undefined) || (gameBoard[xCopy2][yCopy2] === undefined)) {
        directions.rightHorizontal = true;
    }
    // Check downward vertical for out of bound
    if ((xCopy3++ > gameBoard.length && xCopy3 < 0 || gameBoard[xCopy3] === undefined) || (gameBoard[xCopy3][yCopy3] === undefined)) {
      directions.downwardVertical = true;
    }
    // Check upward vertical for out of bound
    if ((xCopy4-- > gameBoard.length && xCopy4 < 0 || gameBoard[xCopy4] === undefined) || (gameBoard[xCopy4][yCopy4] === undefined)) {
      directions.upwardVertical = true;
    }
  }

  let shipDirection = Object.keys(directions).filter((direction) => directions[direction] === false);
  shipDirection = shipDirection[parseInt(Math.random() * (shipDirection.length))];
  return shipDirection;
}

export { getShipDirection };