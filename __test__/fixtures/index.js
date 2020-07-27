const userFixture = require("./users.json");
const goodsFixture = require("./goods.json");
const q_listsFixture = require("./q_lists.json");
const reviewFixture = require("./review.json");
const replyFixture = require("./reply.json");
const ordersFixture = require("./order_lists.json");
let {
  users,
  q_lists,
  reply,
  reviews,
  goods,
  order_lists,
  sequelize,
} = require("../../models");
module.exports = {
  refreshData: async () => {
    await sequelize.sync({ force: true });
    await users.bulkCreate(userFixture);
    await goods.bulkCreate(goodsFixture);
    await q_lists.bulkCreate(q_listsFixture);
    await reply.bulkCreate(replyFixture);
    await reviews.bulkCreate(reviewFixture);
    await order_lists.bulkCreate(ordersFixture);
    // await userFixture.forEach((val) => {
    //   users.create(val);
    // });
    // await goodsFixture.forEach((val) => {
    //   goods.create(val);
    // });
    // await q_listsFixture.forEach((val) => {
    //   q_lists.create(val);
    // });
    // await reviewFixture.forEach((val) => {
    //   reviews.create(val);
    // });
    // await replyFixture.forEach((val) => {
    //   reply.create(val);
    // });
    // await ordersFixture.forEach((val) => {
    //   order_lists.create(val);
    // });
  },
};
