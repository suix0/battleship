import { Gameboard } from "./gameBoard";

const boardToDom = (player, board) => {
  const container = document.querySelector('.main');
  const playerName = player.isPlayer() === true ? 'You' : 'Bot';

  const playerContainer = document.createElement('div');
  const playerNameDom = document.createElement('p');
  playerNameDom.textContent = playerName;

  if (player.isPlayer()) {
    playerContainer.classList.add('boardContainerPlayer');
  } else {
    playerContainer.classList.add('boardContainerBot');
  }

  playerContainer.appendChild(playerNameDom);

  // Create a 10x10 board
  createBoard(player, board, playerContainer);
  container.appendChild(playerContainer);
}

const createBoard = (player, board, container) => {
  // Create a 10x10 board
  const boardDom = document.createElement('div');
  if (player.isPlayer()) {
    boardDom.classList.add('board');
    boardDom.classList.add('player');
  } else {
    boardDom.classList.add('board');
    boardDom.classList.add('bot');
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const boardCell = document.createElement('div');
      if (board[i][j] !== 'X' && board[i][j] !== null) {
        boardCell.classList.add('ship');
      } else {
        boardCell.classList.add('cell');
      }
      boardDom.appendChild(boardCell);
    }
  }
  container.appendChild(boardDom);
}

const randomizeButton = (player) => {
  if (player.isPlayer()) {
    const randomizeBtn = document.createElement('a');
    const playerContainer = document.querySelector('.boardContainerPlayer');
    randomizeBtn.classList.add('randomize');
    randomizeBtn.textContent = 'Randomize'; 
    playerContainer.appendChild(randomizeBtn);

    // Add event listener to randomize ship placement
    randomizeBtn.addEventListener('click', () => {
      player.playerBoard = Gameboard(); 
      const boardPlayer = document.querySelector('.board.player');
      boardPlayer.remove();
      createBoard(player, player.playerBoard.gameBoard, playerContainer);
    })
  }
}

export { boardToDom, randomizeButton }