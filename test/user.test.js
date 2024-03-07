const chai =  require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaihttp);

describe('User API', () => {
    describe('POST /api/user/register', () => {
      it('it should register a new user', (done) => {
        const newUser = {
          username: 'test',
          password: 'test'
        };
  
        chai.request(app)
          .post('/api/user/register')
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User created successfully');
            done();
          });
      });
    });
  
    describe('POST /api/auth/login', () => {
      it('it should login an existing user', (done) => {
        const credentials = {
          username: 'test',
          password: 'test'
        };
  
        chai.request(app)
          .post('/api/auth/login')
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
          });
      });
    });
  });

