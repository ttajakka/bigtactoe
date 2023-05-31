import { createGameTable } from "./modules/createGameTable.js";
import { clickNewGame } from "./modules/clickOps.js";

document.getElementById("newclassical").onclick = clickNewGame("classical");
document.getElementById("newreverse").onclick = clickNewGame("reversed");
createGameTable(document.getElementById("gamebox"));
