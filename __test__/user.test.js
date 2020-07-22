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
const userFixture = require("./fixtures/users.json");

describe("User Contorller API", () => {
  beforeEach(async () => {
    // beforeEach 는 describe(suit)안에 it(테스트코드)마다 it()이 실행되기 전에 실행된다.
    await users.destroy({ where: {}, truncate: true });
    await users.create(userFixture[0]);
    await users.create(userFixture[1]);
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
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
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
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal(
            "관리자의 승인을 받은 후 가입이 완료됩니다"
          );
          done();
        });
    });

    it("회원정보 미입력 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/signup")
        .send({
          email: "test3@gmail.com",
          user_type: 1,
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("회원 정보가 올바르지 않습니다.");
          done();
        });
    });
  });

  describe("POST /user/emailcheck", () => {
    it("이메일 유효성 검사 성공 시 메세지를 응답해야 합니다", (done) => {
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
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("사용가능한 이메일 입니다.");
          done();
        });
    });

    it("이메일 유효성 검사 실패 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/emailcheck")
        .send({
          email: "cunsumer@gmail.com",
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
  describe("POST /user/login", () => {
    it("로그인 성공 시 유저정보를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "cunsumer@gmail.com",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.userInfo).has.all.keys([
            "username",
            "email",
            "phone",
            "address",
            "user_type",
          ]);
          done();
        });
    });

    it("로그인 실패 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "cunsumer@gmail.com",
          password: "12345",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal(
            "ID나 비밀번호가 일치하지 않습니다."
          );
          done();
        });
    });

    it("판매자 미인증 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "seller@gmail.com",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal(
            "아직 판매자 회원 승인을 받지 못했습니다."
          );
          done();
        });
    });
  });

  describe("POST /user/signout", () => {
    it("로그아웃 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/signout")
        .set({ host: "localhost:8080" })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("로그아웃이 되었습니다.");
          done();
        });
    });
  });

  describe("POST /user/certification", () => {
    it("회원인증 성공 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/certification")
        .send({
          email: "cunsumer@gmail.com",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("인증 성공");
          done();
        });
    });

    it("회원인증 실패 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/certification")
        .send({
          email: "cunsumer@gmail.com",
          password: "12345",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("비밀번호가 일치하지 않습니다.");
          done();
        });
    });
  });

  describe("POST /user/resign", () => {
    it("탈퇴 성공 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/resign")
        .send({
          email: "cunsumer@gmail.com",
          password: "1234",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          users
            .findOne({ where: { email: "cunsumer@gmail.com" } })
            .then((user) => {
              expect(user).to.equal(null);
              expect(res).to.have.status(201);
              expect(res.body.message).to.equal(
                "회원탈퇴가 정상적으로 완료되었습니다."
              );
              done();
            });
        });
    });
    it("탈퇴 실패 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/resign")
        .send({
          email: "cunsumer@gmail.com",
          password: "12345",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("비밀번호가 일치하지 않습니다.");
          done();
        });
    });
  });

  describe("POST /user/edituserinfo", () => {
    it("회원정보 수정 성공 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/edituserinfo")
        .send({
          username: "판매자A",
          password: "1234A",
          phone: "010-1234-1234",
          address: "서울시 OO구 OO로 OOO, 상세주소 100",
          trade_name: "판매장A",
          business_number: "123-45-12345",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("정상적으로 업데이트 되었습니다.");
          done();
        });
    });
    it("회원정보 수정 실패 시 메세지를 응답해야 합니다", (done) => {
      chai
        .request(app)
        .post("/user/edituserinfo")
        .send({
          username: "판매자",
          password: "1234",
          phone: "010-1234-5678",
          address: "서울시 OO구 OO로 OOO, 상세주소",
          trade_name: "판매장",
          business_number: "000-00-00000",
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("입력한 회원 정보가 동일합니다.");
          done();
        });
    });
  });
});
