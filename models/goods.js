"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class goods extends Model {
    static associate(models) {
      this.belongsTo(models.users, {
        onUpdate: "cascade",
        onDelete: "set null",
      });
      this.hasMany(models.q_lists, {
        onUpdate: "cascade",
        onDelete: "set null",
      });
      this.hasMany(models.reviews, {
        onUpdate: "cascade",
        onDelete: "set null",
      });
      this.hasMany(models.order_lists, {
        onUpdate: "cascade",
        onDelete: "set null",
      });
    }
  }
  goods.init(
    {
      user_id: DataTypes.INTEGER,
      goods_name: DataTypes.STRING,
      goods_img: DataTypes.STRING,
      goods_price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      info_img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "goods",
    }
  );
  return goods;
};
