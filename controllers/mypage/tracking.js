const { order_lists } = require("../../models");
const axios = require("axios");
const { TRACKING_KEY } = require("../../config/config");
module.exports = {
  get: (req, res) => {
    const token = res.userId;
    if (!token) {
      res.status(403).send({
        message: "로그인이 필요한 서비스 입니다.",
      });
    }
    //======================================
    axios
      .get(
        `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${TRACKING_KEY}&t_code=05&t_invoice=418173431690`
      )
      .then((trackingData) => {
        let formatTracking = {};
        res.send();
      })
      .catch(() => {
        res.status(404).send({
          message: "없는 송장번호 입니다.",
        });
      });
  },
};
