module.exports = {
  post: (req, res) => {
    let token = res.userId;
    if (token !== undefined) {
      req.user = undefined;
      res.cookie("user", undefined);
      res.status(201).send({ message: "로그아웃이 되었습니다." });
    } else {
      res.status(403).send({ message: "로그인이 필요한 서비스입니다." });
    }
  },
};
