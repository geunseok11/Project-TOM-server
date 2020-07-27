const { users, q_lists } = require("../../models");

module.exports = {
  get: (req, res) => {
    const { goods_id } = req.body;
    const session = req.session.userId;
    if (!session) {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
    q_lists
      .findAll({
        include: [
          {
            model: users,
            attributes: ["username"],
          },
        ],
        where: {
          goods_id: goods_id,
        },
        attributes: ["id", "title", "contents"],
      })
      .then((qListsData) => {
        console.log(qListsData);
      });
  },
  post: (req, res) => {
    const { goods_id, title, contents } = req.body;
    const session = req.session.userId;
    if (!session) {
      res.status(404).send({
        message: " 세션이 존재하지 않습니다.",
      });
    }
    if (title && contents) {
      q_lists
        .create({
          user_id: session,
          goods_id: goods_id,
          title: title,
          contents: contents,
        })
        .then(() => {
          res.status(201).send({
            message: "성공적으로 글이 작성 되었습니다.",
          });
        });
    } else {
      res.status(404).send({
        message: "내용이 없습니다.",
      });
    }
  },
};
