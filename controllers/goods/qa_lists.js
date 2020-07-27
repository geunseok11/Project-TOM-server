const { users, q_lists, reply } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { goods_id } = req.body;
    const session = req.session.userId;

    let qLists = await q_lists
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
        if (qListsData.length === 0) {
          res.status(404).send({
            message: "질문이 존재하지 않습니다.",
          });
        } else {
          let joinQLists = qListsData.map((qData) => {
            return {
              id: qData.id,
              title: qData.title,
              username: qData.user.username,
              contents: qData.contents,
            };
          });
          return joinQLists;
        }
      });
    if (qLists) {
      let formmattedQList = [];
      for (let i = 0; i < qLists.length; i++) {
        let replies = await reply
          .findAll({
            include: [
              {
                model: users,
                attributes: ["username"],
              },
            ],
            where: {
              q_lists_id: qLists[i].id,
            },
            attributes: ["text", "createdAt"],
          })
          .then((replyData) => {
            let joinReply = replyData.map((reply) => {
              return {
                username: reply.user.username,
                text: reply.text,
                createdAt: reply.createdAt,
              };
            });
            return joinReply;
          });
        formmattedQList.push({
          id: qLists[i].id,
          title: qLists[i].title,
          username: qLists[i].username,
          contents: qLists[i].contents,
          reply: replies,
        });
      }

      res.status(200).send(formmattedQList);
    }
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
