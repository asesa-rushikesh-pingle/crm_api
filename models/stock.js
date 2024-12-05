'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stock.init({
    itemName: DataTypes.STRING,
    itemType: DataTypes.STRING,
    itemGroup: DataTypes.STRING,
    itemWeight: DataTypes.FLOAT,
    stoneWeight: DataTypes.FLOAT,
    finalWeight: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    sellBy: DataTypes.STRING,
    uom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};