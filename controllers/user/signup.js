const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    let {
      username,
      email,
      password,
      phone,
      address,
      trade_name,
      business_number,
      user_type,
      user_admission,
    } = req.body;
    if (user_type === 1) {
      trade_name = null;
      business_number = null;
      user_admission = 1;
    } else if (user_type === 2) {
      user_admission = 0;
    }

    users
      .findOrCreate({
        where: { email },
        defaults: {
          username,
          password,
          phone,
          address,
          trade_name,
          business_number,
          user_type,
          user_admission,
        },
      })
      .then(([users, created]) => {
        if (created === true) {
          res.status(201).send({ message: "회원가입 성공" });
        } else {
          res.status(404).send({ message: "회원 정보가 올바르지 않습니다." });
        }
      });
  },
};
