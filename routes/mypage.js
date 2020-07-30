const express = require("express");
const router = express.Router();
const { mypageController } = require("../controllers/index");
const { jwtVerification } = require("../jwt-utils/index");

router.get("/purchase", jwtVerification, mypageController.purchase.get);
router.get(
  "/purchase/tracking",
  jwtVerification,
  mypageController.tracking.get
);
router.get("/sale", jwtVerification, mypageController.sale.get);
router.get("/onsale", jwtVerification, mypageController.onsale.get);
router.get("/confirm", jwtVerification, mypageController.confirm.post);
router.get("/orderCheck", jwtVerification, mypageController.orderCheck.post);

module.exports = router;
