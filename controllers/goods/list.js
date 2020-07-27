const { goods } = require("../../models");
const url = require("url");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    try {
      let queryLength = Object.keys(req.query).length;
      if (queryLength === 0) {
        let data = await goods.findAll({
          attributes: [
            ["id", "goods_id"],
            "goods_name",
            "goods_img",
            "goods_price",
          ],
        });
        if (data.length !== 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send({ message: "검색 결과가 없습니다." });
        }
      } else {
        let queryData = url.parse(req.url, true).query;

        let option = [0, 10000000];
        if (queryData.min) {
          option[0] = Number(queryData.min);
        }
        if (queryData.max) {
          option[1] = Number(queryData.max);
        }

        let data = await goods.findAll({
          where: { goods_price: { [Op.between]: [option[0], option[1]] } },
          attributes: [
            ["id", "goods_id"],
            "goods_name",
            "goods_img",
            "goods_price",
          ],
        });
        if (data.length !== 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send({ message: "검색 결과가 없습니다." });
        }
      }
    } catch (e) {
      res.status(500).send({ message: "서버가 점검 중입니다." });
    }
  },
};
