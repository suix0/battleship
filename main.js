/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/coordinates.js":
/*!****************************!*\
  !*** ./src/coordinates.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeCoordinates: () => (/* binding */ initializeCoordinates),
/* harmony export */   initializeRandomCoordinates: () => (/* binding */ initializeRandomCoordinates)
/* harmony export */ });
/* harmony import */ var _getShipDirection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getShipDirection.js */ "./src/getShipDirection.js");

var initializeCoordinates = function initializeCoordinates(shipLength, gameBoard) {
  var x = Math.ceil(Math.random() * 9);
  var y = Math.ceil(Math.random() * 9);
  var shipDirection = (0,_getShipDirection_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y, shipLength, gameBoard);

  // Continously find x and y coordinates until an optimal baord position
  // is found without non-empty adjacencies with sufficient empty adjacent cells
  // Note: This is implemented with a do-while loop as an insurance as well
  // to ensure that we are getting valid coordinates with possible directions
  do {
    x = Math.ceil(Math.random() * 9);
    y = Math.ceil(Math.random() * 9);
    shipDirection = (0,_getShipDirection_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y, shipLength, gameBoard);
    if (shipDirection !== undefined && gameBoard[x][y] === null) {
      break;
    }
  } while (true);
  return [x, y, shipDirection];
};
var initializeRandomCoordinates = function initializeRandomCoordinates() {
  var x = parseInt(Math.random() * 10);
  var y = parseInt(Math.random() * 10);
  do {
    x = parseInt(Math.random() * 10);
    y = parseInt(Math.random() * 10);
    var cell = document.querySelector(".player[data-row=\"".concat(x, "\"][data-column=\"").concat(y, "\"]"));
    if (!cell.dataset.isHit) {
      break;
    }
  } while (true);
  return [x, y];
};


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boardToDom: () => (/* binding */ boardToDom),
/* harmony export */   randomizeButton: () => (/* binding */ randomizeButton),
/* harmony export */   receiveAttackDom: () => (/* binding */ receiveAttackDom)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _assets_close_outline_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/close-outline.svg */ "./src/assets/close-outline.svg");
/* harmony import */ var _assets_circle_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/circle.svg */ "./src/assets/circle.svg");




var boardToDom = function boardToDom(player, board) {
  var container = document.querySelector('.main');
  var playerName = player.isPlayer() === true ? 'YOU' : 'BOT';
  var playerContainer = document.createElement('div');
  var playerNameDom = document.createElement('p');
  var boardDom = document.createElement('div');
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
};
var createBoad = function createBoad(isPlayer, boardContainer, board) {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var boardCell = document.createElement('div');
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
};

// Added randomize button
var randomizeButton = function randomizeButton(player) {
  if (player.isPlayer()) {
    var randomizeBtn = document.createElement('a');
    var playerContainer = document.querySelector('.boardContainerPlayer');
    randomizeBtn.classList.add('randomize');
    randomizeBtn.textContent = 'Randomize';
    playerContainer.appendChild(randomizeBtn);

    // Add event listener in randomize button to randomize ship placement
    randomizeBtn.addEventListener('click', function () {
      player.playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
      var boardPlayer = document.querySelector('.playerBoard');
      boardPlayer.textContent = '';
      createBoad(player.isPlayer(), boardPlayer, player.playerBoard.gameBoard);
    });
  }
};
var displayWinner = function displayWinner(player) {
  // Display modal the winner
  var modal = document.querySelector('dialog');
  var winnerText = document.createElement('p');
  if (player.isPlayer()) {
    winnerText.textContent = 'YOU LOSE!';
  } else {
    winnerText.textContent = 'YOU WIN!';
  }
  modal.appendChild(winnerText);
  var startBtn = document.querySelector('button');
  startBtn.remove();
  var closeButton = document.createElement('button');
  closeButton.textContent = 'CLOSE';
  modal.appendChild(closeButton);
  closeButton.addEventListener('click', function () {
    return modal.close();
  });
  modal.showModal();
};
var receiveAttackDom = function receiveAttackDom(player, cell) {
  // Get the row and column info on cell
  var row = parseInt(cell.dataset.row);
  var column = parseInt(cell.dataset.column);
  if (!cell.dataset.isHit) {
    // Receive attacks only to non attacked ships

    // If it hits a ship
    // Mark the corresponding cell in the original gameboard as hit
    var attack = player.playerBoard.receiveAttack(row, column);

    // Mark the cell in the board as X
    if (attack === true) {
      // Meaning that the attack hit a ship
      var crossSvg = document.createElement('img');
      crossSvg.src = _assets_close_outline_svg__WEBPACK_IMPORTED_MODULE_2__;
      cell.appendChild(crossSvg);
    } else {
      // Otherwise, mark the enemy cell with a dot
      var dotSvg = document.createElement('img');
      dotSvg.src = _assets_circle_svg__WEBPACK_IMPORTED_MODULE_3__;
      cell.appendChild(dotSvg);
    }
  }
  cell.dataset.isHit = true; // Mark the cell as hit

  // Check if ships are sunk after an attack
  if (player.playerBoard.areShipsSunk()) {
    // Remove event listeners to all cells
    var botCells = document.querySelectorAll('.bot');
    botCells.forEach(function (cells) {
      var callback = _index__WEBPACK_IMPORTED_MODULE_0__.cellCallbacks.get(cells);
      cells.removeEventListener('click', callback);
      cells.style.cursor = 'default';
    });

    // Display modal the winner
    displayWinner(player);

    // Add restart button
    var restartBtn = document.createElement('button');
    restartBtn.textContent = 'PLAY AGAIN';
    restartBtn.addEventListener('click', function () {
      window.location.reload();
    });
    document.body.appendChild(restartBtn);
  }
};


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _markShips_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markShips.js */ "./src/markShips.js");
/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coordinates.js */ "./src/coordinates.js");




// let a = 0; // These was for testing purposes
// let b = 0;
var Gameboard = function Gameboard() {
  var totalShips = 17;

  // Create a gameboard
  var gameBoard = [];
  for (var i = 0; i < 10; i++) {
    gameBoard[i] = [];
    for (var j = 0; j < 10; j++) {
      gameBoard[i][j] = null;
    }
  }
  var placeShip = function placeShip(ship) {
    // Initialize coordinates and get the direction of the ship
    var coordinates = (0,_coordinates_js__WEBPACK_IMPORTED_MODULE_2__.initializeCoordinates)(ship.shipLength, gameBoard);
    var _ref = [coordinates[0], coordinates[1], coordinates[2]],
      x = _ref[0],
      y = _ref[1],
      shipDirection = _ref[2];
    // [a, b] = [x, y];
    // Mark the ship in the board and mark its adjacencies
    gameBoard = (0,_markShips_js__WEBPACK_IMPORTED_MODULE_1__.markShipCoordinates)(x, y, ship, ship.shipLength, shipDirection, gameBoard);
  };

  // Place a 5-length carrier   
  var carrierShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)();
  carrierShip.shipLength = 5;
  placeShip(carrierShip);

  // Place a 4-length battleship
  var battleShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)();
  battleShip.shipLength = 4;
  placeShip(battleShip);

  // Place a 3-length cruiser
  var cruiserShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)();
  cruiserShip.shipLength = 3;
  placeShip(cruiserShip);

  // Place a 3-length submarine
  var submarineShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)();
  submarineShip.shipLength = 3;
  placeShip(submarineShip);

  // Place a 3-length destroyer
  var destroyerShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)();
  destroyerShip.shipLength = 2;
  placeShip(destroyerShip);
  var shipsHit = 0;
  var receiveAttack = function receiveAttack(x, y) {
    if (gameBoard[x][y] !== null && gameBoard[x][y] !== 'X') {
      // Only hit ships that are not yet hit
      gameBoard[x][y].hit();
      shipsHit++;
      return true;
    }
    return false;
  };

  // report whether or not all of their ships have been sunk
  var areShipsSunk = function areShipsSunk() {
    return totalShips === shipsHit;
  };
  return {
    gameBoard: gameBoard,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    areShipsSunk: areShipsSunk
  };
};
// const gameboardInstance = Gameboard(); 



/***/ }),

