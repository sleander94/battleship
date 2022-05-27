export function createGameArea(element) {
  const gameArea = document.createElement('div');
  gameArea.classList.toggle('gameArea');
  element.appendChild(gameArea);
}

export function renderBoard(player, element) {
  const boardDiv = document.createElement('div');
  boardDiv.classList.toggle('board');
  boardDiv.id = `${player.type}`;

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
    boardDiv.appendChild(rowDiv);
  });
  element.appendChild(boardDiv);
}

export function listenForAttack(player, opponent, element) {
  let opponentBoard = document.getElementById(`${opponent.type}`);
  let rows = opponentBoard.children;
  for (let i = 0; i < rows.length; i++) {
    for (let n = 0; n < rows[i].children.length; n++) {
      let cell = rows[i].children[n];
      cell.addEventListener('click', () => {
        player.makeAttack(
          opponent,
          cell.getAttribute('x'),
          cell.getAttribute('y')
        );
        opponent.makeAttack(player);
        element.innerHTML = '';
        renderBoard(player, element);
        renderBoard(opponent, element);
        if (checkGameOver(player, opponent)) {
          console.log('gameover');
        } else {
          listenForAttack(player, opponent, element);
        }
      });
    }
  }
}

function checkGameOver(player, computer) {
  if (computer.board.fleetSunk() === true) {
    alert('You win');
    return true;
  } else if (player.board.fleetSunk() === true) {
    alert('Computer wins');
    return true;
  }
}
