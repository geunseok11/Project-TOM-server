const { goods } = require("../../models");
const url = require("url");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    try {
      let queryLength = Object.keys(req.query).length;
      if (queryLength === 0) {
        goods.findAll().then((data) => {
          if (data.length !== 0) {
            let arr = [];
            data.forEach((val) => {
              let obj = {
                goods_id: val.id,
                goods_name: val.goods_name,
                goods_img: val.goods_img,
                goods_price: val.goods_price,
              };
              arr.push(obj);
            });
            res.status(200).send(arr);
          } else {
            res.status(404).send({ message: "검색 결과가 없습니다." });
          }
        });
      } else {
        let queryData = url.parse(req.url, true).query;

        let option = [0, 10000000]; //기본 범위
        if (queryData.min) {
          option[0] = Number(queryData.min);
        }
        if (queryData.max) {
          option[1] = Number(queryData.max);
        }

        goods
          .findAll({
            where: { goods_price: { [Op.between]: [option[0], option[1]] } },
          })
          .then((data) => {
            if (data.length !== 0) {
              let arr = [];
              data.forEach((val) => {
                let obj = {
                  goods_id: val.id,
                  goods_name: val.goods_name,
                  goods_img: val.goods_img,
                  goods_price: val.goods_price,
                };
                arr.push(obj);
              });
              res.status(200).send(arr);
            } else {
              res.status(404).send({ message: "검색 결과가 없습니다." });
            }
          });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버가 점검 중입니다." });
    }
  },
};
