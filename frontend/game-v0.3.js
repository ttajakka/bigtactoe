import { createBoard } from "./modules/createBoard.js";
import { clickNewGame } from "./modules/clickOps.js";

const gamebox = document.getElementById("box");
createBoard(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversegame").onclick = clickNewGame("reversed");
