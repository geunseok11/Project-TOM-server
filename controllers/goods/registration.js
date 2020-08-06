const { goods } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { goods_name, goods_img, goods_price, stock, info_img } = req.body;
    const token = res.locals.userId;
    let goods_imgArr = [];
    let infoimg;
    let recommendimg;
    if (req.files) {
      req.files.forEach((val) => {
        if (val.fieldname === "goods_img") {
          goods_imgArr.push(`http://localhost:4000/${val.path}`);
        } else if (val.fieldname === "info_img") {
          infoimg = `http://localhost:4000/${val.path}`;
        } else if (val.fieldname === "recommend_img") {
          recommendimg = `http://localhost:4000/${val.path}`;
        }
      });
    }

    goods
      .create({
        user_id: token,
        goods_name: goods_name,
        goods_img: goods_imgArr,
        goods_price: goods_price,
        stock: stock,
        info_img: infoimg,
        recommend_img: recommendimg,
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
  },
};
