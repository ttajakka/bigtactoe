import { createBoard } from "./modules/createBoard.js";
import { clickNewGame, clickNewOnline } from "./modules/clickOps.js";

const gamebox = document.getElementById("box");
createBoard(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversedgame").onclick = clickNewGame("reversed");

document.getElementById("newonline").onclick = clickNewOnline("normal");
document.getElementById("newonlinereversed").onclick =
  clickNewOnline("reversed");

document.getElementById("login").onclick = () => {
  document.getElementById("box").style.display = "none";
  document.getElementById("right-col").style.display = "none";
  document.getElementById("loginform").style.display = "initial";
};
