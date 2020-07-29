const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

module.exports = {
  tokenGenetator: ({ id, email, username }, { hostname }) => {
    //토큰을 생성하는 코드
    let token = jwt.sign({ id, email, username, hostname }, secret.tomKey, {
      expiresIn: "10m",
    });
    return token;
  },
  jwtVerification: (req, res, next) => {
    try {
      let token = req.cookies.user;
      if (token === undefined || !token) {
        next();
      } else {
        let verify = jwt.verify(token, secret.tomKey);
        if (verify) {
          res.userId = verify.id;
          next();
        } else {
          res.status(401).send({ message: "인증이 되지 않았습니다." });
        }
      }
    } catch (e) {
      res.status(401).send({ message: "토큰이 만료되었습니다." });
    }
  },
};
