const { reviews, users } = require("../../models");

const url = require("url");
module.exports = {
  get: (req, res) => {
    let { goods_id } = url.parse(req.url, true).query;
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
    let token = res.userId;
    if (token) {
      reviews
        .create({
          user_id: token,
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
      res.status(403).send({ message: "로그인이 필요한 서비스입니다." });
    }
  },
  put: (req, res) => {
    let token = res.userId;
    if (token) {
      let { review_id, title, contents, star, review_img } = req.body;
      reviews
        .findOne({ where: { id: review_id } })
        .then((data) => {
          let check = false;
          let array = [title, contents, star, review_img];
          array.forEach((val) => {
            if (data.dataValues[val] === val) {
              check === true;
            }
          });
        })
        .then((check) => {
          if (check) {
            review
              .update({
                where: { id: review_id },
                defaults: [title, contents, star, review_img],
              })
              .then((result) => {
                if (result) {
                  res.status(200).send({ message: "리뷰 업데이트 성공" });
                }
              })
              .catch((err) => {
                res.status(404).send({ message: "업데이트 실패" });
              });
          } else {
            res.status(404).send({ message: "리뷰 내용이 같습니다." });
          }
        });
    } else {
      res.status(403).send({ message: "로그인이 필요한 서비스입니다." });
    }
  },
  delete: (req, res) => {
    let token = res.userId;
    if (token) {
      let { review_id } = req.body;
      reviews
        .destroy({ where: { id: review_id } })
        .then((result) => {
          if (result) {
            res.status(200).send({ message: "리뷰 삭제 성공" });
          } else {
            res
              .status(404)
              .send({ message: "존재하지 않는 review_id 입니다." });
          }
        })
        .catch((e) => {
          res.status(404).send({ message: "삭제 실패" });
        });
    } else {
      res.status(403).send({ message: "로그인이 필요한 서비스입니다." });
    }
  },
};
