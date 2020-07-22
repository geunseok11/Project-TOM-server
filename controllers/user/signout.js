module.exports = {
  post: (req, res) => {
    if (req.session.userId) {
      req.session.destroy(err => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send({ message: "로그아웃이 되었습니다." });
        }
      });
    } else {
      res.status(404).send({ message: "세션이 존재하지 않습니다." });
    }
  },
};
