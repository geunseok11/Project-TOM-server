const { reviews, users } = require("../../models");
module.exports = {

  get: (req, res) => {
    let { goods_id } = req.body;
    reviews
      .findAll({
        include: [{ model: users, attributes: ["username"] }],
        where: { goods_id: goods_id },
      })
      .then((data) => {
        if (data.length !== 0) {
          let arr = [];
          data.forEach((val) => {
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
          res.status(404).send({ message: "리뷰가 존재하지 않습니다." });
        }
      });
  },
  post: (req, res) => {
    let { review_img, title, contents, star, goods_id } = req.body;
    if (req.session.userId) {
      reviews
        .create({
          user_id: req.session.userId,
          goods_id: goods_id,
          title: title,
          contents: contents,
          star: star,
          review_img: review_img,
        })
        .then(() => {
          res.status(201).send({ message: "성공적으로 글이 작성 되었습니다." });
        })
        .catch(() => {
          res.status(404).send({
            message: "글 작성이 실패하였습니다.",
          });
        });

    } else {
      res.status(403).send({ message: "로그인하세요" });
    }
  },
};
