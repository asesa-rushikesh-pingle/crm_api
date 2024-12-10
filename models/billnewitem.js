'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillNewItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillNewItem.init({
    itemName: DataTypes.STRING,
    itemType: DataTypes.STRING,
    itemGroup: DataTypes.STRING,
    rate: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    makingAmount: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BillNewItem',
  });
  return BillNewItem;
};