/***/ "./src/getShipDirection.js":
/*!*********************************!*\
  !*** ./src/getShipDirection.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getShipDirection = function getShipDirection(x, y, shipLength, gameBoard) {
  var directions = {
    leftHorizontal: false,
    rightHorizontal: false,
    upwardVertical: false,
    downwardVertical: false
  };
  var xCopy1 = x,
    xCopy2 = x,
    xCopy3 = x,
    xCopy4 = x;
  var yCopy1 = y,
    yCopy2 = y,
    yCopy3 = y,
    yCopy4 = y;
  for (var i = 0; i < shipLength; i++) {
    // Check left horizontal for out of bound
    if (yCopy1 < gameBoard.length && yCopy1 >= 0 && gameBoard[yCopy1] !== undefined && gameBoard[xCopy1][yCopy1] !== undefined) {
      // Check for adjacencies and for ships in left horizontal
      if (gameBoard[xCopy1][yCopy1] !== null) {
        directions.leftHorizontal = true;
      }
    } else {
      directions.leftHorizontal = true;
    }
    // Check right horizontal for out of bound
    if (yCopy2 < gameBoard.length && yCopy2 >= 0 && gameBoard[yCopy2] !== undefined && gameBoard[xCopy2][yCopy2] !== undefined) {
      // Check for adjacencies and for ships in right horizontal
      if (gameBoard[xCopy2][yCopy2] !== null) {
        directions.rightHorizontal = true;
      }
    } else {
      directions.rightHorizontal = true;
    }
    // Check downward vertical for out of bound
    if (xCopy3 < gameBoard.length && xCopy3 >= 0 && gameBoard[xCopy3] !== undefined && gameBoard[xCopy3][yCopy3] !== undefined) {
      // Check for adjacencies and for ships in downward vertical
      if (gameBoard[xCopy3][yCopy3] !== null) {
        directions.downwardVertical = true;
      }
    } else {
      directions.downwardVertical = true;
    }
    // Check upward vertical for out of bound
    if (xCopy4 < gameBoard.length && xCopy4 >= 0 && gameBoard[xCopy4] !== undefined && gameBoard[xCopy4][yCopy4] !== undefined) {
      // Check for adjacencies and for ships in upwardVerticalvertical
      if (gameBoard[xCopy4][yCopy4] !== null) {
        directions.upwardVertical = true;
      }
    } else {
      directions.upwardVertical = true;
    }
    --yCopy1;
    ++yCopy2;
    ++xCopy3;
    --xCopy4;
  }
  var shipDirection = Object.keys(directions).filter(function (direction) {
    return directions[direction] === false;
  });
  shipDirection = shipDirection[parseInt(Math.random() * shipDirection.length)];
  return shipDirection;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getShipDirection);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cellCallbacks: () => (/* binding */ cellCallbacks)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coordinates.js */ "./src/coordinates.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





// Initialize player and bot
var player = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
var bot = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
bot.isBot();

// Convert the board of player and bot to the DOM
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.boardToDom)(player, player.playerBoard.gameBoard);
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.boardToDom)(bot, bot.playerBoard.gameBoard);

// Add randomize button
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.randomizeButton)(player);
var cellCallbacks = new Map(); // Initialize storage for callbacks of each cell

// Start game after clicking play button
var startBtn = document.querySelector('button');
startBtn.addEventListener('click', function () {
  // Hide the button
  var randomizeBtn = document.querySelector('.randomize');
  startBtn.style.opacity = '0';
  randomizeBtn.style.opacity = '0';
  startBtn.style.pointerEvents = 'none';
  randomizeBtn.style.pointerEvents = 'none';
  // Add event listeners to enemy cells to receive attacks
  var botCells = document.querySelectorAll('.bot');
  var botCellsArr = _toConsumableArray(botCells);
  botCellsArr.map(function (cell) {
    cell.style.cursor = 'pointer'; // Make the cells interactive
    var callback = function callback() {
      return cellAttackCallback(bot, player, cell);
    };
    cellCallbacks.set(cell, callback); // Store the cell and its corresponding callback
    cell.addEventListener('click', callback);
  });
  console.log(cellCallbacks);
});
var cellAttackCallback = function cellAttackCallback(bot, player, cell) {
  // Mark the bot gameboard
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.receiveAttackDom)(bot, cell);

  // Get the corresponding callback of the cell in the map
  var callback = cellCallbacks.get(cell);
  cell.style.cursor = 'default';

  // Remove the event listener to the cell
  cell.removeEventListener('click', callback);

  // Receive attacks from bot
  var randomCoordinates = (0,_coordinates_js__WEBPACK_IMPORTED_MODULE_2__.initializeRandomCoordinates)();
  var botAttackRow = randomCoordinates[0];
  var botAttackColumn = randomCoordinates[1];
  var playerCell = document.querySelector("[data-row=\"".concat(botAttackRow, "\"][data-column=\"").concat(botAttackColumn, "\"]"));
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.receiveAttackDom)(player, playerCell);
};


/***/ }),

/***/ "./src/markShips.js":
/*!**************************!*\
  !*** ./src/markShips.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   markShipCoordinates: () => (/* binding */ markShipCoordinates)
/* harmony export */ });
/* harmony import */ var _shipAdjacencies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipAdjacencies.js */ "./src/shipAdjacencies.js");

var markShipCoordinates = function markShipCoordinates(x, y, ship, shipLength, shipDirection, gameBoard) {
  // Place the ships
  var shipCoordinates = [];
  for (var i = 0; i < shipLength; i++) {
    if (shipDirection === 'leftHorizontal') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      y--;
    } else if (shipDirection === 'rightHorizontal') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      y++;
    } else if (shipDirection === 'upwardVertical') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      x--;
    } else if (shipDirection === 'downwardVertical') {
      gameBoard[x][y] = ship;
      shipCoordinates.push([x, y]);
      x++;
    }
  }
  // Mark adjacent cells after placing ships
  gameBoard = (0,_shipAdjacencies_js__WEBPACK_IMPORTED_MODULE_0__.markAdjacentCells)(gameBoard, shipCoordinates, shipLength, shipDirection);
  return gameBoard;
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard.js */ "./src/gameBoard.js");

var Player = function Player() {
  var player = true;
  var playerBoard = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  var isBot = function isBot() {
    player = false;
  };
  var isPlayer = function isPlayer() {
    return player;
  };
  return {
    playerBoard: playerBoard,
    isPlayer: isPlayer,
    isBot: isBot
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
var Ship = function Ship() {
  var shipLength;
  var hitCount = 0;
  var hit = function hit() {
    hitCount++;
  };
  var isSunk = function isSunk() {
    return shipLength === hitCount;
  };
  var getHitCount = function getHitCount() {
    return hitCount;
  };
  return {
    shipLength: shipLength,
    getHitCount: getHitCount,
    hit: hit,
    isSunk: isSunk
  };
};

/***/ }),

/***/ "./src/shipAdjacencies.js":
/*!********************************!*\
  !*** ./src/shipAdjacencies.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   markAdjacentCells: () => (/* binding */ markAdjacentCells)
/* harmony export */ });
var markAdjacentCells = function markAdjacentCells(gameboard, shipCoordinates, shipLength, direction) {
  // Get the x and y coordinates of and store themseparately 
  var x1 = shipCoordinates[0][0];
  var y1 = shipCoordinates[0][1];
  var x2 = x1;
  var y2 = y1;
  // Mark adjacencies in the board for horizontal ship placement 
  if (direction.includes('Horizontal')) {
    if (direction.includes('left')) {
      --x1;
      ++y1;
      ++x2;
      ++y2;
    } else {
      --x1;
      --y1;
      ++x2;
      --y2;
    }
    for (var i = 0; i < shipLength + 2; i++) {
      if (gameboard[y1] !== undefined) {
        if (i === 0 || i === shipLength + 1) {
          gameboard[++x1][y1] = 'X';
          --x1;
        }
      }
      // Mark the adjacencies by incrementing or decrementing y depending on direction
      if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
        direction.includes('left') ? gameboard[x1][y1--] = 'X' : gameboard[x1][y1++] = 'X';
      } else {
        direction.includes('left') ? y1-- : y1++;
      }
      if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
        direction.includes('left') ? gameboard[x2][y2--] = 'X' : gameboard[x2][y2++] = 'X';
      } else {
        direction.includes('left') ? y2-- : y2++;
      }
    }
  } else if (direction.includes('Vertical')) {
    if (direction.includes('upward')) {
      ++x1;
      --y1;
      ++x2;
      ++y2;
    } else {
      --x1;
      --y1;
      --x2;
      ++y2;
    }
    for (var _i = 0; _i < shipLength + 2; _i++) {
      if (gameboard[x1] !== undefined) {
        if (_i === 0 || _i === shipLength + 1) {
          gameboard[x1][++y1] = 'X';
          --y1;
        }
      }
      // Mark the adjacencies by incrementing or decrementing x depending on direction
      if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
        direction.includes('upward') ? gameboard[x1--][y1] = 'X' : gameboard[x1++][y1] = 'X';
      } else {
        direction.includes('upward') ? x1-- : x1++;
      }
      if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
        direction.includes('upward') ? gameboard[x2--][y2] = 'X' : gameboard[x2++][y2] = 'X';
      } else {
        direction.includes('upward') ? x2-- : x2++;
      }
    }
  }
  return gameboard;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
}

