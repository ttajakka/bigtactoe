import { createBoard } from "./modules/createBoard.js";
import { clickNewGame, clickNewOnline, pressLogin } from "./modules/clickOps.js";

const gamebox = document.getElementById("box");
createBoard(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversedgame").onclick = clickNewGame("reversed");

document.getElementById("newonline").onclick = clickNewOnline("normal");
document.getElementById("newonlinereversed").onclick =
  clickNewOnline("reversed");

document.getElementById("newgamebuttons").style.display = "none";


document.getElementById("playonline").onclick = () => {
  document.getElementById("box").style.display = "initial";
  document.getElementById("right-col").style.display = "initial";
  document.getElementById("newonlinegamebuttons").style.display = "initial";
  document.getElementById("newgamebuttons").style.display = "none";
  document.getElementById("loginform").style.display = "none";
}

document.getElementById("study").onclick = () => {
  document.getElementById("box").style.display = "initial";
  document.getElementById("right-col").style.display = "initial";
  document.getElementById("newonlinegamebuttons").style.display = "none";
  document.getElementById("newgamebuttons").style.display = "initial";
  document.getElementById("loginform").style.display = "none";
}

document.getElementById("login").onclick = () => {
  document.getElementById("box").style.display = "none";
  document.getElementById("right-col").style.display = "none";
  document.getElementById("loginform").style.display = "initial";
};

document.getElementById("loginsubmit").onclick = pressLogin;

