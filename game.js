import { createGameTable } from "./modules/createGameTable.js";

let toPlay = "X";

// initialize game state
const state = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ministate = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// getLocalState takes as input the coordinates of a point,
// returns the state of the 3x3 square it belongs to
const getLocalState = (x, y) => {
  const output = [];
  const xStart = 3 * Math.floor(x / 3);
  const yStart = 3 * Math.floor(y / 3);
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
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
  for (let i = 0; i < 3; i++) {
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

const toId = (i, j) => "el" + i.toString() + j.toString();

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

  let message = "";
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

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const div = document.getElementById(toId(i, j));

      const enabled = !state[i][j] && full;
      div.style.backgroundColor = !state[i][j] && full ? "yellow" : "";
      div.style.border = !state[i][j] && full ? "5px solid red" : "";
      div.onclick =
        !state[i][j] && full
          ? clickSquare(i, j)
          : () => {
              return null;
            };

      if (Math.floor(i / 3) === x % 3 && Math.floor(j / 3) === y % 3) {
        div.style.backgroundColor = !state[i][j] && !full ? "yellow" : "white";
        div.style.border = !state[i][j] && !full ? "5px solid red" : "";
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

// create game area and instruction line
const gamebox = document.getElementById("gamebox");
//const instruction = document.createElement("div");
//instruction.id = "instruction";
const instruction = document.getElementById("instruction");
instruction.innerHTML = "X starts";
//instruction.style = "font-size: 40px;";
//gamebox.appendChild(instruction);

// create game table

createGameTable(gamebox);

// const table = document.createElement("table");
// gamebox.appendChild(table);
// table.id = "bigtable";

// for (let i = 0; i < 3; i++) {
//   const bigrow = document.createElement("tr");
//   table.appendChild(bigrow);

//   for (let j = 0; j < 3; j++) {
//     const bigel = document.createElement("td");
//     bigel.classList.add("bigel");
//     bigel.id = "bigel" + i.toString() + j.toString();
//     bigrow.appendChild(bigel);

//     const subtable = document.createElement("table");
//     subtable.classList.add("subtable");
//     bigel.appendChild(subtable);

//     for (let k = 0; k < 3; k++) {
//       const row = document.createElement("tr");
//       subtable.appendChild(row);

//       for (let l = 0; l < 3; l++) {
//         const el = document.createElement("td");
//         el.id = "el" + (3 * i + k).toString() + (3 * j + l).toString();
//         el.classList.add("el");
//         el.onclick = clickSquare(3 * i + k, 3 * j + l);

//         el.classList.add((3 * i + 3 * j + k + l) % 2 ? "odd" : "even");

//         row.appendChild(el);
//       }
//     }
//   }
// }

//gamegrid.style = "border: 3px solid black; border-collapse: collapse;";