:root {
  --bg-clr: #27374D;
  --scnd-clr: #526D82;
  --thrd-clr: #9DB2BF;
  --last-clr: #DDE6ED;
}

body {
  margin: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Lora', serif;
  background-color: var(--scnd-clr);
  color: var(--last-clr);
}

a {
  font-size: 1.5rem;
  user-select: none;
}

p {
  font-size: 2rem;
  margin: 0;
}

header {
  font-size: 4rem;
  width: 100%;
  background-color: var(--bg-clr);
  text-align: center;
  padding: 1rem;  
  text-shadow: 3px 3px 3px var(--scnd-clr);
}

button {
  margin-bottom: 6rem;
  padding: 0.8rem;
  width: 15rem;
  font-size: 2rem;
  border: none;
  border-radius: 30px;
  background-color: var(--bg-clr);
  color: var(--last-clr);
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.75);
  cursor: pointer;
  font-family: 'Lora', serif;;
}

button:hover {
  background-color: #3c4e67;
}

img {
  width: 100%;
  height: 100%;
  filter: opacity(0.5) drop-shadow(0 0 0 rgb(37, 119, 154));
}

dialog {
  gap: 1rem;
  border: 0;
  border-radius: 1rem;
}

dialog p {
  text-align: center;
}

dialog button {
  margin: 0;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}

.main {
  display: flex;
  margin: auto;
  gap: 8rem;
}

.boardContainerPlayer,
.boardContainerBot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 2rem;
}


.playerBoard,
.botBoard {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.randomize {
  cursor: pointer;
  text-decoration: underline;
}

.cell,
.ship {
  width: 48px;
  height: 48px;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.75);
}

.cell {
  border: 1px solid var(--thrd-clr);
}

.player.ship {
  border: 1px solid var(--last-clr);
  background-color: var(--thrd-clr);
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,mBAAmB;EACnB,0BAA0B;EAC1B,iCAAiC;EACjC,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,SAAS;AACX;;AAEA;EACE,eAAe;EACf,WAAW;EACX,+BAA+B;EAC/B,kBAAkB;EAClB,aAAa;EACb,wCAAwC;AAC1C;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,mBAAmB;EACnB,+BAA+B;EAC/B,sBAAsB;EACtB,0CAA0C;EAC1C,eAAe;EACf,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yDAAyD;AAC3D;;AAEA;EACE,SAAS;EACT,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,SAAS;EACT,eAAe;EACf,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,SAAS;AACX;;;AAGA;;EAEE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,eAAe;EACf,0BAA0B;AAC5B;;AAEA;;EAEE,WAAW;EACX,YAAY;EACZ,0CAA0C;AAC5C;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;EACjC,iCAAiC;AACnC","sourcesContent":["* {\n  box-sizing: border-box;\n}\n\n:root {\n  --bg-clr: #27374D;\n  --scnd-clr: #526D82;\n  --thrd-clr: #9DB2BF;\n  --last-clr: #DDE6ED;\n}\n\nbody {\n  margin: 0;\n  height: 100svh;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  font-family: 'Lora', serif;\n  background-color: var(--scnd-clr);\n  color: var(--last-clr);\n}\n\na {\n  font-size: 1.5rem;\n  user-select: none;\n}\n\np {\n  font-size: 2rem;\n  margin: 0;\n}\n\nheader {\n  font-size: 4rem;\n  width: 100%;\n  background-color: var(--bg-clr);\n  text-align: center;\n  padding: 1rem;  \n  text-shadow: 3px 3px 3px var(--scnd-clr);\n}\n\nbutton {\n  margin-bottom: 6rem;\n  padding: 0.8rem;\n  width: 15rem;\n  font-size: 2rem;\n  border: none;\n  border-radius: 30px;\n  background-color: var(--bg-clr);\n  color: var(--last-clr);\n  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.75);\n  cursor: pointer;\n  font-family: 'Lora', serif;;\n}\n\nbutton:hover {\n  background-color: #3c4e67;\n}\n\nimg {\n  width: 100%;\n  height: 100%;\n  filter: opacity(0.5) drop-shadow(0 0 0 rgb(37, 119, 154));\n}\n\ndialog {\n  gap: 1rem;\n  border: 0;\n  border-radius: 1rem;\n}\n\ndialog p {\n  text-align: center;\n}\n\ndialog button {\n  margin: 0;\n  font-size: 1rem;\n  padding: 1rem;\n  border-radius: 1rem;\n}\n\n.main {\n  display: flex;\n  margin: auto;\n  gap: 8rem;\n}\n\n.boardContainerPlayer,\n.boardContainerBot {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n  gap: 2rem;\n}\n\n\n.playerBoard,\n.botBoard {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.randomize {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.cell,\n.ship {\n  width: 48px;\n  height: 48px;\n  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.75);\n}\n\n.cell {\n  border: 1px solid var(--thrd-clr);\n}\n\n.player.ship {\n  border: 1px solid var(--last-clr);\n  background-color: var(--thrd-clr);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/circle.svg":
/*!*******************************!*\
  !*** ./src/assets/circle.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4e0ce69df23a0f0a3866.svg";

/***/ }),

