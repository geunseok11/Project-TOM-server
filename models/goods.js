'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  goods.init({
    user_id: DataTypes.INTEGER,
    goods_name: DataTypes.STRING,
    goods_img: DataTypes.STRING,
    goods_price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    info_img: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'goods',
  });
  return goods;
};