'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: DataTypes.STRING,
    userId: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    mbileNo: DataTypes.STRING,
    bankName: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    IFSCCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};