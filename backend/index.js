const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

const newGames = [];
const ongoingGames = {};

const createID = () => {
  return Math.floor(100000000 * Math.random());
};

app.use(cors());
app.use(bodyParser.json());

app.get("/newgame", (req, res) => {
  console.log('new GET request to /newgame,', newGames, ongoingGames)
  console.log("newGames.length:", newGames.length)
  if (newGames.length > 0) {
    const { gameID, side: opside } = newGames.pop().handler();
    const side = opside === "X" ? "O" : "X";
    console.log({ gameID, side })
    res.json({ gameID, side });
    ongoingGames[gameID] = { handler: () => null };
  } else {
    const gameID = createID();
    const side = Math.floor(2 * Math.random()) ? "X" : "O";
    const handler = () => {
      res.json({ gameID, side });
      return { gameID, side };
    };
    newGames.push({ gameID, handler });
    console.log(newGames);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
