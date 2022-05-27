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
    boardHeader.textContent = 'Enemy Enemy';
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

export function startAttackLoop(player, opponent, element) {
  const messageContainer = document.querySelector('.messageContainer');
  let opponentBoard = document.getElementById(`${opponent.type}`);
  let rows = opponentBoard.children;
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
        } else if (checkWinner(player, opponent) === 'human') {
          renderWinMessage(player, messageContainer);
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
  const message = document.createElement('div');
  if (player.type === 'computer') {
    message.textContent = 'Your fleet is destroyed. You lose.';
  } else if (player.type === 'human') {
    message.textContent = 'You have destroyed the enemy fleet. You win.';
  }
  element.appendChild(message);
}
