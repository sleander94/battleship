import { randomCoord } from './player';

export function renderPage(element) {
  const header = document.createElement('h1');
  header.textContent = 'Battleship';
  element.appendChild(header);
  const gameArea = document.createElement('div');
  gameArea.classList.toggle('gameArea');
  element.appendChild(gameArea);
  const messageContainer = document.createElement('div');
  messageContainer.classList.toggle('messageContainer');
  element.appendChild(messageContainer);
}

export function renderBoard(player, element) {
  const boardDiv = document.createElement('div');
  boardDiv.classList.toggle('boardContainer');

  const boardHeader = document.createElement('div');
  boardHeader.classList.toggle('boardHeader');
  if (player.type === 'computer') {
    boardHeader.textContent = 'Enemy Fleet';
  } else {
    boardHeader.textContent = 'Your Fleet';
  }
  boardDiv.appendChild(boardHeader);

  const board = document.createElement('div');
  board.classList.toggle('board');
  board.id = `${player.type}`;
  player.board.grid.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.toggle('row');
    let i = 1;
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.toggle('cell');
      if (cell !== '') {
        cellDiv.classList.toggle(`${cell}`);
      }
      cellDiv.setAttribute('y', `${player.board.grid.indexOf(row) + 1}`);
      cellDiv.setAttribute('x', `${i}`);
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
  player.board.grid.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.toggle('row');
    let i = 1;
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.toggle('cell');
      if (cell !== '') {
        cellDiv.classList.toggle(`${cell}`);
      }
      cellDiv.setAttribute('y', `${player.board.grid.indexOf(row) + 1}`);
      cellDiv.setAttribute('x', `${i}`);
      cellDiv.innerHTML = cell;
      rowDiv.appendChild(cellDiv);
      i += 1;
    });
    element.appendChild(rowDiv);
  });
}

export function startAttackLoop(player, opponent, element) {
  const messageContainer = document.querySelector('.messageContainer');
  const opponentBoard = document.getElementById(`${opponent.type}`);
  const rows = opponentBoard.children;
  for (let i = 0; i < rows.length; i++) {
    for (let n = 0; n < rows[i].children.length; n++) {
      let cell = rows[i].children[n];
      cell.addEventListener('click', () => {
        if (
          player.makeAttack(
            opponent,
            cell.getAttribute('x'),
            cell.getAttribute('y')
          ) === true
        ) {
          opponent.makeAttack(player);
        }
        player.makeAttack(
          opponent,
          cell.getAttribute('x'),
          cell.getAttribute('y')
        );
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
}

let vertical = false;
export function placeFleet(player, element, length) {
  const messageContainer = document.querySelector('.messageContainer');
  fleetMessage(length, messageContainer);
  if (length <= 0) {
    removePlacementListeners(player);
  } else {
    axisButton(messageContainer);
    const playerBoard = document.getElementById(`${player.type}`);
    const rows = playerBoard.children;
    for (let i = 0; i < rows.length; i++) {
      for (let n = 0; n < rows[i].children.length; n++) {
        let cell = rows[i].children[n];
        cell.addEventListener('click', () => {
          if (
            player.board.addShip(
              length,
              cell.getAttribute('x'),
              cell.getAttribute('y'),
              vertical
            ) !== false
          ) {
            player.board.addShip(
              length,
              cell.getAttribute('x'),
              cell.getAttribute('y'),
              vertical
            );
            if (length > 0) {
              placeNextShip(player, element, length - 1);
            }
          } else if (length > 0) {
            placeNextShip(player, element, length);
          }
        });
      }
    }
  }
}

function removePlacementListeners(player) {
  const playerBoard = document.getElementById(`${player.type}`);
  const rows = playerBoard.children;
  for (let i = 0; i < rows.length; i++) {
    for (let n = 0; n < rows[i].children.length; n++) {
      let cell = rows[i].children[n];
      cell.removeEventListener('click', () => {
        if (
          player.board.addShip(
            length,
            cell.getAttribute('x'),
            cell.getAttribute('y'),
            vertical
          ) !== false
        ) {
          player.board.addShip(
            length,
            cell.getAttribute('x'),
            cell.getAttribute('y'),
            vertical
          );
          console.log(player.board.ships);
          if (length > 1) {
            placeNextShip(player, element, length - 1);
          }
        } else if (length > 1) {
          placeNextShip(player, element, length);
        }
      });
    }
  }
}

function placeNextShip(player, element, length) {
  updateBoard(player, element);
  placeFleet(player, element, length);
}

export function placeRandomFleet(player, element, length) {
  let vert = randomCoord();
  if (vert > 5) {
    vert = true;
  } else {
    vert = false;
  }
  let x = randomCoord();
  let y = randomCoord();
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
  const axisButton = document.createElement('button');
  axisButton.classList.toggle('axisButton');
  axisButton.innerText = 'Change Axis';
  axisButton.addEventListener('click', () => {
    if (vertical === false) {
      vertical = true;
    } else {
      vertical = false;
    }
  });
  element.appendChild(axisButton);
}
