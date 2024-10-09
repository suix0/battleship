import { Ship } from "./ship.js";
import { markShipCoordinates } from "./markShips.js";
import { initializeCoordinates } from "./coordinates.js";

// let a = 0; // These was for testing purposes
// let b = 0;
const Gameboard = () => {
  const totalShips = 17;

  // Create a gameboard
  let gameBoard = [];
  for (let i = 0; i < 10; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      gameBoard[i][j] = null;
    }
  }
  
  const placeShip = (ship) => {
    // Initialize coordinates and get the direction of the ship
    const coordinates = initializeCoordinates(ship.shipLength, gameBoard);
    let [x, y, shipDirection] = [coordinates[0], coordinates[1], coordinates[2]];
    // [a, b] = [x, y];
    // Mark the ship in the board and mark its adjacencies
    gameBoard = markShipCoordinates(x, y, ship, ship.shipLength, shipDirection, gameBoard);
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

  let shipsHit = 0;
  const receiveAttack = (x, y) => {
    if (gameBoard[x][y] !== null && gameBoard[x][y] !== 'X') {
      // Only hit ships that are not yet hit
      gameBoard[x][y].hit();
      shipsHit++;
      return true;
    }
    return false;
  }

  // report whether or not all of their ships have been sunk
  const areShipsSunk = () => {
    return totalShips === shipsHit;
  }
  
  return { gameBoard, placeShip, receiveAttack, areShipsSunk };
}
// const gameboardInstance = Gameboard(); 

export { Gameboard };
