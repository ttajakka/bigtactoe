import { createTable } from "./table.js";
import { changeInstruction } from "../modules/helpers.js";
import { Move, NormalGame, ReverseGame } from "../modules/GameClass.js";

const toid = (type, { x, y }) => {
  return type + x.toString() + y.toString();
};

export const clickNode = (game, move) => () => {
  if (!game.isLegal(move)) {
    return null;
  }

  game.update(move);
  updateBoard(game);

  if (game.ended()) {
    changeInstruction(
      game.victory() ? (game.moves.length % 2 ? "X wins!" : "O wins!") : "Draw"
    );
  } else {
    changeInstruction(game.moves.length % 2 ? "O to play" : "X to play");
  }

  updateClicks(game);

  return null;
};

const clickNewGame = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  changeInstruction("X starts");
  resetBoard();

  const game = mode === "normal" ? new NormalGame() : new ReverseGame();
  updateClicks(game);
};

const resetBoard = () => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const bg = document.getElementById(toid("bg", { x: xsmall, y: ysmall }));
      bg.classList.remove("active", "cross", "naught");

      const oltd = document.getElementById(
        toid("oltd", { x: xsmall, y: ysmall })
      );
      oltd.innerText = "";
      oltd.classList.remove("cross", "naught");
    }
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toid("tddiv", { x, y }));
      node.classList.remove("active", "cross", "naught");

      node.innerText = "";

      document
        .getElementById(toid("tdbg", { x, y }))
        .classList.remove("active", "last");
    }
  }
};

const updateClicks = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById("td" + x.toString() + y.toString()).onclick =
        // (game.victory())
        game.ended()
          ? () => {
              return null;
            }
          : clickNode(game, new Move(x, y));
    }
  }
};

export const updateBoard = (game) => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const squarewon = game.smallstate[xsmall][ysmall];
      if (squarewon) {
        document
          .getElementById(toid("bg", { x: xsmall, y: ysmall }))
          .classList.add(squarewon === 1 ? "cross" : "naught");
        const oltd = document.getElementById(
          toid("oltd", { x: xsmall, y: ysmall })
        );
        oltd.innerText = squarewon === 1 ? "X" : "O";
        oltd.classList.add(squarewon === 1 ? "cross" : "naught");
      }
    }
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toid("tddiv", { x, y }));
      node.classList.remove("active", "last");

      if (!game.ended() && game.isLegal(new Move(x, y))) {
        node.classList.add("active");
      }
    }
  }

  if (game.variant === "normal") {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const bg = document.getElementById(toid("bg", { x: i, y: j }));
        bg.classList.remove("active");

        const active = game.getActiveSquares();

        if (!game.ended() && active[i][j]) {
          bg.classList.add("active");
        }
      }
    }
  }

  if (game.variant === "reversed") {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const tdbg = document.getElementById(toid("tdbg", { x, y }));
        tdbg.classList.remove("active");

        if (!game.ended() && game.isLegal(new Move(x, y))) {
          tdbg.classList.add("active");
        }
      }
    }
  }

  if (game.moves.length > 1) {
    const { x, y } = game.moves[game.moves.length - 2];
    document
      .getElementById(toid("tdbg", { x, y }))
      .classList.remove("active", "last");
  }

  const { x, y } = game.getLast();
  const lastnode = document.getElementById(toid("tddiv", { x, y }));
  lastnode.innerText = game.moves.length % 2 ? "X" : "O";
  document.getElementById(toid("tdbg", { x, y })).classList.add("last");
  lastnode.classList.add(game.moves.length % 2 ? "cross" : "naught");
};

const gamebox = document.getElementById("box");
createTable(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversegame").onclick = clickNewGame("reversed");
