import { changeInstruction, toNodeId } from "./helpers.js";
import { updateBoard, resetBoard } from "./boardOps.js";
import { Move, ClassicalGame, ReverseGame } from "./GameClass.js";

export const clickNode = (game, move) => () => {
  if (!game.isLegal(move)) {
    return null;
  }

  game.update(move);
  updateBoard(game);

  if (game.victory()) {
    changeInstruction(game.moves.length % 2 ? "X wins!" : "O wins!");
    freezeClicks();
    return null;
  } else {
    changeInstruction(game.moves.length % 2 ? "O to play" : "X to play");
  }

  updateClicks(game);

  return null;
};

const updateClicks = (game) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const node = document.getElementById(toNodeId({ x: i, y: j }));
      node.onclick = clickNode(game, new Move(i, j));
    }
  }
};

export const freezeClicks = () => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toNodeId({ x, y })).onclick = () => {
        return null;
      };
    }
  }
};

export const clickNewClassical = () => {
  document.getElementById("modeinfo").innerText = "rules: classical";
  changeInstruction("X starts");
  resetBoard();

  const game = new ClassicalGame();
  updateClicks(game);
}

export const clickNewReverse = () => {
  document.getElementById("modeinfo").innerText = "rules: reversed";
  changeInstruction("X starts");
  resetBoard();

  const game = new ReverseGame();
  updateClicks(game);
};

export const clickNewGame = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  changeInstruction("X starts");
  resetBoard();

  const game = mode === "classical" ? new ClassicalGame() : new ReverseGame();
  updateClicks(game);
};

