'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillOldItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillOldItem.init({
    billId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    itemType: DataTypes.STRING,
    itemGroup: DataTypes.STRING,
    rate: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BillOldItem',
  });
  return BillOldItem;
};