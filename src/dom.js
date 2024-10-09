import { cellCallbacks } from "./index";
import { Gameboard } from "./gameBoard";
import x from './assets/close-outline.svg';
import circle from './assets/circle.svg';

const boardToDom = (player, board) => {
  const container = document.querySelector('.main');
  const playerName = player.isPlayer() === true ? 'YOU' : 'BOT';
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
  createBoad(player.isPlayer(), boardDom, board);
  playerContainer.appendChild(boardDom);
  container.appendChild(playerContainer);
}

const createBoad = (isPlayer, boardContainer, board) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const boardCell = document.createElement('div');
      if (board[i][j] !== 'X' && board[i][j] !== null) {
        boardCell.classList.add('ship');
      }
      // Mark identifier to enemy cells
      if (isPlayer === false) {
        boardCell.classList.add('bot');
      } else {
        boardCell.classList.add('player');
      }
      boardCell.classList.add('cell');
      boardCell.dataset.row = i; // Add row data in cell
      boardCell.dataset.column = j; // Add column data in cell
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
      createBoad(player.isPlayer(), boardPlayer, player.playerBoard.gameBoard);
    })
  }
}

const displayWinner = (player) => {
  // Display modal the winner
  const modal = document.querySelector('dialog');
  const winnerText = document.createElement('p');
  if (player.isPlayer()) {
    winnerText.textContent = 'YOU LOSE!';
  } else {
    winnerText.textContent = 'YOU WIN!';
  }
  modal.appendChild(winnerText);
  const startBtn = document.querySelector('button');
  startBtn.remove();
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'CLOSE';
  modal.appendChild(closeButton);
  closeButton.addEventListener('click', () => modal.close());
  modal.showModal();
}

const receiveAttackDom = (player, cell) => {
  // Get the row and column info on cell
  const row = parseInt(cell.dataset.row);
  const column = parseInt(cell.dataset.column);
  if (!cell.dataset.isHit) { // Receive attacks only to non attacked ships
    
    // If it hits a ship
    // Mark the corresponding cell in the original gameboard as hit
    const attack = player.playerBoard.receiveAttack(row, column);
    
    // Mark the cell in the board as X
    if (attack === true) { // Meaning that the attack hit a ship
      const crossSvg = document.createElement('img');
      crossSvg.src = x; 
      cell.appendChild(crossSvg);
    } else {
      // Otherwise, mark the enemy cell with a dot
      const dotSvg = document.createElement('img');
      dotSvg.src = circle;
      cell.appendChild(dotSvg);
    }
  }
  cell.dataset.isHit = true; // Mark the cell as hit
  
  // Check if ships are sunk after an attack
  if (player.playerBoard.areShipsSunk()) {
    // Remove event listeners to all cells
    const botCells = document.querySelectorAll('.bot');
    botCells.forEach((cells) => {
      const callback = cellCallbacks.get(cells);
      cells.removeEventListener('click', callback);
      cells.style.cursor = 'default';
    })
  
    // Display modal the winner
    displayWinner(player);
  
    // Add restart button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'PLAY AGAIN';
    restartBtn.addEventListener('click', () => {
      window.location.reload();
    })
    document.body.appendChild(restartBtn);
  }
}



export { boardToDom, randomizeButton, receiveAttackDom }