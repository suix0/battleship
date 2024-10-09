import { Gameboard } from "./gameBoard.js";

const Player = () => {
  let player = true;

  const playerBoard = Gameboard();
  
  const isBot = () => {
    player = false;
  }

  const isPlayer = () => {
    return player;
  }
  
  return { playerBoard, isPlayer, isBot }
}

export default Player