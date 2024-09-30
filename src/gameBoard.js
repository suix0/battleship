import { Ship } from "./ship.js";

const Gameboard = () => {
  // Create a gameboard
  let gameBoard = [];
  for (let i = 0; i < 10; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      gameBoard[i][j] = null;
    }
  }

  const setCoordinates = () => {
    return Math.ceil(Math.random() * 9);
  }

  const placeShip = (ship) => {
    let startingPointX = setCoordinates();
    let startingPointY = setCoordinates();

    // Keep finding random X and Y points a point where no ship is found
    if (gameBoard[startingPointX][startingPointY] !== '') {
      while (gameBoard[startingPointX][startingPointY] !== null) {
        startingPointX = setCoordinates();
        startingPointY = setCoordinates();
      }
    }

    // Optimize the coordinates to make sure that it wont go to undefined
    let directions = {
      leftHorizontal: false,
      rightHorizontal: false,
      upwardVertical: false,
      downwardVertical: false
    }

    let [xCopy1, xCopy2, xCopy3, xCopy4] = [startingPointX, startingPointX, startingPointX, startingPointX];
    let [yCopy1, yCopy2, yCopy3, yCopy4] = [startingPointY, startingPointY, startingPointY, startingPointY];

    for(let i = 0; i < ship.shipLength; i++) {
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

    // Place the ships
    for (let i = 0; i < ship.shipLength; i++) {
      if (shipDirection === 'leftHorizontal') {
        gameBoard[startingPointX][startingPointY--] = ship;
      } else if (shipDirection === 'rightHorizontal') {
        gameBoard[startingPointX][startingPointY++] = ship;
      } else if (shipDirection === 'upwardVertical') {
        gameBoard[startingPointX--][startingPointY] = ship;
      } else if (shipDirection === 'downwardVertical') {
        gameBoard[startingPointX++][startingPointY] = ship;
      }
    }
  }

  // Place a 5-length carrier   
  const carrierShip = Ship();
  carrierShip.shipLength = 5;
  placeShip(carrierShip);
  
  // Place a 4-length battleship
  const battleShip = Ship();
  battleShip.shipLength = 4;
  placeShip(battleShip);

  // Place a 3-length cruiser
  const cruiserShip = Ship();
  cruiserShip.shipLength = 3;
  placeShip(cruiserShip);

  // Place a 3-length submarine
  const submarineShip = Ship();
  submarineShip.shipLength = 3;
  placeShip(submarineShip);

  // Place a 3-length destroyer
  const destroyerShip = Ship();
  destroyerShip.shipLength = 2;
  placeShip(destroyerShip);

  return { gameBoard, placeShip };
}

const gameboardInstance = Gameboard();
console.table(gameboardInstance.gameBoard);

// export { Gameboard };
