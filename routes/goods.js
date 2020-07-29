const express = require("express");
const router = express.Router();
const { goodsController } = require("../controllers/index");
const { jwtVerification } = require("../jwt-utils/index");

router.get("/list", goodsController.list.get);
router.get("/info", goodsController.info.get);
router.get("/info/qa_lists", goodsController.qaLists.get);
router.get("/info/review", goodsController.review.get);
router.post("/info/qa_lists", jwtVerification, goodsController.qaLists.post);
router.post("/info/reply", jwtVerification, goodsController.reply.post);
router.post("/info/review", jwtVerification, goodsController.review.post);
router.post(
  "/registration",
  jwtVerification,
  goodsController.registration.post
);

module.exports = router;
