'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      goods_id: {
        type: Sequelize.INTEGER
      },
      goods_quantity: {
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.STRING
      },
      rec_name: {
        type: Sequelize.STRING
      },
      rec_phone: {
        type: Sequelize.STRING
      },
      rec_address: {
        type: Sequelize.STRING
      },
      invoice_number: {
        type: Sequelize.INTEGER
      },
      order_state: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_lists');
  }
};