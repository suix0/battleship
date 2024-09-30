import { markAdjacentCells } from "./optimizeGameboard.js";
import { Ship } from "./ship.js";
import { findShipDirection } from "./shipDirection.js";
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
  
  let adjacentCoordinates = {};

  const placeShip = (ship) => {
    let startingPointX = setCoordinates();
    let startingPointY = setCoordinates();
    
    // Keep finding until random X and Y points a point where no ship is found
    if (gameBoard[startingPointX][startingPointY] !== '') {
      while (gameBoard[startingPointX][startingPointY] !== null) {
        startingPointX = setCoordinates();
        startingPointY = setCoordinates();
      }
    }

    const shipDirection = findShipDirection(startingPointX, startingPointY, ship.shipLength, gameBoard);
    
    // Place the ships
    adjacentCoordinates[ship.shipLength] = {
      shipCoordinates: [],
    };
    for (let i = 0; i < ship.shipLength; i++) {
      if (shipDirection === 'leftHorizontal') {
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
        startingPointY--

      } else if (shipDirection === 'rightHorizontal') {
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
        startingPointY++;
      } else if (shipDirection === 'upwardVertical') {
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
        startingPointX--
      } else if (shipDirection === 'downwardVertical') {
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
        startingPointX--
      }
    }
    console.log(adjacentCoordinates[ship.shipLength].shipCoordinates)

    gameBoard = markAdjacentCells(gameBoard, adjacentCoordinates, ship.shipLength, shipDirection);
  }

  // Place a 5-length carrier   
  const carrierShip = Ship();
  carrierShip.shipLength = 5;
  placeShip(carrierShip);
  
  // // Place a 4-length battleship
  // const battleShip = Ship();
  // battleShip.shipLength = 4;
  // placeShip(battleShip);

  // // Place a 3-length cruiser
  // const cruiserShip = Ship();
  // cruiserShip.shipLength = 3;
  // placeShip(cruiserShip);

  // // Place a 3-length submarine
  // const submarineShip = Ship();
  // submarineShip.shipLength = 3;
  // placeShip(submarineShip);

  // // Place a 3-length destroyer
  // const destroyerShip = Ship();
  // destroyerShip.shipLength = 2;
  // placeShip(destroyerShip);

  return { gameBoard, placeShip };
}

const gameboardInstance = Gameboard();
console.table(gameboardInstance.gameBoard);

// export { Gameboard };
