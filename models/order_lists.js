"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_lists.init(
    {
      user_id: DataTypes.INTEGER,
      goods_id: DataTypes.INTEGER,
      goods_quantity: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      rec_name: DataTypes.STRING,
      rec_phone: DataTypes.STRING,
      rec_address: DataTypes.STRING,
      invoice_number: DataTypes.INTEGER,
      order_state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order_lists",
    }
  );
  return order_lists;
};
