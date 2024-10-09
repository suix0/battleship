import Player from "./player.js";
import { boardToDom, randomizeButton, receiveAttackDom } from "./dom.js";
import { initializeRandomCoordinates } from "./coordinates.js";
import './styles.css';

// Initialize player and bot
const player = Player();
const bot = Player();
bot.isBot();

// Convert the board of player and bot to the DOM
boardToDom(player, player.playerBoard.gameBoard);
boardToDom(bot, bot.playerBoard.gameBoard);

// Add randomize button
randomizeButton(player);

const cellCallbacks = new Map(); // Initialize storage for callbacks of each cell

// Start game after clicking play button
const startBtn = document.querySelector('button');
startBtn.addEventListener('click', () => {
  // Hide the button
  const randomizeBtn = document.querySelector('.randomize');
  startBtn.style.opacity = '0';
  randomizeBtn.style.opacity = '0';
  startBtn.style.pointerEvents = 'none';
  randomizeBtn.style.pointerEvents = 'none';
  // Add event listeners to enemy cells to receive attacks
  const botCells = document.querySelectorAll('.bot');
  const botCellsArr = [...botCells];
  botCellsArr.map((cell) => {
    cell.style.cursor = 'pointer'; // Make the cells interactive
    const callback = () => cellAttackCallback(bot, player, cell);
    cellCallbacks.set(cell, callback); // Store the cell and its corresponding callback
    cell.addEventListener('click', callback);
  })
  console.log(cellCallbacks);
})

const cellAttackCallback = (bot, player, cell) => {
  // Mark the bot gameboard
  receiveAttackDom(bot, cell);

  // Get the corresponding callback of the cell in the map
  const callback = cellCallbacks.get(cell);
  cell.style.cursor = 'default';

  // Remove the event listener to the cell
  cell.removeEventListener('click', callback);

  // Receive attacks from bot
  const randomCoordinates = initializeRandomCoordinates();
  const botAttackRow = randomCoordinates[0];
  const botAttackColumn = randomCoordinates[1];
  const playerCell = document.querySelector(`[data-row="${botAttackRow}"][data-column="${botAttackColumn}"]`);
  receiveAttackDom(player, playerCell);
}

export { cellCallbacks };