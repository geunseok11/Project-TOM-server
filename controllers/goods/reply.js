const { reply } = require("../../models");
module.exports = {
  post: (req, res) => {
    const { text, qa_list_id } = req.body;
    const token = res.userId;
    if (!token) {
      res.status(403).send({
        message: "로그인이 필요한 서비스입니다.",
      });
    }
    if (text) {
      reply
        .create({
          user_id: token,
          text: text,
          q_lists_id: qa_list_id,
        })
        .then(() => {
          res.status(201).send({
            message: "리플 성공",
          });
        });
    } else {
      res.status(404).send({
        message: "리플 실패",
      });
    }
  },
  put: (req, res) => {
    const { reply_id, text } = req.body;
    const token = res.userId;
    if (!token) {
      res.status(404).send({
        message: "로그인이 필요한 서비스입니다.",
      });
    }
    reply
      .findOne({
        where: {
          id: reply_id,
          text: text,
        },
      })
      .then((replyDatum) => {
        if (replyDatum) {
          res.status(404).send({
            message: "리플 내용이 같습니다.",
          });
        } else {
          reply
            .update({ text: text }, { where: { id: reply_id } })
            .then(([isUpdate]) => {
              if (isUpdate) {
                res.status(200).send({
                  message: "리플 업데이트 성공",
                });
              } else {
                res.status(404).send({
                  message: "해당 reply_id가 존재하지 않습니다.",
                });
              }
            });
        }
      });
  },
  delete: (req, res) => {
    const { reply_id } = req.body;
    const token = res.userId;
    if (!token) {
      res.status(404).send({
        message: "로그인이 필요한 서비스입니다.",
      });
    }
    reply.destroy({ where: { id: reply_id } }).then((isDelete) => {
      if (isDelete) {
        res.status(200).send({
          message: "리플 삭제 성공",
        });
      } else {
        res.status(404).send({
          message: "존재하지 않는 reply_id 입니다.",
        });
      }
    });
  },
};
