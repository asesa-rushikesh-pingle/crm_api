'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Customer);
    }
  }
  Bill.init({
    customerId: DataTypes.INTEGER,
    subTotal: DataTypes.FLOAT,
    oldSubTotal: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    finalTotal: DataTypes.FLOAT,
    amountPaid: DataTypes.FLOAT,
    remainingAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};