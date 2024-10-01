import { markAdjacentCells } from "./shipAdjacencies.js";
import { Ship } from "./ship.js";
import { getShipDirection } from "./shipDirection.js";

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
    if (gameBoard[startingPointX][startingPointY] !== null) {
      while (gameBoard[startingPointX][startingPointY] !== null) {
        startingPointX = setCoordinates();
        startingPointY = setCoordinates();
      }
    }

    const shipDirection = getShipDirection(startingPointX, startingPointY, ship.shipLength, gameBoard);
    
    // Place the ships
    adjacentCoordinates[ship.shipLength] = {
      shipCoordinates: [],
    };

    for (let i = 0; i < ship.shipLength; i++) {
      if (shipDirection === 'leftHorizontal') {
        startingPointY--;
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
      } else if (shipDirection === 'rightHorizontal') {
        startingPointY++;
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
      } else if (shipDirection === 'upwardVertical') {
        startingPointX--;
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
      } else if (shipDirection === 'downwardVertical') {
        startingPointX++;
        gameBoard[startingPointX][startingPointY] = ship;
        adjacentCoordinates[ship.shipLength].shipCoordinates.push([startingPointX, startingPointY]);
      }
    }

    gameBoard = markAdjacentCells(gameBoard, adjacentCoordinates, ship.shipLength, shipDirection);

    console.table(gameBoard);
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
