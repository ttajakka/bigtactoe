const User = require("./user")
const Gameresult = require("./gameresult")

Gameresult.sync()
User.sync()

module.exports = {
  Gameresult,
  User
}