import { Gameboard } from "./gameBoard";

const boardToDom = (player, board) => {
  const container = document.querySelector('.main');
  const playerName = player.isPlayer() === true ? 'You' : 'Bot';
  const playerContainer = document.createElement('div');
  const playerNameDom = document.createElement('p');
  
  const boardDom = document.createElement('div');
  if (player.isPlayer()) {
    playerContainer.classList.add('boardContainerPlayer');
    boardDom.classList.add('playerBoard');
  } else {
    playerContainer.classList.add('boardContainerBot');
    boardDom.classList.add('botBoard');
  }
  
  playerNameDom.textContent = playerName;
  playerContainer.appendChild(playerNameDom);

  // Create a 10x10 board
  createBoad(boardDom, board);
  playerContainer.appendChild(boardDom);
  container.appendChild(playerContainer);
}

const createBoad = (boardContainer, board) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const boardCell = document.createElement('div');
      if (board[i][j] !== 'X' && board[i][j] !== null) {
        boardCell.classList.add('ship');
      } else {
        boardCell.classList.add('cell');
      }
      boardContainer.appendChild(boardCell);
    }
  }
}

// Added randomize button
const randomizeButton = (player) => {
  if (player.isPlayer()) {
    const randomizeBtn = document.createElement('a');
    const playerContainer = document.querySelector('.boardContainerPlayer');
    randomizeBtn.classList.add('randomize');
    randomizeBtn.textContent = 'Randomize'; 
    playerContainer.appendChild(randomizeBtn);

    // Add event listener in randomize button to randomize ship placement
    randomizeBtn.addEventListener('click', () => {
      player.playerBoard = Gameboard(); 
      const boardPlayer = document.querySelector('.playerBoard');
      boardPlayer.textContent = '';
      createBoad(boardPlayer, player.playerBoard.gameBoard);
    })
  }
}

export { boardToDom, randomizeButton }