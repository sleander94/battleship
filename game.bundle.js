"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["game"],{

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

function createBoard() {
  var board = {};
  board.ships = [];
  board.width = 10;
  board.height = 10;
  board.grid = [];

  for (var i = 0; i < board.height; i++) {
    var row = [];

    for (var _i = 0; _i < board.width; _i++) {
      var cell = '';
      row.push(cell);
    }

    board.grid.push(row);
  }

  board.addShip = function (length, x, y, vert) {
    var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(length);

    if (vert) {
      for (var _i2 = 0; _i2 < length; _i2++) {
        if (!board.grid[y - 1 + _i2]) {
          return false;
        } else if (board.grid[y - 1 + _i2][x - 1] !== '') {
          return false;
        }
      }

      for (var _i3 = 0; _i3 < length; _i3++) {
        board.grid[y - 1 + _i3][x - 1] = ship.name;
      }

      board.ships.push(ship);
    } else {
      for (var _i4 = 0; _i4 < length; _i4++) {
        if (board.grid[y - 1][x - 1 + _i4] === undefined) {
          return false;
        } else if (board.grid[y - 1][x - 1 + _i4] !== '') {
          return false;
        }
      }

      for (var _i5 = 0; _i5 < length; _i5++) {
        board.grid[y - 1][x - 1 + _i5] = ship.name;
      }

      board.ships.push(ship);
    }
  };

  board.receiveAttack = function (x, y) {
    var hitCoord = board.grid[y - 1][x - 1];

    if (hitCoord === '') {
      hitCoord = 'miss';
    } else {
      board.ships.forEach(function (ship) {
        if (hitCoord === ship.name) {
          ship.hit();
          hitCoord = 'hit';
          board.fleetSunk();
        }
      });
    }

    return board.grid[y - 1][x - 1] = hitCoord;
  };

  board.fleetSunk = function () {
    var fleetDestroyed = true;
    board.ships.forEach(function (ship) {
      if (ship.isSunk === false) {
        fleetDestroyed = false;
      }
    });
    return fleetDestroyed;
  };

  return board;
}

/***/ }),

/***/ "./src/dom-interaction.js":
/*!********************************!*\
  !*** ./src/dom-interaction.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "placeFleet": () => (/* binding */ placeFleet),
/* harmony export */   "placeRandomFleet": () => (/* binding */ placeRandomFleet),
/* harmony export */   "renderBoard": () => (/* binding */ renderBoard),
/* harmony export */   "renderPage": () => (/* binding */ renderPage),
/* harmony export */   "startAttackLoop": () => (/* binding */ startAttackLoop)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");


function renderPage(element) {
  var header = document.createElement('h1');
  header.textContent = 'Battleship';
  element.appendChild(header);
  var gameArea = document.createElement('div');
  gameArea.classList.toggle('gameArea');
  element.appendChild(gameArea);
  var messageContainer = document.createElement('div');
  messageContainer.classList.toggle('messageContainer');
  element.appendChild(messageContainer);
}
function renderBoard(player, element) {
  var boardDiv = document.createElement('div');
  boardDiv.classList.toggle('boardContainer');
  var boardHeader = document.createElement('div');
  boardHeader.classList.toggle('boardHeader');

  if (player.type === 'computer') {
    boardHeader.textContent = 'Enemy Fleet';
  } else {
    boardHeader.textContent = 'Your Fleet';
  }

  boardDiv.appendChild(boardHeader);
  var board = document.createElement('div');
  board.classList.toggle('board');
  board.id = "".concat(player.type);
  player.board.grid.forEach(function (row) {
    var rowDiv = document.createElement('div');
    rowDiv.classList.toggle('row');
    var i = 1;
    row.forEach(function (cell) {
      var cellDiv = document.createElement('div');
      cellDiv.classList.toggle('cell');

      if (cell !== '') {
        cellDiv.classList.toggle("".concat(cell));
      }

      cellDiv.setAttribute('y', "".concat(player.board.grid.indexOf(row) + 1));
      cellDiv.setAttribute('x', "".concat(i));
      cellDiv.innerHTML = cell;
      rowDiv.appendChild(cellDiv);
      i += 1;
    });
    board.appendChild(rowDiv);
  });
  boardDiv.appendChild(board);
  element.appendChild(boardDiv);
}

function updateBoard(player, element) {
  element.innerHTML = '';
  player.board.grid.forEach(function (row) {
    var rowDiv = document.createElement('div');
    rowDiv.classList.toggle('row');
    var i = 1;
    row.forEach(function (cell) {
      var cellDiv = document.createElement('div');
      cellDiv.classList.toggle('cell');

      if (cell !== '') {
        cellDiv.classList.toggle("".concat(cell));
      }

      cellDiv.setAttribute('y', "".concat(player.board.grid.indexOf(row) + 1));
      cellDiv.setAttribute('x', "".concat(i));
      cellDiv.innerHTML = cell;
      rowDiv.appendChild(cellDiv);
      i += 1;
    });
    element.appendChild(rowDiv);
  });
}

function startAttackLoop(player, opponent, element) {
  var messageContainer = document.querySelector('.messageContainer');
  var opponentBoard = document.getElementById("".concat(opponent.type));
  var rows = opponentBoard.children;

  for (var i = 0; i < rows.length; i++) {
    var _loop = function _loop(n) {
      var cell = rows[i].children[n];
      cell.addEventListener('click', function () {
        if (player.makeAttack(opponent, cell.getAttribute('x'), cell.getAttribute('y')) === true) {
          opponent.makeAttack(player);
        }

        player.makeAttack(opponent, cell.getAttribute('x'), cell.getAttribute('y'));
        element.innerHTML = '';
        renderBoard(player, element);
        renderBoard(opponent, element);

        if (checkWinner(player, opponent) === 'computer') {
          renderWinMessage(opponent, messageContainer);
          return true;
        } else if (checkWinner(player, opponent) === 'human') {
          renderWinMessage(player, messageContainer);
          return true;
        } else {
          startAttackLoop(player, opponent, element);
        }
      });
    };

    for (var n = 0; n < rows[i].children.length; n++) {
      _loop(n);
    }
  }
}

