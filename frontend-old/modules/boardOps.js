import { toid } from "./helpers.js";
import { Move } from "./GameClass.js";

export const resetBoard = () => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      document
        .getElementById(toid("bg", { x: xsmall, y: ysmall }))
        .classList.remove("active", "cross", "naught");

      document
        .getElementById(toid("maintd", { x: xsmall, y: ysmall }))
        .classList.remove("active");

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

// export const updateBoard = (game) => {
//   for (let xsmall = 0; xsmall < 3; xsmall++) {
//     for (let ysmall = 0; ysmall < 3; ysmall++) {
//       const squarewon = game.smallstate[xsmall][ysmall];
//       if (squarewon) {
//         document
//           .getElementById(toid("bg", { x: xsmall, y: ysmall }))
//           .classList.add(squarewon === 1 ? "cross" : "naught");
//         const oltd = document.getElementById(
//           toid("oltd", { x: xsmall, y: ysmall })
//         );
//         oltd.innerText = squarewon === 1 ? "X" : "O";
//         oltd.classList.add(squarewon === 1 ? "cross" : "naught");
//       }
//     }
//   }

//   if (game.variant === "normal") {
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         const maintd = document.getElementById(toid("maintd", { x: i, y: j }));
//         maintd.classList.remove("active");

//         const active = game.getActiveSquares();

//         if (!game.ended() && active[i][j]) {
//           maintd.classList.add("active");
//         }
//       }
//     }
//   }

//   if (game.variant === "reversed") {
//     for (let x = 0; x < 9; x++) {
//       for (let y = 0; y < 9; y++) {
//         const tdbg = document.getElementById(toid("tdbg", { x, y }));
//         tdbg.classList.remove("active");

//         if (game.isLegal(new Move(x, y))) {
//           tdbg.classList.add("active");
//         }
//       }
//     }
//   }

//   if (game.moves.length > 1) {
//     const { x, y } = game.moves[game.moves.length - 2];
//     document
//       .getElementById(toid("tdbg", { x, y }))
//       .classList.remove("active", "last");
//   }

//   const { x, y } = game.getLast();
//   const lastnode = document.getElementById(toid("tddiv", { x, y }));
//   lastnode.innerText = game.moves.length % 2 ? "X" : "O";
//   document.getElementById(toid("tdbg", { x, y })).classList.add("last");
//   lastnode.classList.add(game.moves.length % 2 ? "cross" : "naught");
// };

export const updateBoard = (game) => {
  updateSymbols(game)
  removeActive(game.variant)
  if (!game.ended()) {displayActive(game)}
}

export const updateSymbols = (game) => {
  const { x, y } = game.getLast();
  const xsmall = Math.floor(x / 3);
  const ysmall = Math.floor(y / 3);

  const lastnode = document.getElementById(toid("tddiv", { x, y }));
  lastnode.innerText = game.moves.length % 2 ? "X" : "O";
  lastnode.classList.add(game.moves.length % 2 ? "cross" : "naught");

  if (game.moves.length > 1) {
    document
      .getElementById(toid("tdbg", game.moves[game.moves.length - 2]))
      .classList.remove("last");
  }
  document.getElementById(toid("tdbg", game.getLast())).classList.add("last");

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
};

export const removeActive = (variant) => {
  if (variant === "normal") {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const maintd = document.getElementById(toid("maintd", { x: i, y: j }));
        maintd.classList.remove("active");
      }
    }
  }

  if (variant === "reversed") {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const tdbg = document.getElementById(toid("tdbg", { x, y }));
        tdbg.classList.remove("active");
      }
    }
  }
};

export const displayActive = (game) => {
  if (game.variant === "normal") {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const active = game.getActiveSquares();
        if (active[i][j]) {
          document
            .getElementById(toid("maintd", { x: i, y: j }))
            .classList.add("active");
        }
      }
    }
  }

  if (game.variant === "reversed") {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (game.isLegal(new Move(x, y))) {
          document
            .getElementById(toid("tdbg", { x, y }))
            .classList.add("active");
        }
      }
    }
  }
};
