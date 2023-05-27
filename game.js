let toPlay = "X";

// helper ranges
range3 = [0, 1, 2];
range9 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// initialize game state
const state = [];
for (i in range9) {
  const row = [];
  for (j in range9) {
    row.push(0);
  }
  state.push(row);
}

const ministate = [];
for (i in range3) {
  const row = [];
  for (j in range3) {
    row.push(0);
  }
  ministate.push(row);
}

// getLocalState takes as input the coordinates of a point,
// returns the state of the 3x3 square it belongs to
const getLocalState = (x, y) => {
  const output = [];
  const xStart = 3 * Math.floor(x / 3);
  const yStart = 3 * Math.floor(y / 3);
  for (i = 0; i < 3; i++) {
    const row = [];
    for (j = 0; j < 3; j++) {
      row.push(state[xStart + i][yStart + j]);
    }
    output.push(row);
  }
  return output;
};

const squareFull = (input) => {
  const b = input
    .flat()
    .map((i) => Math.abs(i))
    .reduce((sum, a) => sum + a, 0);
  return b === 9 ? true : false;
};

// squareWon takes as input a 3x3 array of 0's, 1's, and -1's
// returns +/-1 if +/-1 wins, 0 otherwise
const squareWon = (input) => {
  for (i = 0; i < 3; i++) {
    const rowsum = input[i][0] + input[i][1] + input[i][2]; // rows
    if (rowsum === 3) return 1; // cross wins
    if (rowsum === -3) return -1; // naught wins
    const colsum = input[0][i] + input[1][i] + input[2][i]; // columns
    if (colsum === 3) return 1;
    if (colsum === -3) return -1;
  }

  // diagonals
  const diagsum = input[0][0] + input[1][1] + input[2][2];
  if (diagsum === 3) return 1;
  if (diagsum === -3) return -1;

  const antidiagsum = input[0][2] + input[1][1] + input[2][0];
  if (antidiagsum === 3) return 1;
  if (antidiagsum === -3) return -1;

  // not over or draw
  return 0;
};

const changeInstruction = (message) => {
  document.getElementById("instruction").innerHTML = message;
};

const toId = (i, j) => i.toString() + j.toString();

const clickSquare = (x, y) => () => {
  const current = document.getElementById(toId(x, y));
  if (current.classList.contains("passive")) {
    return null;
  }

  current.innerHTML = toPlay;
  current.style.color = toPlay === "X" ? "blue" : "green";

  state[x][y] = toPlay === "X" ? 1 : -1;
  const local = getLocalState(x, y);
  const localWon = squareWon(local);
  ministate[Math.floor(x / 3)][Math.floor(y / 3)] = localWon;

  toPlay = toPlay === "X" ? "O" : "X";
  const winner = squareWon(ministate);

  if (winner === 1) {
    message = "X wins!";
  } else if (winner === -1) {
    message = "O wins!";
  } else {
    message = `${toPlay} to play`;
  }
  changeInstruction(message);

  if (winner) {
    return null;
  }

  const nextX = 3 * (x % 3);
  const nextY = 3 * (y % 3);
  const next = getLocalState(nextX, nextY);

  // check if the square of the next move is already full
  const full = squareFull(getLocalState(3 * (x % 3), 3 * (y % 3)));

  for (i in range9) {
    for (j in range9) {
      const div = document.getElementById(toId(i, j));

      const enabled = !state[i][j] && full;
      div.style.backgroundColor = !state[i][j] && full ? "yellow" : "white";
      div.onclick =
        !state[i][j] && full
          ? clickSquare(i, j)
          : () => {
              return null;
            };

      if (Math.floor(i / 3) === x % 3 && Math.floor(j / 3) === y % 3) {
        div.style.backgroundColor = !state[i][j] && !full ? "yellow" : "white";
        div.onclick =
          !state[i][j] && !full
            ? clickSquare(i, j)
            : () => {
                return null;
              };
      }
    }
  }
  current.style.backgroundColor = "pink";
};

const mainbox = document.getElementById("gamebox");
const instruction = document.createElement("div");
instruction.id = "instruction";
instruction.innerHTML = "X starts";
instruction.style = "font-size: 40px;";
mainbox.appendChild(instruction);

const table = document.createElement("table");
const row1 = document.createElement("tr");
mainbox.appendChild(table);

for (i in range9) {
  const row = document.createElement("tr");
  for (j in range9) {
    const el = document.createElement("td");
    const div = document.createElement("div");
    el.appendChild(div);

    div.id = i.toString() + j.toString();
    div.className = "active";
    div.onclick = clickSquare(i, j);
    div.style =
      "height: 70px; width: 90px; font-size: 60px; text-align: center";

    el.style = "border: 1px solid black";

    if (i % 3 === 0) {
      el.style.borderTop = "3px solid black";
    }

    if (j % 3 === 0) {
      el.style.borderLeft = "3px solid black";
    }

    row.appendChild(el);
  }
  table.appendChild(row);
}

table.style = "border: 3px solid black; border-collapse: collapse;";
