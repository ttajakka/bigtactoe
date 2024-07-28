const User = require("./user")
const Gameresult = require("./gameresult")
const Game = require("./game")

Gameresult.sync()
User.sync()
Game.sync({ alter: true })

module.exports = {
  Gameresult,
  User
}