"use strict";

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

describe("User Contorller API", () => {
  beforeEach(async () => {
    // beforeEach 는 describe(suit)안에 it(테스트코드)마다 it()이 실행되기 전에 실행된다.
    await users.destroy({ where: {}, truncate: true });
    await users.create({ email: "conflict@gmail.com" });
  });

  describe("POST /user/signup", () => {
    // 일반 회원가입 => user_type이 1인 경우
    it("일반 회원가입 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/signup")
        .send({
          username: "testuser1",
          email: "test@gmail.com",
          password: "1234",
          phone: "010-1234-5678",
          address: "서울시 OO구 OO로 OOO, 상세주소",
          user_type: 1,
          user_addmission: 1,
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("회원가입 성공");
          done();
        });
    });

    // 판매자 회원가입 => user_type이 2인 경우
    it("판매자 회원가입 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/signup")
        .send({
          username: "testuser2",
          email: "test@gmail.com",
          password: "1234",
          phone: "010-1234-5678",
          address: "서울시 OO구 OO로 OOO, 상세주소",
          business_number: "000-00-00000",
          user_type: 2,
          user_addmission: 0,
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal(
            "관리자의 승인을 받은 후 가입이 완료됩니다."
          );
          done();
        });
    });
  });

  describe("POST /user/emailcheck", () => {
    it("user mail 사용가능 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/emailcheck")
        .send({
          email: "don-conflict@gmail.com",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("사용가능한 이메일 입니다.");
          done();
        });
    });
    it("user mail 충돌 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/emailcheck")
        .send({
          email: "conflict@gmail.com",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(409);
          expect(res.body.message).to.equal("이미 사용중인 이메일 입니다.");
          done();
        });
    });
  });
  //===
});
