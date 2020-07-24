const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

const app = require("../app");
const {
  users,
  q_lists,
  reply,
  reviews,
  goods,
  order_lists,
} = require("../models");
const goodFixtures = require("./fixtures/goods.json");
describe("Mypage Test Case", () => {
  beforeEach(async () => {
    // Setup/TearDown : Check Fixtures folder
    await goods.destroy({ where: {}, truncate: true });
    await goods.create(goodFixtures[7]);
    await goods.create(goodFixtures[8]);
  });

  describe("GET/mypage/purchase", () => {
    it("사용자가 구매한 상품의 목록을 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "cunsumer@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/purchase").end((err, res) => {
            expect(res).to.have.status(200);
            res.body.forEach((value) => {
              expect(value).has.all.keys([
                "goods_name",
                "goods_img",
                "goods_price",
                "goods_quantity",
                "order_date",
              ]);
              done();
            });
          });
        });
    });
    it("판매자가 구매한 상품의 목록을 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "seller222@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/purchase").end((err, res) => {
            expect(res).to.have.status(200);
            res.body.forEach((value) => {
              expect(value).has.all.keys([
                "goods_name",
                "goods_img",
                "goods_price",
                "goods_quantity",
                "order_date",
              ]);
              done();
            });
          });
        });
    });
    it("사용자가 구매한 상품이 없으면 없다고 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "cunsumer@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/purchase").end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal("구매 내역이 없습니다.");
            done();
          });
        });
    });
  });
  describe("GET/mypage/sale", () => {
    it("판매자의 판매 내역을 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "seller222@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/sale").end((err, res) => {
            expect(res).to.have.status(200);
            res.body.forEach((value) => {
              expect(value).has.all.keys([
                "goods_name",
                "goods_img",
                "goods_price",
                "goods_quantity",
                "order_date",
              ]);
              done();
            });
          });
        });
    });
    it("판매자의 판매 내역이 없으면 없다고 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "seller222@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/sale").end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal("판매 내역이 없습니다.");
            done();
          });
        });
    });
  });
  describe("GET/mypage/onsale", () => {
    it("판매자가 등록해 둔 상품 목록을 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "seller222@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/onsale").end((err, res) => {
            expect(res).to.have.status(200);
            res.body.forEach((value) => {
              expect(value).has.all.keys([
                "goods_name",
                "goods_img",
                "goods_price",
                "stock",
              ]);
              done();
            });
          });
        });
    });
    it("판매자가 등록해 둔 상품 목록이 없으면 없다고 응답한다.", (done) => {
      const agent = chai.request.agent(app);
      agent
        .post("/user/login")
        .send({ email: "seller222@gmail.com", password: "1234" })
        .then(() => {
          agent.get("/mypage/onsale").end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal("등록한 상품이 없습니다.");
            done();
          });
        });
    });
  });
});
