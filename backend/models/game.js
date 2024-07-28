const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db")

const User = require("./user")
const Gameresult = require("./gameresult")

class Game extends Model { }

Game.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  crossPlayer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  naughtPlayer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  result: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Gameresult,
      key: "id"
    }
  },
  moves: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  updatedAt: false,
  modelName: "game"
})

module.exports = Game