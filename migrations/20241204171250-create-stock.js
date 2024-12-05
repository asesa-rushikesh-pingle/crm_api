'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itemType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itemGroup: {
        type: Sequelize.STRING
      },
      itemWeight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stoneWeight: {
        type: Sequelize.FLOAT
      },
      finalWeight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sellBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stocks');
  }
};