function checkWinner(player, computer) {
  if (computer.board.fleetSunk() === true) {
    return 'human';
  } else if (player.board.fleetSunk() === true) {
    return 'computer';
  }
}

function renderWinMessage(player, element) {
  element.innerText = '';

  if (player.type === 'computer') {
    element.textContent = 'Your fleet is destroyed. You lose.';
  } else if (player.type === 'human') {
    element.textContent = 'You have destroyed the enemy fleet. You win.';
  }

  var playAgain = document.createElement('button');
  playAgain.classList.toggle('startButton');
  playAgain.textContent = 'New Game';
  playAgain.addEventListener('click', function () {
    (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameLoop)();
  });
  element.appendChild(playAgain);
}

var vertical = false;
function placeFleet(player, opponent, element, length) {
  var messageContainer = document.querySelector('.messageContainer');
  fleetMessage(length, messageContainer);

  if (length <= 0) {
    removePlacementListeners(player);
    startAttackLoop(player, opponent, document.querySelector('.gameArea'));
  } else {
    axisButton(messageContainer);
    var playerBoard = document.getElementById("".concat(player.type));
    var rows = playerBoard.children;

    for (var i = 0; i < rows.length; i++) {
      var _loop2 = function _loop2(n) {
        var cell = rows[i].children[n];
        cell.addEventListener('click', function () {
          if (player.board.addShip(length, cell.getAttribute('x'), cell.getAttribute('y'), vertical) !== false) {
            player.board.addShip(length, cell.getAttribute('x'), cell.getAttribute('y'), vertical);

            if (length > 0) {
              placeNextShip(player, opponent, element, length - 1);
            }
          } else if (length > 0) {
            placeNextShip(player, opponent, element, length);
          }
        });
      };

      for (var n = 0; n < rows[i].children.length; n++) {
        _loop2(n);
      }
    }
  }
}

function removePlacementListeners(player) {
  var playerBoard = document.getElementById("".concat(player.type));
  var rows = playerBoard.children;

  for (var i = 0; i < rows.length; i++) {
    var _loop3 = function _loop3(n) {
      var cell = rows[i].children[n];
      cell.removeEventListener('click', function () {
        if (player.board.addShip(length, cell.getAttribute('x'), cell.getAttribute('y'), vertical) !== false) {
          player.board.addShip(length, cell.getAttribute('x'), cell.getAttribute('y'), vertical);
          console.log(player.board.ships);

          if (length > 1) {
            placeNextShip(player, element, length - 1);
          }
        } else if (length > 1) {
          placeNextShip(player, element, length);
        }
      });
    };

    for (var n = 0; n < rows[i].children.length; n++) {
      _loop3(n);
    }
  }
}

function placeNextShip(player, opponent, element, length) {
  updateBoard(player, element);
  placeFleet(player, opponent, element, length);
}

function placeRandomFleet(player, element, length) {
  var vert = (0,_player__WEBPACK_IMPORTED_MODULE_1__.randomCoord)();

  if (vert > 5) {
    vert = true;
  } else {
    vert = false;
  }

  var x = (0,_player__WEBPACK_IMPORTED_MODULE_1__.randomCoord)();
  var y = (0,_player__WEBPACK_IMPORTED_MODULE_1__.randomCoord)();

  if (player.board.addShip(length, x, y, vert) !== false) {
    player.board.addShip(length, x, y, vert);

    if (length > 1) {
      placeRandomFleet(player, element, length - 1);
    }
  } else if (length > 1) {
    placeRandomFleet(player, element, length);
  }

  updateBoard(player, element);
}

function fleetMessage(length, element) {
  if (length === 5) {
    element.innerHTML = 'Place your Carrier';
  } else if (length === 4) {
    element.innerHTML = 'Place your Battleship';
  } else if (length === 3) {
    element.innerHTML = 'Place your Cruiser';
  } else if (length === 2) {
    element.innerHTML = 'Place your Destroyer';
  } else if (length === 1) {
    element.innerHTML = 'Place your Submarine';
  } else {
    element.innerHTML = 'Launch your attack!';
  }
}

function axisButton(element) {
  var axisButton = document.createElement('button');
  axisButton.classList.toggle('axisButton');
  axisButton.innerText = 'Change Axis';
  axisButton.addEventListener('click', function () {
    if (vertical === false) {
      vertical = true;
    } else {
      vertical = false;
    }
  });
  element.appendChild(axisButton);
}

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom_interaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-interaction */ "./src/dom-interaction.js");



(0,_dom_interaction__WEBPACK_IMPORTED_MODULE_2__.renderPage)(document.body);
var messageContainer = document.querySelector('.messageContainer');
var startButton = document.createElement('button');
startButton.classList.toggle('startButton');
startButton.textContent = 'Start Game';
startButton.addEventListener('click', function () {
  gameLoop();
});
messageContainer.appendChild(startButton);
function gameLoop() {
  document.querySelector('.gameArea').innerHTML = '';
  var players = [];
  var human = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)('human');
  var computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)('computer');
  players.push(human);
  players.push(computer);
  players.forEach(function (player) {
    (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_2__.renderBoard)(player, document.querySelector('.gameArea'));
  });
  (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_2__.placeFleet)(human, computer, document.getElementById('human'), 5);
  (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_2__.placeRandomFleet)(computer, document.getElementById('computer'), 5);
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer),
/* harmony export */   "randomCoord": () => (/* binding */ randomCoord)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");

