export const initialState = {
  moves: [],
  bigstate: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  smallstate: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  decided: [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]
}

const ended = (gamestate) => {
  return victory(gamestate) || draw(gamestate)
}

const draw = (gamestate) => {
  if (victory(gamestate)) return false;
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      if (!squareDecided(gamestate, { xsmall, ysmall })) return false;
    }
  }
  return true;
}

export const getActiveSquares = (gamestate) => {
  const active = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  if (gamestate.moves.length == 0)
    return active
  const { xsmall, ysmall } = getNextSquare(gamestate);
  if (!squareDecided(gamestate, { xsmall, ysmall })) {
    active[xsmall][ysmall] = true;
    return active;
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!squareDecided(gamestate, { xsmall: i, ysmall: j })) {
          active[i][j] = true;
        }
      }
    }
    return active;
  }
}

const getLast = (gamestate) => {
  return gamestate.moves[gamestate.moves.length - 1];
}

const getNextSquare = (gamestate) => {
  const last = getLast(gamestate);
  return { xsmall: last.x % 3, ysmall: last.y % 3 };
}

const getSmallCoords = (move) => {
  return { xsmall: Math.floor(move.x / 3), ysmall: Math.floor(move.y / 3) };
}

const getSquare = (gamestate, { xsmall, ysmall }) => {
  const square = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(gamestate.bigstate[3 * xsmall + i][3 * ysmall + j]);
    }
    square.push(row);
  }
  return square;
}

export const isLegal = (gamestate, move) => {
  if (gamestate.moves.length === 0) return true;
  if (ended(gamestate)) return false;
  if (gamestate.bigstate[move.x][move.y]) {
    return false;
  }
  if (squareDecided(gamestate, getSmallCoords(move))) {
    return false;
  }
  const { xsmall, ysmall } = getSmallCoords(move)
  if (!getActiveSquares(gamestate)[xsmall][ysmall])
    return false;

  return true;
}

const squareDecided = (gamestate, { xsmall, ysmall }) => {
  return gamestate.decided[xsmall][ysmall];
}

const squareFull = (gamestate, { xsmall, ysmall }) => {
  const count = getSquare(gamestate, { xsmall, ysmall })
    .flat()
    .map((i) => Math.abs(i))
    .reduce((sum, a) => sum + a, 0);
  return count === 9;
}

export const squareWon = (gamestate, { xsmall, ysmall }) => {
  const square = getSquare(gamestate, {xsmall, ysmall })
  return testForWin(square);
}

const testForWin = (square) => {
  for (let i = 0; i < 3; i++) {
    const rowsum = square[i][0] + square[i][1] + square[i][2]; // rows
    if (rowsum === 3) return 1; // cross wins
    if (rowsum === -3) return -1; // naught wins
    const colsum = square[0][i] + square[1][i] + square[2][i]; // columns
    if (colsum === 3) return 1;
    if (colsum === -3) return -1;
  }

  // diagonals
  const diagsum = square[0][0] + square[1][1] + square[2][2];
  if (diagsum === 3) return 1;
  if (diagsum === -3) return -1;

  const antidiagsum = square[0][2] + square[1][1] + square[2][0];
  if (antidiagsum === 3) return 1;
  if (antidiagsum === -3) return -1;

  // not over or draw
  return 0;
}

const toPlay = (gamestate) => {
  return gamestate.moves.length % 2 === 0 ? "X" : "O"
}

export const updateState = (gamestate, move) => {
  const newmoves = [...gamestate.moves, move]
  // this.moves.push(move);
  const newbigstate = gamestate.bigstate
  newbigstate[move.x][move.y] = newmoves.length % 2 ? 1 : -1;

  // this.bigstate[move.x][move.y] = this.moves.length % 2 ? 1 : -1;

  const smallcoords = getSmallCoords(move);
  const won = squareWon(gamestate, smallcoords);
  const full = squareFull(gamestate, smallcoords);

  const newsmallstate = gamestate.smallstate
  newsmallstate[smallcoords.xsmall][smallcoords.ysmall] = won;

  const newdecided = gamestate.decided
  newdecided[smallcoords.xsmall][smallcoords.ysmall] = won || full;

  return {
    moves: newmoves,
    bigstate: newbigstate,
    smallstate: newsmallstate,
    decided: newdecided
  }
}

const victory = (gamestate) => {
  return testForWin(gamestate.smallstate);
}
