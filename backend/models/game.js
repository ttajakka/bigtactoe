const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db")

class Game extends Model { }

Game.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  passwordhash: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "game"
})

module.exports = Game