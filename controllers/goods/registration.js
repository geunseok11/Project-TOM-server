const { goods } = require("../../models");
module.exports = {
  post: (req, res) => {
    const { goods_name, goods_img, goods_price, stock, info_img } = req.body;
    const token = res.userId;
    if (token) {
      goods
        .create({
          user_id: token,
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
      res.status(403).send({
        message: "로그인이 필요한 서비스입니다.",
      });
    }
  },
};
