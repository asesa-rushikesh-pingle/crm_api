'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(sequelize.define('Bill'))
    }
  }
  Customer.init({
    authId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    pendingAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};