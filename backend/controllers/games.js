const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { SECRET } = require("../util/config");

const Game = require("../models/game");
const User = require("../models/user");

const newGames = [];
const ongoingGames = {};

const createID = () => {
  return Math.floor(100000000 * Math.random());
};

const getToken = (req, res, next) => {
  const auth = req.get("authorization");
  if (!(auth && auth.startsWith('Bearer '))) {
    return res.status(401).json({ error: "invalid token" });
  }

  const decodedToken = jwt.verify(auth.replace('Bearer ', ''), SECRET);
  if (!decodedToken.username) {
    return res.status(401).json({ error: "invalid token" });
  }

  req.username = decodedToken.username;

  next();
};


router.get("/newgame", getToken, async (req, res) => {
  console.log(`GET to /newgame, user: ${req.username}`);
  const user = await User.findOne({ where: { username: req.username } });
  const userID = user.id;
  
  if (newGames.length === 0) {
    const gameID = createID();
    const side = Math.floor(2 * Math.random()) ? "X" : "O";
    const crossPlayer = side == "X" ? userID : null;
    const naughtPlayer = side == "O" ? userID : null;

    let timer = null;

    const handler = () => {
      clearTimeout(timer);
      res.send({ gameID, side });
    };
    newGames.push({ gameID, side, crossPlayer, naughtPlayer, handler });

    timer = setTimeout(() => {
      console.log("no games available");
      res.status(200).send({ message: "timeout: no games available" });
      newGames = newGames.filter(g => g.gameID != gameID);
      // newGames.splice(newGames.indexOf(g => g.gameID != gameID), 1)
    }, 30000);
  } else {
    let { gameID, side: opSide, crossPlayer, naughtPlayer, handler: opHandler } = newGames.pop();
    const side = opSide === "X" ? "O" : "X";
    if (!crossPlayer)
      crossPlayer = userID;
    else if (!naughtPlayer)
      naughtPlayer = userID;

    ongoingGames[gameID] = { gameID, moves: [], crossPlayer, naughtPlayer, handler: () => null };
    console.log(ongoingGames[gameID]);

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

router.get("/game/:gameID", getToken, (req, res) => {
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

router.post("/game/:gameID", getToken, (req, res) => {
  const gameID = req.params.gameID;
  const move = req.body.move;
  console.log(`POST to /game/:${gameID}, move:`, move);
  ongoingGames[gameID].moves.push(move);
  res.send({ gameID, move });
});

router.post("/game_ended/:gameID", async (req, res) => {
  // const gameID = req.params.gameID;
  const game = ongoingGames[req.params.gameID];
  // const moves = ongoingGames[gameID].moves;
  const moves_to_db = game.moves.map(m => 9 * m.x + m.y);
  console.log(moves_to_db);

  // remove game from ongoing
  // ongoingGames = ongoingGames.filter(g => g.gameID != gameID);
  delete ongoingGames.gameID;

  // insert game into database
  await Game.create({
    crossPlayer: game.crossPlayer,
    naughtPlayer: game.naughtPlayer,
    result: 1,
    moves: moves_to_db
  });

});

module.exports = router;