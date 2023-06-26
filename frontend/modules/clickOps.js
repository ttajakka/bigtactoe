import { changeInstruction, toid } from "./helpers.js";
import { resetBoard } from "./boardOps.js";
import { Move, NormalGame, ReverseGame } from "./GameClass.js";
import { updateBoard } from "./boardOps.js";

const BASEURL = "http://127.0.0.1:3000";

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
  console.log({ x: move.x, y: move.y });

  fetch(`${BASEURL}/game/${game.gameID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      move: { x: move.x, y: move.y },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("from response to POST:", res);
      waitForOpponent(game);

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

const updateClicksOnline = (game, side) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick =
        side === game.toPlay()
          ? clickNodeOnline(game, new Move(x, y))
          : () => null;
    }
  }
};

const activateClicks = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick = clickNodeOnline(
        game,
        new Move(x, y)
      );
    }
  }
};

const waitForOpponent = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick = () => null;
    }
  }
  fetch(`${BASEURL}/game/${game.gameID}`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      const { x, y } = res;
      game.update(new Move(x, y));
      updateBoard(game);
      activateClicks(game);
    });
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
  changeInstruction("Finding an opponent...");
  fetch(`${BASEURL}/newgame`)
    .then((res) => res.json())
    .then((res) => {
      const { gameID, side } = res;
      console.log("from clickNewGame:", res);
      changeInstruction("Game id: " + gameID + ", you play: " + side);
      resetBoard();
      const game =
        mode === "normal" ? new NormalGame(gameID) : new ReverseGame(gameID);

      if (side === "X") {
        activateClicks(game);
      }
      if (side === "O") {
        waitForOpponent(game);
      }
    });
};
