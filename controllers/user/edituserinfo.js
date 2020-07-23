const crypto = require("crypto");
const { users } = require("../../models");
module.exports = {
  post: (req, res) => {
    if (!req.session.userId) {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
    let session = req.session.userId;
    let userInput = req.body;

    users
      .findOne({
        where: { id: session },
        attributes: [
          "username",
          "password",
          "phone",
          "address",
          "trade_name",
          "business_number",
        ],
      })
      .then((userInfo) => {
        let isUpdate = Object.keys(userInfo.dataValues).reduce((total, key) => {
          if (key === "password") {
            userInput[key] = crypto
              .createHmac("sha256", "tomtom")
              .update(userInput[key])
              .digest("hex");
          }
          if (userInfo[key] === userInput[key]) {
            return total;
          } else {
            return total + 1;
          }
        }, 0);
        if (isUpdate) {
          users
            .update(userInput, {
              where: {
                id: session,
              },
            })
            .then((result) => {
              if (result[0] >= 1) {
                res.status(201).send({
                  message: "정상적으로 업데이트 되었습니다.",
                });
              } else {
                res.status(404).send({
                  message: "정상적으로 업데이트 되지 않았습니다.",
                });
              }
            });
        } else {
          res.status(404).send({
            message: "입력한 회원 정보가 동일합니다.",
          });
        }
      });
  },
};
