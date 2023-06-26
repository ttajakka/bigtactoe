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
  // console.log('new GET request to /newgame,', newGames, ongoingGames)
  if (newGames.length > 0) {
    const { gameID, side: opside } = newGames.pop().handler();
    const side = opside === "X" ? "O" : "X";
    ongoingGames[gameID] = { gameID, moves: [], handler: () => null };
    res.json({ gameID, side });
  } else {
    const gameID = createID();
    const side = Math.floor(2 * Math.random()) ? "X" : "O";
    const handler = () => {
      res.json({ gameID, side });
      return { gameID, side };
    };
    newGames.push({ gameID, handler });
    // console.log(newGames);
  }
});

app.get("/game/:gameID", (req, res) => {
  const gameID = req.params.gameID;
  console.log(`GET to /game/:${gameID}`);
  ongoingGames[gameID].handler = (move) => {
    res.json(move);
  };
});

app.post("/game/:gameID", (req, res) => {
  const gameID = req.params.gameID;
  const move = req.body.move;
  console.log(`POST to /game/:${gameID}, move:`, move);
  ongoingGames[gameID].moves.push(move);
  ongoingGames[gameID].handler(move);
  res.json({ gameID, move });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
