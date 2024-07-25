const express = require("express");
const cors = require("cors");
const app = express();

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const newGames = [];
const ongoingGames = {};

const createID = () => {
  return Math.floor(100000000 * Math.random());
};

app.use(cors());
app.use(express.json());

app.use(express.static('dist'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get("/api/newgame", (req, res) => {
  console.log("GET to /newgame")
  if (newGames.length === 0) {
    const gameID = createID();
    const side = Math.floor(2 * Math.random()) ? "X" : "O";
    console.log(`new gameID: ${gameID}, side: ${side}`);

    let timer = null;

    const handler = () => {
      clearTimeout(timer)
      res.send({ gameID, side });
    };
    newGames.push({ gameID, side, handler });

    timer = setTimeout(() => {
      console.log("no games available");
      res.status(200).send({ message: "timeout: no games available" });
      newGames.splice(newGames.indexOf(g => g.gameID != gameID), 1)
    }, 30000);
  } else {
    const { gameID, side: opSide, handler: opHandler } = newGames.pop();
    const side = opSide === "X" ? "O" : "X";
    ongoingGames[gameID] = { gameID, moves: [], handler: () => null };
    if (side === "O") {
      res.send({ gameID, side });
      ongoingGames[gameID].handler = opHandler;
    } else {
      opHandler();
      ongoingGames[gameID].handler = () => {
        res.send({ gameID, side });
      };
    }
  }
});

app.get("/api/game/:gameID", (req, res) => {
  const gameID = req.params.gameID;

  // call previous handler
  ongoingGames[gameID].handler();

  // register new handler
  ongoingGames[gameID].handler = () => {
    const moves = ongoingGames[gameID].moves;
    const move = moves[moves.length - 1];
    res.send(move);
  };
});

app.post("/api/game/:gameID", (req, res) => {
  const gameID = req.params.gameID;
  const move = req.body.move;
  console.log(`POST to /game/:${gameID}, move:`, move);
  ongoingGames[gameID].moves.push(move);
  res.send({ gameID, move });
});

app.get("/api/", (req, res) => {
  console.log("GET to /");
  res.send({ message: "Connection OK."})
});


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
}

start()