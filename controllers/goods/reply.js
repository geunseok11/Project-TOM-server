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
  put: () => {},
  delete: () => {},
};
