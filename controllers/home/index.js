const { goods } = require("../../models");

module.exports = {
  get: async (req, res) => {
    let recommendationData = await goods
      .findAll({
        where: {},
        offset: 0,
        limit: 5,
        order: [["stock"]],
      })
      .then((data) => {
        return data.map((goods) => {
          return {
            id: goods.id,
            title: `${goods.goods_name}에 대한 제목`,
            contents: `${goods.goods_name}에 대한 내용`,
            img: goods.goods_img,
            filter: goods.goods_type,
          };
        });
      });
    let bestData = await goods
      .findAll({
        where: {},
        offset: 0,
        limit: 10,
        order: [["stock"]],
      })
      .then((data) => {
        return data.map((goods) => {
          return {
            id: goods.id,
            title: `${goods.goods_name}에 대한 제목`,
            price: goods.goods_price,
            img: goods.goods_img,
          };
        });
      });
    if (recommendationData.length && bestData.length) {
      res.status(201).send({
        recommendation: recommendationData,
        best: bestData,
      });
    } else {
      res.status(404).send({
        message: "data is not found",
      });
    }
  },
};
