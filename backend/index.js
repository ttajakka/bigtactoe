const express = require("express");
const cors = require("cors");
const app = express();

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const gamesRouter = require('./controllers/games')

app.use(cors());
app.use(express.json());

app.use(express.static('dist'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/games', gamesRouter)

app.get("/api/", (req, res) => {
  console.log("GET to /");
  res.send({ message: "Connection OK."})
});


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
}

start()