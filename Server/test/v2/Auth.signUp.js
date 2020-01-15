import chai from 'chai';
import 'dotenv/config';
import chaiHttp from 'chai-http';
import server from '../../index';
import data from './allTestDB';
import token from './tokenHelper';
import tokenHelper from './tokenHelper';
const jwt = require('jsonwebtoken');

const {expect} = chai;
chai.use(chaiHttp);

  
// routes urls
const signupurl = '/api/v2/auth/signup';
const loginUrl = '/api/v2/auth/login';

const router = () => chai.request(server);

describe('Testing Authenticatiopn Endpoint', (done) =>{
    it('should you welcome to the broadcaster endpoint page', (done) =>{
        router()
        .get('/')
        .end((err, res) => {
            expect(res.body).to.have.property('status')
            expect(res.body.message).to.be.a('string')
            expect(res.body.status).to.be.equal(200)
            done(err);
        });
    });
});

describe('Authentication Signp tests Suite',() =>{
    it('should not  be able to signUp when firstname of not filled', (done) => {
        router()
          .post('/api/v2/auth/signup')
          .send(data[0])
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.message).to.be.a('string');
            done(error);
          })
      });
      it('should not be able to signUp when lastname is not filled', (done) => {
        router()
          .post('/api/v2/auth/signup')
          .send(data[1])
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.message).to.be.a('string');
            done(error);
          })
      });
    
      it('should not be able to signUp when lastname is not filled', (done) => {
         router()
          .post('/api/v2/auth/signup')
          .send(data[2])
          .end((error, response) => {
            expect(response.body.status).to.be.equal(400)
            expect(response.body).to.have.property('status');
            expect(response.body.status).to.be.equal(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
            done(error);
          });
      });
      it('should not be able to signUp when email is not filled', (done) => {
         router()
          .post('/api/v2/auth/signup')
          .send(data[3])
          .end((error, response) => {
          expect(response.body).to.have.property('status');
          expect(response.body.status).to.be.equal(400);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.be.a('string');
          done(error)
      });
    });
    it('should not be able to signUp when password is not filled', (done) => {
        router()
         .post('/api/v2/auth/signup')
         .send(data[4])
         .end((error, response) => {
         expect(response.body).to.have.property('status');
         expect(response.body.status).to.be.equal(400);
         expect(response.body).to.have.property('message');
         expect(response.body.message).to.be.a('string');
         done(error)
     });
   });
   it('should not be able to signUp when phonenumber is not filled', (done) => {
    router()
     .post('/api/v2/auth/signup')
     .send(data[5])
     .end((error, response) => {
     expect(response.body).to.have.property('status');
     expect(response.body.status).to.be.equal(400);
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.be.a('string');
     done(error)
 });
});
 it('should not be able to signUp when username is not filled', (done) => {
    router()
     .post('/api/v2/auth/signup')
     .send(data[5])
     .end((error, response) => {
     expect(response.body).to.have.property('status');
     expect(response.body.status).to.be.equal(400);
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.be.a('string');
     done(error)
 });
});
it('should not be able to signUp when username is not filled', (done) => {
    router()
     .post('/api/v2/auth/signup')
     .send(data[7])
     .end((error, response) => {
     expect(response.body).to.have.property('status');
     expect(response.body.status).to.be.equal(201);
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.be.a('string');
     done(error)
 });
});
it('should not be able to signUp when all fields and filled', (done) => {
    router()
     .post('/api/v2/auth/signup')
     .set('Authorization', 'Bearer ' + token.validToken)
     .send(data[7])
     .end((error, response) => {
     expect(response.body).to.have.property('status');
     expect(response.body.status).to.be.equal(201);
     expect(response.body).to.have.property('message');
     expect(response.body.message).to.be.a('string');
     done(error)
 });
});
});
 