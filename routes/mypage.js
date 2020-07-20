const express = require("express");
const router = express.Router();
const { mypageController } = require("../controllers/index");

router.get("/purchase", mypageController.purchase.get);
router.get("/purchase/traking", mypageController.tracking.get);
router.get("/sale", mypageController.sale.get);
router.get("/onsale", mypageController.onsale.get);

module.exports = router;
