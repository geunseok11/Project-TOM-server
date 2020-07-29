const express = require("express");
const router = express.Router();
const { mypageController } = require("../controllers/index");
const { jwtVerification } = require("../jwt-utils/index");

router.get("/purchase", jwtVerification, mypageController.purchase.get);
router.get("/purchase/traking", jwtVerification, mypageController.tracking.get);
router.get("/sale", jwtVerification, mypageController.sale.get);
router.get("/onsale", jwtVerification, mypageController.onsale.get);

module.exports = router;
