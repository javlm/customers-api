const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index') 

chai.use(chaiHttp)

describe('User Management API', () => {
    describe('POST /api/users/signup', () => {
        it('it should register a new user', (done) => {
            const newUser = {
                username: 'test',
                email: 'test@testing.com',
                birthday: '07/03/2024',
                phone: 58745607,
                password: 'test'
            };

            chai.request(app)
                .post('/api/users/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('User created succesfully');
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