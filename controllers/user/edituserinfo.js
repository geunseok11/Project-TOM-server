const { users } = require("../../models");
const session = require("express-session");
module.exports = {
  post: (req, res) => {
    let a = {
      username: "판매자",
      password: "1234",
      phone: "010-1234-5678",
      address: "서울시 OO구 OO로 OOO, 상세주소",
      trade_name: "판매장",
      business_number: "000-00-00000",
    };
    let session = req.sessoin.userId;
    users
      .findOne({
        where: { id: session },
        attribues: [
          "username",
          "password",
          "phone",
          "address",
          "trade_name",
          "business_number",
        ],
      })
      .then((userData) => {
        console.log(userData);
        res.send();
      });
  },
};
