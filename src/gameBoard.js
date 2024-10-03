import { Ship } from "./ship.js";
import { markShipCoordinates } from "./markShips.js";
import initializeCordinates from "./coordinates.js";

const Gameboard = () => {
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
    const coordinates = initializeCordinates(ship.shipLength, gameBoard);
    let [x, y, shipDirection] = [coordinates[0], coordinates[1], coordinates[2]];

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

  const receiveAttack = () => {
    return;
  }


  return { gameBoard, placeShip, receiveAttack };
}

const gameboardInstance = Gameboard(); 
console.table(gameboardInstance.gameBoard);

export { Gameboard };
