const { order_lists } = require("../../models");
const axios = require("axios");
const { TRACKING_KEY } = require("../../config/config");
module.exports = {
  get: (req, res) => {
    const session = req.session.userId;
    if (!session) {
      res.status(404).send({
        message: "세션이 존재하지 않습니다.",
      });
    }
    //======================================
    axios
      .get(
        `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${TRACKING_KEY}&t_code=05&t_invoice=418173431690`
      )
      .then((resz) => {
        console.log(Object.keys(resz));
        console.log(resz.data);
        res.send(resz.data);
      })
      .catch(() => {
        res.status(404).send({
          message: "없는 송장번호 입니다.",
        });
      });
  },
};
