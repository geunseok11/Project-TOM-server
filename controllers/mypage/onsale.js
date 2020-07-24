const { users, goods } = require("../../models");
module.exports = {
  get: (req, res) => {
    const session = req.session.userId;
    if (session) {
      goods
        .findAll({
          where: {
            user_id: session,
          },
          attributes: ["goods_name", "goods_img", "goods_price", "stock"],
        })
        .then((onSaleData) => {
          if (onSaleData) {
            res.status(200).send(onSaleData);
          } else {
            res.status(404).send({
              message: "등록한 상품이 없습니다.",
            });
          }
        });
    } else {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
  },
};
