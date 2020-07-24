const { goods } = require("../../models");
module.exports = {
  post: (req, res) => {
    const { goods_name, goods_img, goods_price, stock, info_img } = req.body;
    const session = req.session.userId;
    if (session) {
      goods
        .create({
          user_id: session,
          goods_name: goods_name,
          goods_img: goods_img,
          goods_price: goods_price,
          stock: stock,
          info_img: info_img,
        })
        .then(() => {
          res.status(201).send({
            message: "정상적으로 상품이 등록 되었습니다.",
          });
        })
        .catch(() => {
          res.status(404).send({
            message: "상품 등록이 실패 되었습니다.",
          });
        });
    } else {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
  },
};
