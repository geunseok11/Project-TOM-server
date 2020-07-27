const { reviews, users } = require("../../models");
module.exports = {
  get: async (req, res) => {
    let { goods_id } = req.body;
    let data = await reviews.findAll({
      include: [{ model: users, attributes: ["username"] }],
      where: { goods_id: goods_id },
    });
    if (data.length !== 0) {
      let arr = [];
      data.forEach((val) => {
        console.log(val);
        arr.push({
          title: val.title,
          username: val.user.username,
          contents: val.contents,
          star: val.star,
          review_img: val.review_img,
        });
      });
      res.status(200).send(arr);
    } else {
      res.status(200).send({ message: "리뷰가 존재하지 않습니다." });
    }
  },
  post: async (req, res) => {
    let { review_img, title, contents, star, goods_id } = req.body;
    if (req.session.userId) {
      await reviews
        .create({
          user_id: req.session.userId,
          goods_id,
          title,
          contents,
          star,
          review_img,
        })
        .catch((e) => {
          res.status(404).send({
            message: "글 작성이 실패하였습니다.",
          });
        });
      res.status(201).send({ message: "성공적으로 글이 작성 되었습니다." });
    } else {
      res.status(403).send({ message: "로그인하세요" });
    }
  },
};
