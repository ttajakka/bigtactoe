import { createBoard } from "./modules/createBoard.js";
import { clickNewGame, clickNewOnline } from "./modules/clickOps.js";

const gamebox = document.getElementById("box");
createBoard(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversedgame").onclick = clickNewGame("reversed");

document.getElementById("newonline").onclick = clickNewOnline("normal");
document.getElementById("newonlinereversed").onclick = clickNewOnline("reversed");
