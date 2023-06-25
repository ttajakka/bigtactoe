import { changeInstruction, toid } from "./helpers.js";
import { resetBoard } from "./boardOps.js";
import { Move, NormalGame, ReverseGame } from "./GameClass.js";
import { updateBoard } from "./boardOps.js";

const clickNode = (game, move) => () => {
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

const clickNodeOnline = (game, move) => () => {
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

  updateClicksOnline(game);

  fetch(`http://127.0.0.1:3000/game/${gameID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      move: move,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('from clickPlay:', res)
      
      // document.getElementById("game-counter").innerText = res.count;
      // const playButton = document.getElementById("play-button");
      // playButton.innerText = "Opponent's turn"
      // playButton.onclick = () => null;
      // requestMove(gameID)
    });
};

const updateClicks = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick = clickNode(
        game,
        new Move(x, y)
      );
    }
  }
};

const updateClicksOnline = (gameID, game, side) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick =
        side === game.toPlay()
          ? clickNodeOnline(gameID, game, new Move(x, y))
          : () => null;
    }
  }
};

export const clickNewGame = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  document.getElementById("information").style.display = "initial";
  changeInstruction("X starts");
  resetBoard();

  const game = mode === "normal" ? new NormalGame() : new ReverseGame();
  updateClicks(game);
};

export const clickNewOnline = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  document.getElementById("information").style.display = "initial";
  changeInstruction("Waiting for opponent...");
  fetch("http://127.0.0.1:3000/newgame")
    .then((res) => res.json())
    .then((res) => {
      const { gameID, side } = res;
      console.log("from clickNewGame:", res);
      changeInstruction("Game id: " + gameID + ", you play: " + side);
      // document.getElementById("box").style.display = "initial";
      resetBoard();
      const game = mode === "normal" ? new NormalGame() : new ReverseGame();
      updateClicksOnline(gameID, game, side);
    });
};
