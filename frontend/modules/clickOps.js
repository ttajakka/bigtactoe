import { changeInstruction, toid } from "./helpers.js";
import { resetBoard } from "./boardOps.js";
import { Move, NormalGame, ReverseGame } from "./GameClass.js";
import {
  updateBoard,
  removeActive,
  displayActive,
  updateSymbols,
} from "./boardOps.js";

const BASEURL = "http://127.0.0.1:3000";
// const BASEURL = "https://btt-backend.fly.dev"

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

  console.log({ x: move.x, y: move.y });

  game.update(move);
  // updateBoard(game);
  updateSymbols(game);
  removeActive(game.variant);

  if (game.ended()) {
    console.log("GAME ENDED");

    changeInstruction(game.victory() ? "You win!" : "Draw");
  } else {
    changeInstruction("Opponent's turn");
  }

  updateClicksOnline(game);

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
      if (!game.ended()) {
        waitForOpponent(game);
      } else {
        fetch(`${BASEURL}/game/${game.gameID}`).then(() => null);
      }
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
  changeInstruction("Your turn!");
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
  changeInstruction("Opponent's turn");
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick = () => null;
    }
  }
  console.log("making GET to ", game.gameID);

  fetch(`${BASEURL}/game/${game.gameID}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const { x, y } = res;
      game.update(new Move(x, y));

      updateSymbols(game);

      if (game.ended()) {
        changeInstruction(game.victory() ? "Opponent wins!" : "Draw");
      } else {
        changeInstruction("Your turn!");
        displayActive(game);
        activateClicks(game);
      }
    })
    .catch((error) => {
      console.log(error);
      waitForOpponent(game);
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

  requestNewGame();

  // fetch(`${BASEURL}/newgame`)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     const { gameID, side } = res;
  //     console.log("from clickNewGame:", res);
  //     resetBoard();
  //     const game =
  //       mode === "normal" ? new NormalGame(gameID) : new ReverseGame(gameID);

  //     if (side === "X") {
  //       activateClicks(game);
  //     } else {
  //       waitForOpponent(game);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     changeInstruction("No opponent found. Try again.");
  //   });
};

const requestNewGame = () => {
  fetch(`${BASEURL}/newgame`)
    .then((res) => res.json())
    .then((res) => {
      if (res.gameID) {
        const { gameID, side } = res;
        console.log("from clickNewGame:", res);
        resetBoard();
        const game =
          mode === "normal" ? new NormalGame(gameID) : new ReverseGame(gameID);

        if (side === "X") {
          activateClicks(game);
        } else {
          waitForOpponent(game);
        }
      } else {
        console.log('no game found. trying again.')
        changeInstruction('Finding opponent is taking longer than usual...')
        requestNewGame()
      }
    });
  // .catch((e) => {
  //   console.log(e);
  //   console.log("no game found. trying again.")

  //   requestNewGame();
  // });
};