function createPlayer(type) {
  var player = {};
  player.type = type;
  player.board = (0,_board__WEBPACK_IMPORTED_MODULE_0__.createBoard)();

  player.makeAttack = function (opponent, x, y) {
    if (player.type === 'computer') {
      var _x = randomCoord();

      var _y = randomCoord();

      if (opponent.board.grid[_y - 1][_x - 1] !== 'miss' && opponent.board.grid[_y - 1][_x - 1] !== 'hit') {
        return opponent.board.receiveAttack(_x, _y);
      } else {
        player.makeAttack(opponent);
      }
    } else if (player.type === 'human') {
      if (opponent.board.grid[y - 1][x - 1] !== 'miss' && opponent.board.grid[y - 1][x - 1] !== 'hit') {
        opponent.board.receiveAttack(x, y);
        return true;
      }
    }
  };

  return player;
}
function randomCoord() {
  return Math.floor(Math.random() * (Math.floor(10) - Math.ceil(1) + 1)) + Math.ceil(1);
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
function createShip(length) {
  var ship = {};
  ship.length = length;
  ship.hitCount = 0;
  ship.isSunk = false;

  if (ship.length === 1) {
    ship.name = 'submarine';
  } else if (ship.length === 2) {
    ship.name = 'destroyer';
  } else if (ship.length === 3) {
    ship.name = 'cruiser';
  } else if (ship.length === 4) {
    ship.name = 'battleship';
  } else if (ship.length === 5) {
    ship.name = 'carrier';
  }

  ship.hit = function () {
    ship.hitCount += 1;
    ship.checkSunk();
  };

  ship.checkSunk = function () {
    if (ship.hitCount === ship.length) {
      ship.isSunk = true;
    }
  };

  return ship;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',\n    'Segoe UI Symbol';\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  background: rgb(179, 179, 179);\n  font-weight: 500;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr 1fr 5fr;\n  height: 100vh;\n  justify-items: center;\n}\n\nh1 {\n  margin: 36px;\n  font-size: 4rem;\n}\n\n.messageContainer {\n  grid-area: 2 / 1 / 3 / 2;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 8px 24px 8px 24px;\n  background-color: rgba(121, 121, 121, 0.605);\n}\n\n.gameArea {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 128px;\n  margin-top: 48px;\n}\n\n.boardHeader {\n  text-align: center;\n  font-size: 1.3rem;\n  border: 1px solid black;\n  border-bottom: 0px;\n  background-color: rgba(121, 121, 121, 0.605);\n}\n\n.board {\n  display: grid;\n  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n  width: 351px;\n  border: 1px solid black;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n}\n\n.cell {\n  width: 35px;\n  height: 35px;\n  color: rgba(255, 255, 255, 0);\n  background-color: rgb(62, 119, 243);\n  border: 1px solid black;\n}\n\n.cell.miss {\n  background-color: rgba(249, 125, 125, 0.569);\n}\n\n.cell.hit {\n  background-color: rgba(59, 147, 59, 0.605);\n}\n\n#human .cell.carrier,\n#human .cell.battleship,\n#human .cell.cruiser,\n#human .cell.destroyer,\n#human .cell.submarine {\n  background-color: rgb(116, 116, 116);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE;;qBAEmB;EACnB,sBAAsB;EACtB,YAAY;EACZ,WAAW;EACX,8BAA8B;EAC9B,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,+BAA+B;EAC/B,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,wBAAwB;EACxB,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,0BAA0B;EAC1B,4CAA4C;AAC9C;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,uBAAuB;EACvB,kBAAkB;EAClB,4CAA4C;AAC9C;;AAEA;EACE,aAAa;EACb,2DAA2D;EAC3D,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,8DAA8D;AAChE;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,6BAA6B;EAC7B,mCAAmC;EACnC,uBAAuB;AACzB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;;;;;EAKE,oCAAoC;AACtC","sourcesContent":["* {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',\n    'Segoe UI Symbol';\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  background: rgb(179, 179, 179);\n  font-weight: 500;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr 1fr 5fr;\n  height: 100vh;\n  justify-items: center;\n}\n\nh1 {\n  margin: 36px;\n  font-size: 4rem;\n}\n\n.messageContainer {\n  grid-area: 2 / 1 / 3 / 2;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 8px 24px 8px 24px;\n  background-color: rgba(121, 121, 121, 0.605);\n}\n\n.gameArea {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 128px;\n  margin-top: 48px;\n}\n\n.boardHeader {\n  text-align: center;\n  font-size: 1.3rem;\n  border: 1px solid black;\n  border-bottom: 0px;\n  background-color: rgba(121, 121, 121, 0.605);\n}\n\n.board {\n  display: grid;\n  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n  width: 351px;\n  border: 1px solid black;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n}\n\n.cell {\n  width: 35px;\n  height: 35px;\n  color: rgba(255, 255, 255, 0);\n  background-color: rgb(62, 119, 243);\n  border: 1px solid black;\n}\n\n.cell.miss {\n  background-color: rgba(249, 125, 125, 0.569);\n}\n\n.cell.hit {\n  background-color: rgba(59, 147, 59, 0.605);\n}\n\n#human .cell.carrier,\n#human .cell.battleship,\n#human .cell.cruiser,\n#human .cell.destroyer,\n#human .cell.submarine {\n  background-color: rgb(116, 116, 116);\n}\n"],"sourceRoot":""}]);
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
  var list = []; // return the list of modules as css string

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
  }; // import a list of modules into the list


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
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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
  } // For old IE

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/game.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS1pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgbGV0IGJvYXJkID0ge307XG4gIGJvYXJkLnNoaXBzID0gW107XG4gIGJvYXJkLndpZHRoID0gMTA7XG4gIGJvYXJkLmhlaWdodCA9IDEwO1xuXG4gIGJvYXJkLmdyaWQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5oZWlnaHQ7IGkrKykge1xuICAgIGxldCByb3cgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLndpZHRoOyBpKyspIHtcbiAgICAgIGxldCBjZWxsID0gJyc7XG4gICAgICByb3cucHVzaChjZWxsKTtcbiAgICB9XG4gICAgYm9hcmQuZ3JpZC5wdXNoKHJvdyk7XG4gIH1cblxuICBib2FyZC5hZGRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdmVydCkgPT4ge1xuICAgIGxldCBzaGlwID0gY3JlYXRlU2hpcChsZW5ndGgpO1xuICAgIGlmICh2ZXJ0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghYm9hcmQuZ3JpZFt5IC0gMSArIGldKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkLmdyaWRbeSAtIDEgKyBpXVt4IC0gMV0gIT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkLmdyaWRbeSAtIDEgKyBpXVt4IC0gMV0gPSBzaGlwLm5hbWU7XG4gICAgICB9XG4gICAgICBib2FyZC5zaGlwcy5wdXNoKHNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZC5ncmlkW3kgLSAxXVt4IC0gMSArIGldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDEgKyBpXSAhPT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDEgKyBpXSA9IHNoaXAubmFtZTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuICB9O1xuXG4gIGJvYXJkLnJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGxldCBoaXRDb29yZCA9IGJvYXJkLmdyaWRbeSAtIDFdW3ggLSAxXTtcbiAgICBpZiAoaGl0Q29vcmQgPT09ICcnKSB7XG4gICAgICBoaXRDb29yZCA9ICdtaXNzJztcbiAgICB9IGVsc2Uge1xuICAgICAgYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoaGl0Q29vcmQgPT09IHNoaXAubmFtZSkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG4gICAgICAgICAgaGl0Q29vcmQgPSAnaGl0JztcbiAgICAgICAgICBib2FyZC5mbGVldFN1bmsoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDFdID0gaGl0Q29vcmQpO1xuICB9O1xuXG4gIGJvYXJkLmZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBsZXQgZmxlZXREZXN0cm95ZWQgPSB0cnVlO1xuICAgIGJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuayA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmxlZXREZXN0cm95ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmxlZXREZXN0cm95ZWQ7XG4gIH07XG5cbiAgcmV0dXJuIGJvYXJkO1xufVxuIiwiaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcmFuZG9tQ29vcmQgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQYWdlKGVsZW1lbnQpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gJ0JhdHRsZXNoaXAnO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnN0IGdhbWVBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdhbWVBcmVhLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVBcmVhJyk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2FtZUFyZWEpO1xuICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbWVzc2FnZUNvbnRhaW5lcicpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VDb250YWluZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQm9hcmQocGxheWVyLCBlbGVtZW50KSB7XG4gIGNvbnN0IGJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJvYXJkRGl2LmNsYXNzTGlzdC50b2dnbGUoJ2JvYXJkQ29udGFpbmVyJyk7XG5cbiAgY29uc3QgYm9hcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYm9hcmRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYm9hcmRIZWFkZXInKTtcbiAgaWYgKHBsYXllci50eXBlID09PSAnY29tcHV0ZXInKSB7XG4gICAgYm9hcmRIZWFkZXIudGV4dENvbnRlbnQgPSAnRW5lbXkgRmxlZXQnO1xuICB9IGVsc2Uge1xuICAgIGJvYXJkSGVhZGVyLnRleHRDb250ZW50ID0gJ1lvdXIgRmxlZXQnO1xuICB9XG4gIGJvYXJkRGl2LmFwcGVuZENoaWxkKGJvYXJkSGVhZGVyKTtcblxuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBib2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdib2FyZCcpO1xuICBib2FyZC5pZCA9IGAke3BsYXllci50eXBlfWA7XG4gIHBsYXllci5ib2FyZC5ncmlkLmZvckVhY2goKHJvdykgPT4ge1xuICAgIGNvbnN0IHJvd0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvd0Rpdi5jbGFzc0xpc3QudG9nZ2xlKCdyb3cnKTtcbiAgICBsZXQgaSA9IDE7XG4gICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGxEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnY2VsbCcpO1xuICAgICAgaWYgKGNlbGwgIT09ICcnKSB7XG4gICAgICAgIGNlbGxEaXYuY2xhc3NMaXN0LnRvZ2dsZShgJHtjZWxsfWApO1xuICAgICAgfVxuICAgICAgY2VsbERpdi5zZXRBdHRyaWJ1dGUoJ3knLCBgJHtwbGF5ZXIuYm9hcmQuZ3JpZC5pbmRleE9mKHJvdykgKyAxfWApO1xuICAgICAgY2VsbERpdi5zZXRBdHRyaWJ1dGUoJ3gnLCBgJHtpfWApO1xuICAgICAgY2VsbERpdi5pbm5lckhUTUwgPSBjZWxsO1xuICAgICAgcm93RGl2LmFwcGVuZENoaWxkKGNlbGxEaXYpO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvd0Rpdik7XG4gIH0pO1xuICBib2FyZERpdi5hcHBlbmRDaGlsZChib2FyZCk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYm9hcmREaXYpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZChwbGF5ZXIsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgcGxheWVyLmJvYXJkLmdyaWQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgY29uc3Qgcm93RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93RGl2LmNsYXNzTGlzdC50b2dnbGUoJ3JvdycpO1xuICAgIGxldCBpID0gMTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbERpdi5jbGFzc0xpc3QudG9nZ2xlKCdjZWxsJyk7XG4gICAgICBpZiAoY2VsbCAhPT0gJycpIHtcbiAgICAgICAgY2VsbERpdi5jbGFzc0xpc3QudG9nZ2xlKGAke2NlbGx9YCk7XG4gICAgICB9XG4gICAgICBjZWxsRGl2LnNldEF0dHJpYnV0ZSgneScsIGAke3BsYXllci5ib2FyZC5ncmlkLmluZGV4T2Yocm93KSArIDF9YCk7XG4gICAgICBjZWxsRGl2LnNldEF0dHJpYnV0ZSgneCcsIGAke2l9YCk7XG4gICAgICBjZWxsRGl2LmlubmVySFRNTCA9IGNlbGw7XG4gICAgICByb3dEaXYuYXBwZW5kQ2hpbGQoY2VsbERpdik7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChyb3dEaXYpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0QXR0YWNrTG9vcChwbGF5ZXIsIG9wcG9uZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZUNvbnRhaW5lcicpO1xuICBjb25zdCBvcHBvbmVudEJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7b3Bwb25lbnQudHlwZX1gKTtcbiAgY29uc3Qgcm93cyA9IG9wcG9uZW50Qm9hcmQuY2hpbGRyZW47XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IG4gPSAwOyBuIDwgcm93c1tpXS5jaGlsZHJlbi5sZW5ndGg7IG4rKykge1xuICAgICAgbGV0IGNlbGwgPSByb3dzW2ldLmNoaWxkcmVuW25dO1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBsYXllci5tYWtlQXR0YWNrKFxuICAgICAgICAgICAgb3Bwb25lbnQsXG4gICAgICAgICAgICBjZWxsLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoJ3knKVxuICAgICAgICAgICkgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgb3Bwb25lbnQubWFrZUF0dGFjayhwbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllci5tYWtlQXR0YWNrKFxuICAgICAgICAgIG9wcG9uZW50LFxuICAgICAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKCd4JyksXG4gICAgICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoJ3knKVxuICAgICAgICApO1xuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZW5kZXJCb2FyZChwbGF5ZXIsIGVsZW1lbnQpO1xuICAgICAgICByZW5kZXJCb2FyZChvcHBvbmVudCwgZWxlbWVudCk7XG4gICAgICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIsIG9wcG9uZW50KSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICAgIHJlbmRlcldpbk1lc3NhZ2Uob3Bwb25lbnQsIG1lc3NhZ2VDb250YWluZXIpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrV2lubmVyKHBsYXllciwgb3Bwb25lbnQpID09PSAnaHVtYW4nKSB7XG4gICAgICAgICAgcmVuZGVyV2luTWVzc2FnZShwbGF5ZXIsIG1lc3NhZ2VDb250YWluZXIpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXJ0QXR0YWNrTG9vcChwbGF5ZXIsIG9wcG9uZW50LCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2lubmVyKHBsYXllciwgY29tcHV0ZXIpIHtcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmZsZWV0U3VuaygpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICdodW1hbic7XG4gIH0gZWxzZSBpZiAocGxheWVyLmJvYXJkLmZsZWV0U3VuaygpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICdjb21wdXRlcic7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyV2luTWVzc2FnZShwbGF5ZXIsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5pbm5lclRleHQgPSAnJztcbiAgaWYgKHBsYXllci50eXBlID09PSAnY29tcHV0ZXInKSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdZb3VyIGZsZWV0IGlzIGRlc3Ryb3llZC4gWW91IGxvc2UuJztcbiAgfSBlbHNlIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnWW91IGhhdmUgZGVzdHJveWVkIHRoZSBlbmVteSBmbGVldC4gWW91IHdpbi4nO1xuICB9XG4gIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwbGF5QWdhaW4uY2xhc3NMaXN0LnRvZ2dsZSgnc3RhcnRCdXR0b24nKTtcbiAgcGxheUFnYWluLnRleHRDb250ZW50ID0gJ05ldyBHYW1lJztcbiAgcGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGdhbWVMb29wKCk7XG4gIH0pO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHBsYXlBZ2Fpbik7XG59XG5cbmxldCB2ZXJ0aWNhbCA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlRmxlZXQocGxheWVyLCBvcHBvbmVudCwgZWxlbWVudCwgbGVuZ3RoKSB7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZUNvbnRhaW5lcicpO1xuICBmbGVldE1lc3NhZ2UobGVuZ3RoLCBtZXNzYWdlQ29udGFpbmVyKTtcbiAgaWYgKGxlbmd0aCA8PSAwKSB7XG4gICAgcmVtb3ZlUGxhY2VtZW50TGlzdGVuZXJzKHBsYXllcik7XG4gICAgc3RhcnRBdHRhY2tMb29wKHBsYXllciwgb3Bwb25lbnQsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpKTtcbiAgfSBlbHNlIHtcbiAgICBheGlzQnV0dG9uKG1lc3NhZ2VDb250YWluZXIpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyLnR5cGV9YCk7XG4gICAgY29uc3Qgcm93cyA9IHBsYXllckJvYXJkLmNoaWxkcmVuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCByb3dzW2ldLmNoaWxkcmVuLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIGxldCBjZWxsID0gcm93c1tpXS5jaGlsZHJlbltuXTtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwbGF5ZXIuYm9hcmQuYWRkU2hpcChcbiAgICAgICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgICAgICBjZWxsLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgICAgICAgICBjZWxsLmdldEF0dHJpYnV0ZSgneScpLFxuICAgICAgICAgICAgICB2ZXJ0aWNhbFxuICAgICAgICAgICAgKSAhPT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBsYXllci5ib2FyZC5hZGRTaGlwKFxuICAgICAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKCd4JyksXG4gICAgICAgICAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKCd5JyksXG4gICAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcGxhY2VOZXh0U2hpcChwbGF5ZXIsIG9wcG9uZW50LCBlbGVtZW50LCBsZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBsYWNlTmV4dFNoaXAocGxheWVyLCBvcHBvbmVudCwgZWxlbWVudCwgbGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVQbGFjZW1lbnRMaXN0ZW5lcnMocGxheWVyKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyLnR5cGV9YCk7XG4gIGNvbnN0IHJvd3MgPSBwbGF5ZXJCb2FyZC5jaGlsZHJlbjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCByb3dzW2ldLmNoaWxkcmVuLmxlbmd0aDsgbisrKSB7XG4gICAgICBsZXQgY2VsbCA9IHJvd3NbaV0uY2hpbGRyZW5bbl07XG4gICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcGxheWVyLmJvYXJkLmFkZFNoaXAoXG4gICAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgICBjZWxsLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoJ3knKSxcbiAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgKSAhPT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgcGxheWVyLmJvYXJkLmFkZFNoaXAoXG4gICAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgICBjZWxsLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoJ3knKSxcbiAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQuc2hpcHMpO1xuICAgICAgICAgIGlmIChsZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwbGFjZU5leHRTaGlwKHBsYXllciwgZWxlbWVudCwgbGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwbGFjZU5leHRTaGlwKHBsYXllciwgZWxlbWVudCwgbGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWNlTmV4dFNoaXAocGxheWVyLCBvcHBvbmVudCwgZWxlbWVudCwgbGVuZ3RoKSB7XG4gIHVwZGF0ZUJvYXJkKHBsYXllciwgZWxlbWVudCk7XG4gIHBsYWNlRmxlZXQocGxheWVyLCBvcHBvbmVudCwgZWxlbWVudCwgbGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlUmFuZG9tRmxlZXQocGxheWVyLCBlbGVtZW50LCBsZW5ndGgpIHtcbiAgbGV0IHZlcnQgPSByYW5kb21Db29yZCgpO1xuICBpZiAodmVydCA+IDUpIHtcbiAgICB2ZXJ0ID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB2ZXJ0ID0gZmFsc2U7XG4gIH1cbiAgbGV0IHggPSByYW5kb21Db29yZCgpO1xuICBsZXQgeSA9IHJhbmRvbUNvb3JkKCk7XG4gIGlmIChwbGF5ZXIuYm9hcmQuYWRkU2hpcChsZW5ndGgsIHgsIHksIHZlcnQpICE9PSBmYWxzZSkge1xuICAgIHBsYXllci5ib2FyZC5hZGRTaGlwKGxlbmd0aCwgeCwgeSwgdmVydCk7XG4gICAgaWYgKGxlbmd0aCA+IDEpIHtcbiAgICAgIHBsYWNlUmFuZG9tRmxlZXQocGxheWVyLCBlbGVtZW50LCBsZW5ndGggLSAxKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuZ3RoID4gMSkge1xuICAgIHBsYWNlUmFuZG9tRmxlZXQocGxheWVyLCBlbGVtZW50LCBsZW5ndGgpO1xuICB9XG4gIHVwZGF0ZUJvYXJkKHBsYXllciwgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGZsZWV0TWVzc2FnZShsZW5ndGgsIGVsZW1lbnQpIHtcbiAgaWYgKGxlbmd0aCA9PT0gNSkge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJ1BsYWNlIHlvdXIgQ2Fycmllcic7XG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSA0KSB7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnUGxhY2UgeW91ciBCYXR0bGVzaGlwJztcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICdQbGFjZSB5b3VyIENydWlzZXInO1xuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJ1BsYWNlIHlvdXIgRGVzdHJveWVyJztcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICdQbGFjZSB5b3VyIFN1Ym1hcmluZSc7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnTGF1bmNoIHlvdXIgYXR0YWNrISc7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXhpc0J1dHRvbihlbGVtZW50KSB7XG4gIGNvbnN0IGF4aXNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYXhpc0J1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdheGlzQnV0dG9uJyk7XG4gIGF4aXNCdXR0b24uaW5uZXJUZXh0ID0gJ0NoYW5nZSBBeGlzJztcbiAgYXhpc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAodmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICB2ZXJ0aWNhbCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZlcnRpY2FsID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChheGlzQnV0dG9uKTtcbn1cbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHtcbiAgcmVuZGVyQm9hcmQsXG4gIHJlbmRlclBhZ2UsXG4gIHBsYWNlRmxlZXQsXG4gIHBsYWNlUmFuZG9tRmxlZXQsXG59IGZyb20gJy4vZG9tLWludGVyYWN0aW9uJztcblxucmVuZGVyUGFnZShkb2N1bWVudC5ib2R5KTtcbmNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZUNvbnRhaW5lcicpO1xuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbnN0YXJ0QnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ3N0YXJ0QnV0dG9uJyk7XG5zdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdGFydCBHYW1lJztcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBnYW1lTG9vcCgpO1xufSk7XG5tZXNzYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUFyZWEnKS5pbm5lckhUTUwgPSAnJztcbiAgbGV0IHBsYXllcnMgPSBbXTtcbiAgbGV0IGh1bWFuID0gY3JlYXRlUGxheWVyKCdodW1hbicpO1xuICBsZXQgY29tcHV0ZXIgPSBjcmVhdGVQbGF5ZXIoJ2NvbXB1dGVyJyk7XG4gIHBsYXllcnMucHVzaChodW1hbik7XG4gIHBsYXllcnMucHVzaChjb21wdXRlcik7XG5cbiAgcGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICByZW5kZXJCb2FyZChwbGF5ZXIsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpKTtcbiAgfSk7XG5cbiAgcGxhY2VGbGVldChodW1hbiwgY29tcHV0ZXIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1hbicpLCA1KTtcbiAgcGxhY2VSYW5kb21GbGVldChjb21wdXRlciwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyJyksIDUpO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQgfSBmcm9tICcuL2JvYXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gIGxldCBwbGF5ZXIgPSB7fTtcblxuICBwbGF5ZXIudHlwZSA9IHR5cGU7XG4gIHBsYXllci5ib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgcGxheWVyLm1ha2VBdHRhY2sgPSAob3Bwb25lbnQsIHgsIHkpID0+IHtcbiAgICBpZiAocGxheWVyLnR5cGUgPT09ICdjb21wdXRlcicpIHtcbiAgICAgIGxldCB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgIGxldCB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgIGlmIChcbiAgICAgICAgb3Bwb25lbnQuYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDFdICE9PSAnbWlzcycgJiZcbiAgICAgICAgb3Bwb25lbnQuYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDFdICE9PSAnaGl0J1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBvcHBvbmVudC5ib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxheWVyLm1ha2VBdHRhY2sob3Bwb25lbnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGxheWVyLnR5cGUgPT09ICdodW1hbicpIHtcbiAgICAgIGlmIChcbiAgICAgICAgb3Bwb25lbnQuYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDFdICE9PSAnbWlzcycgJiZcbiAgICAgICAgb3Bwb25lbnQuYm9hcmQuZ3JpZFt5IC0gMV1beCAtIDFdICE9PSAnaGl0J1xuICAgICAgKSB7XG4gICAgICAgIG9wcG9uZW50LmJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gcGxheWVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ29vcmQoKSB7XG4gIHJldHVybiAoXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1hdGguZmxvb3IoMTApIC0gTWF0aC5jZWlsKDEpICsgMSkpICtcbiAgICBNYXRoLmNlaWwoMSlcbiAgKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKGxlbmd0aCkge1xuICBsZXQgc2hpcCA9IHt9O1xuXG4gIHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuICBzaGlwLmhpdENvdW50ID0gMDtcbiAgc2hpcC5pc1N1bmsgPSBmYWxzZTtcblxuICBpZiAoc2hpcC5sZW5ndGggPT09IDEpIHtcbiAgICBzaGlwLm5hbWUgPSAnc3VibWFyaW5lJztcbiAgfSBlbHNlIGlmIChzaGlwLmxlbmd0aCA9PT0gMikge1xuICAgIHNoaXAubmFtZSA9ICdkZXN0cm95ZXInO1xuICB9IGVsc2UgaWYgKHNoaXAubGVuZ3RoID09PSAzKSB7XG4gICAgc2hpcC5uYW1lID0gJ2NydWlzZXInO1xuICB9IGVsc2UgaWYgKHNoaXAubGVuZ3RoID09PSA0KSB7XG4gICAgc2hpcC5uYW1lID0gJ2JhdHRsZXNoaXAnO1xuICB9IGVsc2UgaWYgKHNoaXAubGVuZ3RoID09PSA1KSB7XG4gICAgc2hpcC5uYW1lID0gJ2NhcnJpZXInO1xuICB9XG5cbiAgc2hpcC5oaXQgPSAoKSA9PiB7XG4gICAgc2hpcC5oaXRDb3VudCArPSAxO1xuICAgIHNoaXAuY2hlY2tTdW5rKCk7XG4gIH07XG5cbiAgc2hpcC5jaGVja1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHNoaXAuaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICBzaGlwLmlzU3VuayA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBzaGlwO1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLFxcbiAgICBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCAnQXBwbGUgQ29sb3IgRW1vamknLCAnU2Vnb2UgVUkgRW1vamknLFxcbiAgICAnU2Vnb2UgVUkgU3ltYm9sJztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBtYXJnaW46IDBweDtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzksIDE3OSwgMTc5KTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDFmciA1ZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMSB7XFxuICBtYXJnaW46IDM2cHg7XFxuICBmb250LXNpemU6IDRyZW07XFxufVxcblxcbi5tZXNzYWdlQ29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gMjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbmJ1dHRvbiB7XFxuICBwYWRkaW5nOiA4cHggMjRweCA4cHggMjRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTIxLCAxMjEsIDEyMSwgMC42MDUpO1xcbn1cXG5cXG4uZ2FtZUFyZWEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdhcDogMTI4cHg7XFxuICBtYXJnaW4tdG9wOiA0OHB4O1xcbn1cXG5cXG4uYm9hcmRIZWFkZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1ib3R0b206IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTIxLCAxMjEsIDEyMSwgMC42MDUpO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyO1xcbiAgd2lkdGg6IDM1MXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyO1xcbn1cXG5cXG4uY2VsbCB7XFxuICB3aWR0aDogMzVweDtcXG4gIGhlaWdodDogMzVweDtcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDYyLCAxMTksIDI0Myk7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0OSwgMTI1LCAxMjUsIDAuNTY5KTtcXG59XFxuXFxuLmNlbGwuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTksIDE0NywgNTksIDAuNjA1KTtcXG59XFxuXFxuI2h1bWFuIC5jZWxsLmNhcnJpZXIsXFxuI2h1bWFuIC5jZWxsLmJhdHRsZXNoaXAsXFxuI2h1bWFuIC5jZWxsLmNydWlzZXIsXFxuI2h1bWFuIC5jZWxsLmRlc3Ryb3llcixcXG4jaHVtYW4gLmNlbGwuc3VibWFyaW5lIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTYsIDExNiwgMTE2KTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFOztxQkFFbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixXQUFXO0VBQ1gsOEJBQThCO0VBQzlCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwrQkFBK0I7RUFDL0IsYUFBYTtFQUNiLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQiw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLFVBQVU7RUFDVixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJEQUEyRDtFQUMzRCxZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhEQUE4RDtBQUNoRTs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osNkJBQTZCO0VBQzdCLG1DQUFtQztFQUNuQyx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSwwQ0FBMEM7QUFDNUM7O0FBRUE7Ozs7O0VBS0Usb0NBQW9DO0FBQ3RDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgZm9udC1mYW1pbHk6IHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sXFxuICAgIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsICdBcHBsZSBDb2xvciBFbW9qaScsICdTZWdvZSBVSSBFbW9qaScsXFxuICAgICdTZWdvZSBVSSBTeW1ib2wnO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIG1hcmdpbjogMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDE3OSwgMTc5LCAxNzkpO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMWZyIDVmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgxIHtcXG4gIG1hcmdpbjogMzZweDtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG59XFxuXFxuLm1lc3NhZ2VDb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiAyIC8gMSAvIDMgLyAyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDhweCAyNHB4IDhweCAyNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjEsIDEyMSwgMTIxLCAwLjYwNSk7XFxufVxcblxcbi5nYW1lQXJlYSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ2FwOiAxMjhweDtcXG4gIG1hcmdpbi10b3A6IDQ4cHg7XFxufVxcblxcbi5ib2FyZEhlYWRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWJvdHRvbTogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjEsIDEyMSwgMTIxLCAwLjYwNSk7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnI7XFxuICB3aWR0aDogMzUxcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnIgMWZyIDFmciAxZnI7XFxufVxcblxcbi5jZWxsIHtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjIsIDExOSwgMjQzKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ5LCAxMjUsIDEyNSwgMC41NjkpO1xcbn1cXG5cXG4uY2VsbC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1OSwgMTQ3LCA1OSwgMC42MDUpO1xcbn1cXG5cXG4jaHVtYW4gLmNlbGwuY2FycmllcixcXG4jaHVtYW4gLmNlbGwuYmF0dGxlc2hpcCxcXG4jaHVtYW4gLmNlbGwuY3J1aXNlcixcXG4jaHVtYW4gLmNlbGwuZGVzdHJveWVyLFxcbiNodW1hbiAuY2VsbC5zdWJtYXJpbmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNiwgMTE2LCAxMTYpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsInNoaXBzIiwid2lkdGgiLCJoZWlnaHQiLCJncmlkIiwiaSIsInJvdyIsImNlbGwiLCJwdXNoIiwiYWRkU2hpcCIsImxlbmd0aCIsIngiLCJ5IiwidmVydCIsInNoaXAiLCJuYW1lIiwidW5kZWZpbmVkIiwicmVjZWl2ZUF0dGFjayIsImhpdENvb3JkIiwiZm9yRWFjaCIsImhpdCIsImZsZWV0U3VuayIsImZsZWV0RGVzdHJveWVkIiwiaXNTdW5rIiwiZ2FtZUxvb3AiLCJyYW5kb21Db29yZCIsInJlbmRlclBhZ2UiLCJlbGVtZW50IiwiaGVhZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImdhbWVBcmVhIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwibWVzc2FnZUNvbnRhaW5lciIsInJlbmRlckJvYXJkIiwicGxheWVyIiwiYm9hcmREaXYiLCJib2FyZEhlYWRlciIsInR5cGUiLCJpZCIsInJvd0RpdiIsImNlbGxEaXYiLCJzZXRBdHRyaWJ1dGUiLCJpbmRleE9mIiwiaW5uZXJIVE1MIiwidXBkYXRlQm9hcmQiLCJzdGFydEF0dGFja0xvb3AiLCJvcHBvbmVudCIsInF1ZXJ5U2VsZWN0b3IiLCJvcHBvbmVudEJvYXJkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyb3dzIiwiY2hpbGRyZW4iLCJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1ha2VBdHRhY2siLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1dpbm5lciIsInJlbmRlcldpbk1lc3NhZ2UiLCJjb21wdXRlciIsImlubmVyVGV4dCIsInBsYXlBZ2FpbiIsInZlcnRpY2FsIiwicGxhY2VGbGVldCIsImZsZWV0TWVzc2FnZSIsInJlbW92ZVBsYWNlbWVudExpc3RlbmVycyIsImF4aXNCdXR0b24iLCJwbGF5ZXJCb2FyZCIsInBsYWNlTmV4dFNoaXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInBsYWNlUmFuZG9tRmxlZXQiLCJjcmVhdGVQbGF5ZXIiLCJib2R5Iiwic3RhcnRCdXR0b24iLCJwbGF5ZXJzIiwiaHVtYW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjZWlsIiwiaGl0Q291bnQiLCJjaGVja1N1bmsiXSwic291cmNlUm9vdCI6IiJ9