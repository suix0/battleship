import { Ship } from "./ship.js";

const Gameboard = () => {
  // Create a gameboard
  let gameBoard = [];
  for (let i = 0; i < 10; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      gameBoard[i][j] = '';
    }
  }

  /*
  There is a 10x10 board grid 
  Need to place 5 ships to random parts of the board

  TASK: 
  - Place the ships in the gameboard cells
  - Make sure that ships are not adjacent to each other
  */
    const setCoordinates = () => {
      return Math.ceil(Math.random() * 10);
    }

    const placeShip = (ship) => {
      let startingPointX = setCoordinates();
      let startingPointY = setCoordinates();

      // Keep finding random X and Y points a point where no ship is found
      if (gameBoard[startingPointX][startingPointY] !== '') {
        while (gameBoard[startingPointX][startingPointY] !== '') {
          startingPointX = setCoordinates();
          startingPointY = setCoordinates();
        }
      }
      console.log(gameBoard);
      console.log(startingPointX, startingPointY)

      // Optimize the coordinates to make sure that it wont go to undefined
      let directions = {
        leftHorizontal: false,
        rightHorizontal: false,
        upwardVertical: false,
        downwardVertical: false
      }

      for(let i = 0; i < ship.shipLength; i++) {
        // Check for the left horizontal of the coordinates
        if (gameBoard[startingPointX][startingPointY--] === undefined) {
          directions.leftHorizontal = true;
        }

        // Check for the right horizontal of the coordinates
        if (gameBoard[startingPointX][startingPointY++] === undefined) {
          directions.rightHorizontal = true;
        }

        // Check for the downward vertical of the coordinates
        if (gameBoard[startingPointX--][startingPointY] === undefined) {
          directions.downwardVertical = true;
        }

        if (gameBoard[startingPointX][startingPointY--] === undefined) {
          directions.downwardVertical = true;
        }
      }
      
      const shipDirection = Object.keys(directions).filter((direction) => directions[direction] === false);
      console.log(shipDirection);
      // Place the ships
      // for (let i = 0; i < ship.shipLength; i++) {
      //   if (shipDirection === 'leftHorizontal') {
      //     gameBoard[startingPointX][startingPointY--] = ship;
      //   } else if (shipDirection === 'rightHorizontal') {
      //     gameBoard[startingPointX][startingPointY++] = ship;
      //   } else if (shipDirection === 'upwardVertical') {
      //     gameBoard[startingPointX++][startingPointY] = ship;
      //   } else if (shipDirection === 'downwardVertical') {
      //     gameBoard[startingPointX--][startingPointY++] = ship;
      //   }
      // }
    }

    // Place a 5 length carrier ship
    const carrierShip = Ship();
    carrierShip.shipLength = 5;
    placeShip(carrierShip);
  
  return { gameBoard, placeShip };
}

const gameboardInstance = Gameboard();
console.table(gameboardInstance.gameBoard);

// export { Gameboard };



