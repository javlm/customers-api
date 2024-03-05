const chai = request("chai");
const chaihttp = request("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaihttp);

describe("POST /api/users/signup", () => {
  it("it should create a new user into the database", (done) => {
    const user = {
      username: "test",
      email: "user@test.com",
      password: "testpass",
    };

    chai
      .request(app)
      .post("/api/users/signup")
      .send(user)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have
          .property("message")
          .eql("User created succesfully");
        done();
      });
  });
});