/***/ "./src/assets/close-outline.svg":
/*!**************************************!*\
  !*** ./src/assets/close-outline.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d52520a3a9996e6c9a24.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb29yZGluYXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dldFNoaXBEaXJlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmtTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwQWRqYWNlbmNpZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2V0U2hpcERpcmVjdGlvbiBmcm9tIFwiLi9nZXRTaGlwRGlyZWN0aW9uLmpzXCI7XG5cbmNvbnN0IGluaXRpYWxpemVDb29yZGluYXRlcyA9IChzaGlwTGVuZ3RoLCBnYW1lQm9hcmQpID0+IHtcbiAgbGV0IHggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDkpO1xuICBsZXQgeSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogOSk7XG5cbiAgbGV0IHNoaXBEaXJlY3Rpb24gPSBnZXRTaGlwRGlyZWN0aW9uKHgsIHksIHNoaXBMZW5ndGgsIGdhbWVCb2FyZCk7XG5cbiAgLy8gQ29udGlub3VzbHkgZmluZCB4IGFuZCB5IGNvb3JkaW5hdGVzIHVudGlsIGFuIG9wdGltYWwgYmFvcmQgcG9zaXRpb25cbiAgLy8gaXMgZm91bmQgd2l0aG91dCBub24tZW1wdHkgYWRqYWNlbmNpZXMgd2l0aCBzdWZmaWNpZW50IGVtcHR5IGFkamFjZW50IGNlbGxzXG4gIC8vIE5vdGU6IFRoaXMgaXMgaW1wbGVtZW50ZWQgd2l0aCBhIGRvLXdoaWxlIGxvb3AgYXMgYW4gaW5zdXJhbmNlIGFzIHdlbGxcbiAgLy8gdG8gZW5zdXJlIHRoYXQgd2UgYXJlIGdldHRpbmcgdmFsaWQgY29vcmRpbmF0ZXMgd2l0aCBwb3NzaWJsZSBkaXJlY3Rpb25zXG4gIGRvIHtcbiAgICB4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgICB5ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgICBzaGlwRGlyZWN0aW9uID0gZ2V0U2hpcERpcmVjdGlvbih4LCB5LCBzaGlwTGVuZ3RoLCBnYW1lQm9hcmQpO1xuICAgIGlmIChzaGlwRGlyZWN0aW9uICE9PSB1bmRlZmluZWQgJiYgZ2FtZUJvYXJkW3hdW3ldID09PSBudWxsKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH0gd2hpbGUgKHRydWUpO1xuICByZXR1cm4gW3gsIHksIHNoaXBEaXJlY3Rpb25dO1xufVxuXG5jb25zdCBpbml0aWFsaXplUmFuZG9tQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gIGxldCB4ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgbGV0IHkgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICBkbyB7XG4gICAgeCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgeSA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXJbZGF0YS1yb3c9XCIke3h9XCJdW2RhdGEtY29sdW1uPVwiJHt5fVwiXWApXG4gICAgaWYgKCFjZWxsLmRhdGFzZXQuaXNIaXQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSB3aGlsZSAodHJ1ZSk7XG4gIHJldHVybiBbeCwgeV07XG59XG5cblxuZXhwb3J0IHsgaW5pdGlhbGl6ZUNvb3JkaW5hdGVzLCBpbml0aWFsaXplUmFuZG9tQ29vcmRpbmF0ZXMgfTsiLCJpbXBvcnQgeyBjZWxsQ2FsbGJhY2tzIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHggZnJvbSAnLi9hc3NldHMvY2xvc2Utb3V0bGluZS5zdmcnO1xuaW1wb3J0IGNpcmNsZSBmcm9tICcuL2Fzc2V0cy9jaXJjbGUuc3ZnJztcblxuY29uc3QgYm9hcmRUb0RvbSA9IChwbGF5ZXIsIGJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBwbGF5ZXIuaXNQbGF5ZXIoKSA9PT0gdHJ1ZSA/ICdZT1UnIDogJ0JPVCc7XG4gIGNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBwbGF5ZXJOYW1lRG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBcbiAgY29uc3QgYm9hcmREb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaWYgKHBsYXllci5pc1BsYXllcigpKSB7XG4gICAgcGxheWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkQ29udGFpbmVyUGxheWVyJyk7XG4gICAgYm9hcmREb20uY2xhc3NMaXN0LmFkZCgncGxheWVyQm9hcmQnKTtcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb250YWluZXJCb3QnKTtcbiAgICBib2FyZERvbS5jbGFzc0xpc3QuYWRkKCdib3RCb2FyZCcpO1xuICB9XG4gIFxuICBwbGF5ZXJOYW1lRG9tLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcbiAgcGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllck5hbWVEb20pO1xuXG4gIC8vIENyZWF0ZSBhIDEweDEwIGJvYXJkXG4gIGNyZWF0ZUJvYWQocGxheWVyLmlzUGxheWVyKCksIGJvYXJkRG9tLCBib2FyZCk7XG4gIHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZERvbSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJDb250YWluZXIpO1xufVxuXG5jb25zdCBjcmVhdGVCb2FkID0gKGlzUGxheWVyLCBib2FyZENvbnRhaW5lciwgYm9hcmQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGlmIChib2FyZFtpXVtqXSAhPT0gJ1gnICYmIGJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICB9XG4gICAgICAvLyBNYXJrIGlkZW50aWZpZXIgdG8gZW5lbXkgY2VsbHNcbiAgICAgIGlmIChpc1BsYXllciA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoJ2JvdCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoJ3BsYXllcicpO1xuICAgICAgfVxuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IGk7IC8vIEFkZCByb3cgZGF0YSBpbiBjZWxsXG4gICAgICBib2FyZENlbGwuZGF0YXNldC5jb2x1bW4gPSBqOyAvLyBBZGQgY29sdW1uIGRhdGEgaW4gY2VsbFxuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQWRkZWQgcmFuZG9taXplIGJ1dHRvblxuY29uc3QgcmFuZG9taXplQnV0dG9uID0gKHBsYXllcikgPT4ge1xuICBpZiAocGxheWVyLmlzUGxheWVyKCkpIHtcbiAgICBjb25zdCByYW5kb21pemVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkQ29udGFpbmVyUGxheWVyJyk7XG4gICAgcmFuZG9taXplQnRuLmNsYXNzTGlzdC5hZGQoJ3JhbmRvbWl6ZScpO1xuICAgIHJhbmRvbWl6ZUJ0bi50ZXh0Q29udGVudCA9ICdSYW5kb21pemUnOyBcbiAgICBwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZG9taXplQnRuKTtcblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBpbiByYW5kb21pemUgYnV0dG9uIHRvIHJhbmRvbWl6ZSBzaGlwIHBsYWNlbWVudFxuICAgIHJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHBsYXllci5wbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpOyBcbiAgICAgIGNvbnN0IGJvYXJkUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllckJvYXJkJyk7XG4gICAgICBib2FyZFBsYXllci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgY3JlYXRlQm9hZChwbGF5ZXIuaXNQbGF5ZXIoKSwgYm9hcmRQbGF5ZXIsIHBsYXllci5wbGF5ZXJCb2FyZC5nYW1lQm9hcmQpO1xuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgZGlzcGxheVdpbm5lciA9IChwbGF5ZXIpID0+IHtcbiAgLy8gRGlzcGxheSBtb2RhbCB0aGUgd2lubmVyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nJyk7XG4gIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGlmIChwbGF5ZXIuaXNQbGF5ZXIoKSkge1xuICAgIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSAnWU9VIExPU0UhJztcbiAgfSBlbHNlIHtcbiAgICB3aW5uZXJUZXh0LnRleHRDb250ZW50ID0gJ1lPVSBXSU4hJztcbiAgfVxuICBtb2RhbC5hcHBlbmRDaGlsZCh3aW5uZXJUZXh0KTtcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgc3RhcnRCdG4ucmVtb3ZlKCk7XG4gIFxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdDTE9TRSc7XG4gIG1vZGFsLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBtb2RhbC5jbG9zZSgpKTtcbiAgbW9kYWwuc2hvd01vZGFsKCk7XG59XG5cbmNvbnN0IHJlY2VpdmVBdHRhY2tEb20gPSAocGxheWVyLCBjZWxsKSA9PiB7XG4gIC8vIEdldCB0aGUgcm93IGFuZCBjb2x1bW4gaW5mbyBvbiBjZWxsXG4gIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC5yb3cpO1xuICBjb25zdCBjb2x1bW4gPSBwYXJzZUludChjZWxsLmRhdGFzZXQuY29sdW1uKTtcbiAgaWYgKCFjZWxsLmRhdGFzZXQuaXNIaXQpIHsgLy8gUmVjZWl2ZSBhdHRhY2tzIG9ubHkgdG8gbm9uIGF0dGFja2VkIHNoaXBzXG4gICAgXG4gICAgLy8gSWYgaXQgaGl0cyBhIHNoaXBcbiAgICAvLyBNYXJrIHRoZSBjb3JyZXNwb25kaW5nIGNlbGwgaW4gdGhlIG9yaWdpbmFsIGdhbWVib2FyZCBhcyBoaXRcbiAgICBjb25zdCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgXG4gICAgLy8gTWFyayB0aGUgY2VsbCBpbiB0aGUgYm9hcmQgYXMgWFxuICAgIGlmIChhdHRhY2sgPT09IHRydWUpIHsgLy8gTWVhbmluZyB0aGF0IHRoZSBhdHRhY2sgaGl0IGEgc2hpcFxuICAgICAgY29uc3QgY3Jvc3NTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGNyb3NzU3ZnLnNyYyA9IHg7IFxuICAgICAgY2VsbC5hcHBlbmRDaGlsZChjcm9zc1N2Zyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgbWFyayB0aGUgZW5lbXkgY2VsbCB3aXRoIGEgZG90XG4gICAgICBjb25zdCBkb3RTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGRvdFN2Zy5zcmMgPSBjaXJjbGU7XG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGRvdFN2Zyk7XG4gICAgfVxuICB9XG4gIGNlbGwuZGF0YXNldC5pc0hpdCA9IHRydWU7IC8vIE1hcmsgdGhlIGNlbGwgYXMgaGl0XG4gIFxuICAvLyBDaGVjayBpZiBzaGlwcyBhcmUgc3VuayBhZnRlciBhbiBhdHRhY2tcbiAgaWYgKHBsYXllci5wbGF5ZXJCb2FyZC5hcmVTaGlwc1N1bmsoKSkge1xuICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgdG8gYWxsIGNlbGxzXG4gICAgY29uc3QgYm90Q2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm90Jyk7XG4gICAgYm90Q2VsbHMuZm9yRWFjaCgoY2VsbHMpID0+IHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2VsbENhbGxiYWNrcy5nZXQoY2VsbHMpO1xuICAgICAgY2VsbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgICBjZWxscy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfSlcbiAgXG4gICAgLy8gRGlzcGxheSBtb2RhbCB0aGUgd2lubmVyXG4gICAgZGlzcGxheVdpbm5lcihwbGF5ZXIpO1xuICBcbiAgICAvLyBBZGQgcmVzdGFydCBidXR0b25cbiAgICBjb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcmVzdGFydEJ0bi50ZXh0Q29udGVudCA9ICdQTEFZIEFHQUlOJztcbiAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZXN0YXJ0QnRuKTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IHsgYm9hcmRUb0RvbSwgcmFuZG9taXplQnV0dG9uLCByZWNlaXZlQXR0YWNrRG9tIH0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHsgbWFya1NoaXBDb29yZGluYXRlcyB9IGZyb20gXCIuL21hcmtTaGlwcy5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUNvb3JkaW5hdGVzIH0gZnJvbSBcIi4vY29vcmRpbmF0ZXMuanNcIjtcblxuLy8gbGV0IGEgPSAwOyAvLyBUaGVzZSB3YXMgZm9yIHRlc3RpbmcgcHVycG9zZXNcbi8vIGxldCBiID0gMDtcbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgdG90YWxTaGlwcyA9IDE3O1xuXG4gIC8vIENyZWF0ZSBhIGdhbWVib2FyZFxuICBsZXQgZ2FtZUJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGdhbWVCb2FyZFtpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgZ2FtZUJvYXJkW2ldW2pdID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwKSA9PiB7XG4gICAgLy8gSW5pdGlhbGl6ZSBjb29yZGluYXRlcyBhbmQgZ2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIHNoaXBcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGluaXRpYWxpemVDb29yZGluYXRlcyhzaGlwLnNoaXBMZW5ndGgsIGdhbWVCb2FyZCk7XG4gICAgbGV0IFt4LCB5LCBzaGlwRGlyZWN0aW9uXSA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0sIGNvb3JkaW5hdGVzWzJdXTtcbiAgICAvLyBbYSwgYl0gPSBbeCwgeV07XG4gICAgLy8gTWFyayB0aGUgc2hpcCBpbiB0aGUgYm9hcmQgYW5kIG1hcmsgaXRzIGFkamFjZW5jaWVzXG4gICAgZ2FtZUJvYXJkID0gbWFya1NoaXBDb29yZGluYXRlcyh4LCB5LCBzaGlwLCBzaGlwLnNoaXBMZW5ndGgsIHNoaXBEaXJlY3Rpb24sIGdhbWVCb2FyZCk7XG4gIH1cblxuICAvLyBQbGFjZSBhIDUtbGVuZ3RoIGNhcnJpZXIgICBcbiAgY29uc3QgY2FycmllclNoaXAgPSBTaGlwKCk7XG4gIGNhcnJpZXJTaGlwLnNoaXBMZW5ndGggPSA1O1xuICBwbGFjZVNoaXAoY2FycmllclNoaXApO1xuICBcbiAgLy8gUGxhY2UgYSA0LWxlbmd0aCBiYXR0bGVzaGlwXG4gIGNvbnN0IGJhdHRsZVNoaXAgPSBTaGlwKCk7XG4gIGJhdHRsZVNoaXAuc2hpcExlbmd0aCA9IDQ7XG4gIHBsYWNlU2hpcChiYXR0bGVTaGlwKTtcblxuICAvLyBQbGFjZSBhIDMtbGVuZ3RoIGNydWlzZXJcbiAgY29uc3QgY3J1aXNlclNoaXAgPSBTaGlwKCk7XG4gIGNydWlzZXJTaGlwLnNoaXBMZW5ndGggPSAzO1xuICBwbGFjZVNoaXAoY3J1aXNlclNoaXApO1xuXG4gIC8vIFBsYWNlIGEgMy1sZW5ndGggc3VibWFyaW5lXG4gIGNvbnN0IHN1Ym1hcmluZVNoaXAgPSBTaGlwKCk7XG4gIHN1Ym1hcmluZVNoaXAuc2hpcExlbmd0aCA9IDM7XG4gIHBsYWNlU2hpcChzdWJtYXJpbmVTaGlwKTtcblxuICAvLyBQbGFjZSBhIDMtbGVuZ3RoIGRlc3Ryb3llclxuICBjb25zdCBkZXN0cm95ZXJTaGlwID0gU2hpcCgpO1xuICBkZXN0cm95ZXJTaGlwLnNoaXBMZW5ndGggPSAyO1xuICBwbGFjZVNoaXAoZGVzdHJveWVyU2hpcCk7XG5cbiAgbGV0IHNoaXBzSGl0ID0gMDtcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKGdhbWVCb2FyZFt4XVt5XSAhPT0gbnVsbCAmJiBnYW1lQm9hcmRbeF1beV0gIT09ICdYJykge1xuICAgICAgLy8gT25seSBoaXQgc2hpcHMgdGhhdCBhcmUgbm90IHlldCBoaXRcbiAgICAgIGdhbWVCb2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgIHNoaXBzSGl0Kys7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gcmVwb3J0IHdoZXRoZXIgb3Igbm90IGFsbCBvZiB0aGVpciBzaGlwcyBoYXZlIGJlZW4gc3Vua1xuICBjb25zdCBhcmVTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRvdGFsU2hpcHMgPT09IHNoaXBzSGl0O1xuICB9XG4gIFxuICByZXR1cm4geyBnYW1lQm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYXJlU2hpcHNTdW5rIH07XG59XG4vLyBjb25zdCBnYW1lYm9hcmRJbnN0YW5jZSA9IEdhbWVib2FyZCgpOyBcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjb25zdCBnZXRTaGlwRGlyZWN0aW9uID0gKHgsIHksIHNoaXBMZW5ndGgsIGdhbWVCb2FyZCkgPT4ge1xuICBsZXQgZGlyZWN0aW9ucyA9IHtcbiAgICBsZWZ0SG9yaXpvbnRhbDogZmFsc2UsXG4gICAgcmlnaHRIb3Jpem9udGFsOiBmYWxzZSxcbiAgICB1cHdhcmRWZXJ0aWNhbDogZmFsc2UsXG4gICAgZG93bndhcmRWZXJ0aWNhbDogZmFsc2VcbiAgfVxuXG4gIGxldCBbeENvcHkxLCB4Q29weTIsIHhDb3B5MywgeENvcHk0XSA9IFt4LCB4LCB4LCB4XTtcbiAgbGV0IFt5Q29weTEsIHlDb3B5MiwgeUNvcHkzLCB5Q29weTRdID0gW3ksIHksIHksIHldO1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICBcbiAgICAvLyBDaGVjayBsZWZ0IGhvcml6b250YWwgZm9yIG91dCBvZiBib3VuZFxuICAgIGlmICgoeUNvcHkxIDwgZ2FtZUJvYXJkLmxlbmd0aCAmJiB5Q29weTEgPj0gMCkgJiYgKGdhbWVCb2FyZFt5Q29weTFdICE9PSB1bmRlZmluZWQpICYmIChnYW1lQm9hcmRbeENvcHkxXVt5Q29weTFdICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAvLyBDaGVjayBmb3IgYWRqYWNlbmNpZXMgYW5kIGZvciBzaGlwcyBpbiBsZWZ0IGhvcml6b250YWxcbiAgICAgIGlmIChnYW1lQm9hcmRbeENvcHkxXVt5Q29weTFdICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdGlvbnMubGVmdEhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb25zLmxlZnRIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgcmlnaHQgaG9yaXpvbnRhbCBmb3Igb3V0IG9mIGJvdW5kXG4gICAgaWYgKCh5Q29weTIgPCBnYW1lQm9hcmQubGVuZ3RoICYmIHlDb3B5MiA+PSAwKSAmJiAoZ2FtZUJvYXJkW3lDb3B5Ml0gIT09IHVuZGVmaW5lZCkgJiYgKGdhbWVCb2FyZFt4Q29weTJdW3lDb3B5Ml0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIC8vIENoZWNrIGZvciBhZGphY2VuY2llcyBhbmQgZm9yIHNoaXBzIGluIHJpZ2h0IGhvcml6b250YWxcbiAgICAgIGlmIChnYW1lQm9hcmRbeENvcHkyXVt5Q29weTJdICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdGlvbnMucmlnaHRIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9ucy5yaWdodEhvcml6b250YWwgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBDaGVjayBkb3dud2FyZCB2ZXJ0aWNhbCBmb3Igb3V0IG9mIGJvdW5kXG4gICAgaWYgKCh4Q29weTMgPCBnYW1lQm9hcmQubGVuZ3RoICYmIHhDb3B5MyA+PSAwKSAmJiAoZ2FtZUJvYXJkW3hDb3B5M10gIT09IHVuZGVmaW5lZCkgJiYgKGdhbWVCb2FyZFt4Q29weTNdW3lDb3B5M10gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIC8vIENoZWNrIGZvciBhZGphY2VuY2llcyBhbmQgZm9yIHNoaXBzIGluIGRvd253YXJkIHZlcnRpY2FsXG4gICAgICBpZiAoZ2FtZUJvYXJkW3hDb3B5M11beUNvcHkzXSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3Rpb25zLmRvd253YXJkVmVydGljYWwgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb25zLmRvd253YXJkVmVydGljYWwgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBDaGVjayB1cHdhcmQgdmVydGljYWwgZm9yIG91dCBvZiBib3VuZFxuICAgIGlmICgoeENvcHk0IDwgZ2FtZUJvYXJkLmxlbmd0aCAmJiB4Q29weTQgPj0gMCkgJiYgKGdhbWVCb2FyZFt4Q29weTRdICE9PSB1bmRlZmluZWQpICYmIChnYW1lQm9hcmRbeENvcHk0XVt5Q29weTRdICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAvLyBDaGVjayBmb3IgYWRqYWNlbmNpZXMgYW5kIGZvciBzaGlwcyBpbiB1cHdhcmRWZXJ0aWNhbHZlcnRpY2FsXG4gICAgICBpZiAoZ2FtZUJvYXJkW3hDb3B5NF1beUNvcHk0XSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3Rpb25zLnVwd2FyZFZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9ucy51cHdhcmRWZXJ0aWNhbCA9IHRydWU7XG4gICAgfVxuICAgIC0teUNvcHkxO1xuICAgICsreUNvcHkyO1xuICAgICsreENvcHkzO1xuICAgIC0teENvcHk0O1xuICB9XG4gIGxldCBzaGlwRGlyZWN0aW9uID0gT2JqZWN0LmtleXMoZGlyZWN0aW9ucykuZmlsdGVyKChkaXJlY3Rpb24pID0+IGRpcmVjdGlvbnNbZGlyZWN0aW9uXSA9PT0gZmFsc2UpO1xuICBzaGlwRGlyZWN0aW9uID0gc2hpcERpcmVjdGlvbltwYXJzZUludChNYXRoLnJhbmRvbSgpICogKHNoaXBEaXJlY3Rpb24ubGVuZ3RoKSldO1xuICByZXR1cm4gc2hpcERpcmVjdGlvbjtcbn0gXG5cbmV4cG9ydCBkZWZhdWx0IGdldFNoaXBEaXJlY3Rpb247IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IGJvYXJkVG9Eb20sIHJhbmRvbWl6ZUJ1dHRvbiwgcmVjZWl2ZUF0dGFja0RvbSB9IGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVJhbmRvbUNvb3JkaW5hdGVzIH0gZnJvbSBcIi4vY29vcmRpbmF0ZXMuanNcIjtcbmltcG9ydCAnLi9zdHlsZXMuY3NzJztcblxuLy8gSW5pdGlhbGl6ZSBwbGF5ZXIgYW5kIGJvdFxuY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG5jb25zdCBib3QgPSBQbGF5ZXIoKTtcbmJvdC5pc0JvdCgpO1xuXG4vLyBDb252ZXJ0IHRoZSBib2FyZCBvZiBwbGF5ZXIgYW5kIGJvdCB0byB0aGUgRE9NXG5ib2FyZFRvRG9tKHBsYXllciwgcGxheWVyLnBsYXllckJvYXJkLmdhbWVCb2FyZCk7XG5ib2FyZFRvRG9tKGJvdCwgYm90LnBsYXllckJvYXJkLmdhbWVCb2FyZCk7XG5cbi8vIEFkZCByYW5kb21pemUgYnV0dG9uXG5yYW5kb21pemVCdXR0b24ocGxheWVyKTtcblxuY29uc3QgY2VsbENhbGxiYWNrcyA9IG5ldyBNYXAoKTsgLy8gSW5pdGlhbGl6ZSBzdG9yYWdlIGZvciBjYWxsYmFja3Mgb2YgZWFjaCBjZWxsXG5cbi8vIFN0YXJ0IGdhbWUgYWZ0ZXIgY2xpY2tpbmcgcGxheSBidXR0b25cbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgLy8gSGlkZSB0aGUgYnV0dG9uXG4gIGNvbnN0IHJhbmRvbWl6ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pemUnKTtcbiAgc3RhcnRCdG4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgcmFuZG9taXplQnRuLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gIHN0YXJ0QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIHJhbmRvbWl6ZUJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGVuZW15IGNlbGxzIHRvIHJlY2VpdmUgYXR0YWNrc1xuICBjb25zdCBib3RDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3QnKTtcbiAgY29uc3QgYm90Q2VsbHNBcnIgPSBbLi4uYm90Q2VsbHNdO1xuICBib3RDZWxsc0Fyci5tYXAoKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJzsgLy8gTWFrZSB0aGUgY2VsbHMgaW50ZXJhY3RpdmVcbiAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IGNlbGxBdHRhY2tDYWxsYmFjayhib3QsIHBsYXllciwgY2VsbCk7XG4gICAgY2VsbENhbGxiYWNrcy5zZXQoY2VsbCwgY2FsbGJhY2spOyAvLyBTdG9yZSB0aGUgY2VsbCBhbmQgaXRzIGNvcnJlc3BvbmRpbmcgY2FsbGJhY2tcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xuICB9KVxuICBjb25zb2xlLmxvZyhjZWxsQ2FsbGJhY2tzKTtcbn0pXG5cbmNvbnN0IGNlbGxBdHRhY2tDYWxsYmFjayA9IChib3QsIHBsYXllciwgY2VsbCkgPT4ge1xuICAvLyBNYXJrIHRoZSBib3QgZ2FtZWJvYXJkXG4gIHJlY2VpdmVBdHRhY2tEb20oYm90LCBjZWxsKTtcblxuICAvLyBHZXQgdGhlIGNvcnJlc3BvbmRpbmcgY2FsbGJhY2sgb2YgdGhlIGNlbGwgaW4gdGhlIG1hcFxuICBjb25zdCBjYWxsYmFjayA9IGNlbGxDYWxsYmFja3MuZ2V0KGNlbGwpO1xuICBjZWxsLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcblxuICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjZWxsXG4gIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG5cbiAgLy8gUmVjZWl2ZSBhdHRhY2tzIGZyb20gYm90XG4gIGNvbnN0IHJhbmRvbUNvb3JkaW5hdGVzID0gaW5pdGlhbGl6ZVJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGJvdEF0dGFja1JvdyA9IHJhbmRvbUNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCBib3RBdHRhY2tDb2x1bW4gPSByYW5kb21Db29yZGluYXRlc1sxXTtcbiAgY29uc3QgcGxheWVyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7Ym90QXR0YWNrUm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7Ym90QXR0YWNrQ29sdW1ufVwiXWApO1xuICByZWNlaXZlQXR0YWNrRG9tKHBsYXllciwgcGxheWVyQ2VsbCk7XG59XG5cbmV4cG9ydCB7IGNlbGxDYWxsYmFja3MgfTsiLCJpbXBvcnQgeyBtYXJrQWRqYWNlbnRDZWxscyB9IGZyb20gXCIuL3NoaXBBZGphY2VuY2llcy5qc1wiO1xuXG5jb25zdCBtYXJrU2hpcENvb3JkaW5hdGVzID0gKHgsIHksIHNoaXAsIHNoaXBMZW5ndGgsIHNoaXBEaXJlY3Rpb24sIGdhbWVCb2FyZCkgPT4ge1xuICAvLyBQbGFjZSB0aGUgc2hpcHNcbiAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSAnbGVmdEhvcml6b250YWwnKSB7XG4gICAgICBnYW1lQm9hcmRbeF1beV0gPSBzaGlwO1xuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIHldKTtcbiAgICAgIHktLTtcbiAgICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09ICdyaWdodEhvcml6b250YWwnKSB7XG4gICAgICBnYW1lQm9hcmRbeF1beV0gPSBzaGlwO1xuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIHldKTtcbiAgICAgIHkrKztcbiAgICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09ICd1cHdhcmRWZXJ0aWNhbCcpIHtcbiAgICAgIGdhbWVCb2FyZFt4XVt5XSA9IHNoaXA7XG4gICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbeCwgeV0pO1xuICAgICAgeC0tO1xuICAgIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PT0gJ2Rvd253YXJkVmVydGljYWwnKSB7XG4gICAgICBnYW1lQm9hcmRbeF1beV0gPSBzaGlwO1xuICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIHldKTtcbiAgICAgIHgrKztcbiAgICB9XG4gIH1cbiAgLy8gTWFyayBhZGphY2VudCBjZWxscyBhZnRlciBwbGFjaW5nIHNoaXBzXG4gIGdhbWVCb2FyZCA9IG1hcmtBZGphY2VudENlbGxzKGdhbWVCb2FyZCwgc2hpcENvb3JkaW5hdGVzLCBzaGlwTGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgcmV0dXJuIGdhbWVCb2FyZDtcbn1cblxuXG5cbmV4cG9ydCB7IG1hcmtTaGlwQ29vcmRpbmF0ZXMgfTsiLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICBsZXQgcGxheWVyID0gdHJ1ZTtcblxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICBcbiAgY29uc3QgaXNCb3QgPSAoKSA9PiB7XG4gICAgcGxheWVyID0gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc1BsYXllciA9ICgpID0+IHtcbiAgICByZXR1cm4gcGxheWVyO1xuICB9XG4gIFxuICByZXR1cm4geyBwbGF5ZXJCb2FyZCwgaXNQbGF5ZXIsIGlzQm90IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiZXhwb3J0IGNvbnN0IFNoaXAgPSAoKSA9PiB7XG4gIGxldCBzaGlwTGVuZ3RoO1xuICBsZXQgaGl0Q291bnQgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRDb3VudCsrO1xuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGVuZ3RoID09PSBoaXRDb3VudDtcbiAgfVxuXG4gIGNvbnN0IGdldEhpdENvdW50ID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRDb3VudDtcbiAgfVxuICByZXR1cm4geyBzaGlwTGVuZ3RoLCBnZXRIaXRDb3VudCwgaGl0LCBpc1N1bmsgfTtcbn1cbiIsImNvbnN0IG1hcmtBZGphY2VudENlbGxzID0gKGdhbWVib2FyZCwgc2hpcENvb3JkaW5hdGVzLCBzaGlwTGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcbiAgLy8gR2V0IHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIG9mIGFuZCBzdG9yZSB0aGVtc2VwYXJhdGVseSBcbiAgbGV0IHgxID0gc2hpcENvb3JkaW5hdGVzWzBdWzBdO1xuICBsZXQgeTEgPSBzaGlwQ29vcmRpbmF0ZXNbMF1bMV07XG4gIGxldCB4MiA9IHgxO1xuICBsZXQgeTIgPSB5MTtcbiAgLy8gTWFyayBhZGphY2VuY2llcyBpbiB0aGUgYm9hcmQgZm9yIGhvcml6b250YWwgc2hpcCBwbGFjZW1lbnQgXG4gIGlmIChkaXJlY3Rpb24uaW5jbHVkZXMoJ0hvcml6b250YWwnKSl7XG4gICAgaWYgKGRpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAtLXgxO1xuICAgICAgKyt5MTtcbiAgICAgICsreDI7XG4gICAgICArK3kyO1xuICAgIH0gZWxzZSB7XG4gICAgICAtLXgxO1xuICAgICAgLS15MTtcbiAgICAgICsreDI7XG4gICAgICAtLXkyO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGggKyAyOyBpKyspIHtcbiAgICAgIGlmIChnYW1lYm9hcmRbeTFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gc2hpcExlbmd0aCArIDEpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbKyt4MV1beTFdID0gJ1gnO1xuICAgICAgICAgIC0teDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIE1hcmsgdGhlIGFkamFjZW5jaWVzIGJ5IGluY3JlbWVudGluZyBvciBkZWNyZW1lbnRpbmcgeSBkZXBlbmRpbmcgb24gZGlyZWN0aW9uXG4gICAgICBpZiAoZ2FtZWJvYXJkW3gxXSAhPT0gdW5kZWZpbmVkICYmIGdhbWVib2FyZFt5MV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkaXJlY3Rpb24uaW5jbHVkZXMoJ2xlZnQnKSA/IGdhbWVib2FyZFt4MV1beTEtLV0gPSAnWCcgOiBnYW1lYm9hcmRbeDFdW3kxKytdID0gJ1gnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlyZWN0aW9uLmluY2x1ZGVzKCdsZWZ0JykgPyB5MS0tIDogeTErKztcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lYm9hcmRbeDJdICE9PSB1bmRlZmluZWQgJiYgZ2FtZWJvYXJkW3kyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpID8gZ2FtZWJvYXJkW3gyXVt5Mi0tXSA9ICdYJyA6IGdhbWVib2FyZFt4Ml1beTIrK10gPSAnWCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXJlY3Rpb24uaW5jbHVkZXMoJ2xlZnQnKSA/IHkyLS0gOiB5MisrO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24uaW5jbHVkZXMoJ1ZlcnRpY2FsJykpIHtcbiAgICBpZiAoZGlyZWN0aW9uLmluY2x1ZGVzKCd1cHdhcmQnKSkge1xuICAgICAgKyt4MTtcbiAgICAgIC0teTE7XG4gICAgICArK3gyO1xuICAgICAgKyt5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgLS14MTtcbiAgICAgIC0teTE7XG4gICAgICAtLXgyO1xuICAgICAgKyt5MjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoICsgMjsgaSsrKSB7XG4gICAgICBpZiAoZ2FtZWJvYXJkW3gxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IHNoaXBMZW5ndGggKyAxKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkW3gxXVsrK3kxXSA9ICdYJztcbiAgICAgICAgICAtLXkxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAgLy8gTWFyayB0aGUgYWRqYWNlbmNpZXMgYnkgaW5jcmVtZW50aW5nIG9yIGRlY3JlbWVudGluZyB4IGRlcGVuZGluZyBvbiBkaXJlY3Rpb25cbiAgICAgIGlmIChnYW1lYm9hcmRbeDFdICE9PSB1bmRlZmluZWQgJiYgZ2FtZWJvYXJkW3kxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpcmVjdGlvbi5pbmNsdWRlcygndXB3YXJkJykgPyBnYW1lYm9hcmRbeDEtLV1beTFdID0gJ1gnIDogZ2FtZWJvYXJkW3gxKytdW3kxXSA9ICdYJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbi5pbmNsdWRlcygndXB3YXJkJykgPyB4MS0tIDogeDErKztcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lYm9hcmRbeDJdICE9PSB1bmRlZmluZWQgJiYgZ2FtZWJvYXJkW3kyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpcmVjdGlvbi5pbmNsdWRlcygndXB3YXJkJykgPyBnYW1lYm9hcmRbeDItLV1beTJdID0gJ1gnIDogZ2FtZWJvYXJkW3gyKytdW3kyXSA9ICdYJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbi5pbmNsdWRlcygndXB3YXJkJykgPyB4Mi0tIDogeDIrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn1cblxuZXhwb3J0IHsgbWFya0FkamFjZW50Q2VsbHMgfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbjpyb290IHtcbiAgLS1iZy1jbHI6ICMyNzM3NEQ7XG4gIC0tc2NuZC1jbHI6ICM1MjZEODI7XG4gIC0tdGhyZC1jbHI6ICM5REIyQkY7XG4gIC0tbGFzdC1jbHI6ICNEREU2RUQ7XG59XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG4gIGhlaWdodDogMTAwc3ZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiAnTG9yYScsIHNlcmlmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY25kLWNscik7XG4gIGNvbG9yOiB2YXIoLS1sYXN0LWNscik7XG59XG5cbmEge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbnAge1xuICBmb250LXNpemU6IDJyZW07XG4gIG1hcmdpbjogMDtcbn1cblxuaGVhZGVyIHtcbiAgZm9udC1zaXplOiA0cmVtO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY2xyKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtOyAgXG4gIHRleHQtc2hhZG93OiAzcHggM3B4IDNweCB2YXIoLS1zY25kLWNscik7XG59XG5cbmJ1dHRvbiB7XG4gIG1hcmdpbi1ib3R0b206IDZyZW07XG4gIHBhZGRpbmc6IDAuOHJlbTtcbiAgd2lkdGg6IDE1cmVtO1xuICBmb250LXNpemU6IDJyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY2xyKTtcbiAgY29sb3I6IHZhcigtLWxhc3QtY2xyKTtcbiAgYm94LXNoYWRvdzogMnB4IDJweCA0cHggMCByZ2JhKDAsMCwwLDAuNzUpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiAnTG9yYScsIHNlcmlmOztcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNjNGU2Nztcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNSkgZHJvcC1zaGFkb3coMCAwIDAgcmdiKDM3LCAxMTksIDE1NCkpO1xufVxuXG5kaWFsb2cge1xuICBnYXA6IDFyZW07XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuZGlhbG9nIHAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmRpYWxvZyBidXR0b24ge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuLm1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IGF1dG87XG4gIGdhcDogOHJlbTtcbn1cblxuLmJvYXJkQ29udGFpbmVyUGxheWVyLFxuLmJvYXJkQ29udGFpbmVyQm90IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBnYXA6IDJyZW07XG59XG5cblxuLnBsYXllckJvYXJkLFxuLmJvdEJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5yYW5kb21pemUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4uY2VsbCxcbi5zaGlwIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGhlaWdodDogNDhweDtcbiAgYm94LXNoYWRvdzogMnB4IDJweCA0cHggMCByZ2JhKDAsMCwwLDAuNzUpO1xufVxuXG4uY2VsbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRocmQtY2xyKTtcbn1cblxuLnBsYXllci5zaGlwIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGFzdC1jbHIpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aHJkLWNscik7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULGNBQWM7RUFDZCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsK0JBQStCO0VBQy9CLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixZQUFZO0VBQ1osZUFBZTtFQUNmLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsK0JBQStCO0VBQy9CLHNCQUFzQjtFQUN0QiwwQ0FBMEM7RUFDMUMsZUFBZTtFQUNmLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseURBQXlEO0FBQzNEOztBQUVBO0VBQ0UsU0FBUztFQUNULFNBQVM7RUFDVCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtFQUNmLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsU0FBUztBQUNYOzs7QUFHQTs7RUFFRSxhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQyxpQ0FBaUM7QUFDbkNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJnLWNscjogIzI3Mzc0RDtcXG4gIC0tc2NuZC1jbHI6ICM1MjZEODI7XFxuICAtLXRocmQtY2xyOiAjOURCMkJGO1xcbiAgLS1sYXN0LWNscjogI0RERTZFRDtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBoZWlnaHQ6IDEwMHN2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtZmFtaWx5OiAnTG9yYScsIHNlcmlmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2NuZC1jbHIpO1xcbiAgY29sb3I6IHZhcigtLWxhc3QtY2xyKTtcXG59XFxuXFxuYSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG5wIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY2xyKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW07ICBcXG4gIHRleHQtc2hhZG93OiAzcHggM3B4IDNweCB2YXIoLS1zY25kLWNscik7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBtYXJnaW4tYm90dG9tOiA2cmVtO1xcbiAgcGFkZGluZzogMC44cmVtO1xcbiAgd2lkdGg6IDE1cmVtO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNscik7XFxuICBjb2xvcjogdmFyKC0tbGFzdC1jbHIpO1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCA0cHggMCByZ2JhKDAsMCwwLDAuNzUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1mYW1pbHk6ICdMb3JhJywgc2VyaWY7O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNjNGU2NztcXG59XFxuXFxuaW1nIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNSkgZHJvcC1zaGFkb3coMCAwIDAgcmdiKDM3LCAxMTksIDE1NCkpO1xcbn1cXG5cXG5kaWFsb2cge1xcbiAgZ2FwOiAxcmVtO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG59XFxuXFxuZGlhbG9nIHAge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5kaWFsb2cgYnV0dG9uIHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG4ubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZ2FwOiA4cmVtO1xcbn1cXG5cXG4uYm9hcmRDb250YWluZXJQbGF5ZXIsXFxuLmJvYXJkQ29udGFpbmVyQm90IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGdhcDogMnJlbTtcXG59XFxuXFxuXFxuLnBsYXllckJvYXJkLFxcbi5ib3RCb2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5yYW5kb21pemUge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5jZWxsLFxcbi5zaGlwIHtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCA0cHggMCByZ2JhKDAsMCwwLDAuNzUpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10aHJkLWNscik7XFxufVxcblxcbi5wbGF5ZXIuc2hpcCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1sYXN0LWNscik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aHJkLWNscik7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImdldFNoaXBEaXJlY3Rpb24iLCJpbml0aWFsaXplQ29vcmRpbmF0ZXMiLCJzaGlwTGVuZ3RoIiwiZ2FtZUJvYXJkIiwieCIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwieSIsInNoaXBEaXJlY3Rpb24iLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplUmFuZG9tQ29vcmRpbmF0ZXMiLCJwYXJzZUludCIsImNlbGwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25jYXQiLCJkYXRhc2V0IiwiaXNIaXQiLCJjZWxsQ2FsbGJhY2tzIiwiR2FtZWJvYXJkIiwiY2lyY2xlIiwiYm9hcmRUb0RvbSIsInBsYXllciIsImJvYXJkIiwiY29udGFpbmVyIiwicGxheWVyTmFtZSIsImlzUGxheWVyIiwicGxheWVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInBsYXllck5hbWVEb20iLCJib2FyZERvbSIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVCb2FkIiwiYm9hcmRDb250YWluZXIiLCJpIiwiaiIsImJvYXJkQ2VsbCIsInJvdyIsImNvbHVtbiIsInJhbmRvbWl6ZUJ1dHRvbiIsInJhbmRvbWl6ZUJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5ZXJCb2FyZCIsImJvYXJkUGxheWVyIiwiZGlzcGxheVdpbm5lciIsIm1vZGFsIiwid2lubmVyVGV4dCIsInN0YXJ0QnRuIiwicmVtb3ZlIiwiY2xvc2VCdXR0b24iLCJjbG9zZSIsInNob3dNb2RhbCIsInJlY2VpdmVBdHRhY2tEb20iLCJhdHRhY2siLCJyZWNlaXZlQXR0YWNrIiwiY3Jvc3NTdmciLCJzcmMiLCJkb3RTdmciLCJhcmVTaGlwc1N1bmsiLCJib3RDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiY2VsbHMiLCJjYWxsYmFjayIsImdldCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsImN1cnNvciIsInJlc3RhcnRCdG4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImJvZHkiLCJTaGlwIiwibWFya1NoaXBDb29yZGluYXRlcyIsInRvdGFsU2hpcHMiLCJwbGFjZVNoaXAiLCJzaGlwIiwiY29vcmRpbmF0ZXMiLCJfcmVmIiwiY2FycmllclNoaXAiLCJiYXR0bGVTaGlwIiwiY3J1aXNlclNoaXAiLCJzdWJtYXJpbmVTaGlwIiwiZGVzdHJveWVyU2hpcCIsInNoaXBzSGl0IiwiaGl0IiwiZGlyZWN0aW9ucyIsImxlZnRIb3Jpem9udGFsIiwicmlnaHRIb3Jpem9udGFsIiwidXB3YXJkVmVydGljYWwiLCJkb3dud2FyZFZlcnRpY2FsIiwieENvcHkxIiwieENvcHkyIiwieENvcHkzIiwieENvcHk0IiwieUNvcHkxIiwieUNvcHkyIiwieUNvcHkzIiwieUNvcHk0IiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImRpcmVjdGlvbiIsIlBsYXllciIsImJvdCIsImlzQm90IiwiTWFwIiwib3BhY2l0eSIsInBvaW50ZXJFdmVudHMiLCJib3RDZWxsc0FyciIsIl90b0NvbnN1bWFibGVBcnJheSIsIm1hcCIsImNlbGxBdHRhY2tDYWxsYmFjayIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJyYW5kb21Db29yZGluYXRlcyIsImJvdEF0dGFja1JvdyIsImJvdEF0dGFja0NvbHVtbiIsInBsYXllckNlbGwiLCJtYXJrQWRqYWNlbnRDZWxscyIsInNoaXBDb29yZGluYXRlcyIsInB1c2giLCJoaXRDb3VudCIsImlzU3VuayIsImdldEhpdENvdW50IiwiZ2FtZWJvYXJkIiwieDEiLCJ5MSIsIngyIiwieTIiLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=