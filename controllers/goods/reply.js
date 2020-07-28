const { reply } = require("../../models");
module.exports = {
  post: (req, res) => {
    const { text, qa_list_id } = req.body;
    const session = req.session.userId;
    if (!session) {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
    if (text) {
      reply
        .create({
          user_id: session,
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
};
