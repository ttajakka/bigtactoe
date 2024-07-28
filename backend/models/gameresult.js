const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db")

class Gameresult extends Model { }

Gameresult.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  result: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "gameresult"
})

module.exports = Gameresult