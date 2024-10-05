import Player from "./player.js";
import { boardToDom, randomizeButton } from "./dom.js";
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