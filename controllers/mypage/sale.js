const { goods, order_lists } = require("../../models");

module.exports = {
  get: async (req, res) => {
    let token = res.userId;
    if (token) {
      let data = await goods.findAll({
        where: { user_id: token },
        attributes: ["id", "goods_name", "goods_img", "goods_price"],
        include: [
          {
            model: order_lists,
            attributes: ["id", "goods_quantity", "order_date"],
          },
        ],
      });

      if (data.length !== 0) {
        let resultArray = [];
        data.forEach((val) => {
          if (val.order_lists.length !== 0) {
            val.order_lists.forEach((order) => {
              resultArray.push({
                order_id: order.id,
                goods_name: val.goods_name,
                goods_img: val.goods_img,
                goods_price: val.goods_price * order.goods_quantity,
                goods_quantity: order.goods_quantity,
                order_date: order.order_date,
              });
            });
          }
        });

        res.status(200).send(resultArray);
      } else {
        res.status(404).send({ message: "판매 내역이 없습니다." });
      }
    } else {
      res.status(403).send({ message: "로그인이 필요한 서비스입니다." });
    }
  },
};
