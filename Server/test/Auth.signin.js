import chai from 'chai';
import 'dotenv/config';
import chaiHttp from 'chai-http';
import server from '../../index';
import data from './allTestDB';
import token from './tokenHelper';
const jwt = require('jsonwebtoken');

const {expect} = chai;
chai.use(chaiHttp);

  
// routes urls
const loginUrl = '/api/v2/auth/login';

const router = () => chai.request(server);

describe('Authentication Sign-in tests Suite',() =>{
    
    it('should not be able to signin when email is not filled', (done) => {
        router()
         .post('/api/v2/auth/signin')
         .send(data[4])
         .end((error, response) => {
         expect(response.body).to.have.property('status');
         expect(response.body.status).to.be.equal(400);
         expect(response.body).to.have.property('message');
         expect(response.body.message).to.be.a('string');
         done(error)
     });
   });
   it('should not be able to signin when password is not filled', (done) => {
       router()
        .post('/api/v2/auth/signin')
        .send(data[5])
        .end((error, response) => {
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error)
    });
  });
  it('all users should not be able to signin when email field is empty', (done) => {
    router()
      .post('/api/v2/auth/signin/')
      .send(data[3])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('all users should not be able to signin when he/she used invalid email', (done) => {
    router()
      .post('/api/v2/auth/signin/')
      .send(data[11])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('all users should not be able to signin when try to use email which is not exist', (done) => {
    router()
      .post('/api/v2/auth/signin/')
      .send(data[11])
      .end((error, response) => {
        expect(response.body).to.have.status([401])
        expect(response.body).to.have.property('status')
        expect(response.body).to.be.a('object')
        expect(response.body.status).to.be.equal(401)
        expect(response.body.message).to.be.a('string')
        done(error);
      });
  });

  it('all users should not be able to signin when try to use wrong password', (done) => {
    router()
      .post('/api/v2/auth/signin/')
      .send(data[9])
      .end((error, response) => {
        expect(response).to.have.status([401]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
    it('should Log in the user when password and email is filled',() =>{
        router()
        .post(loginUrl)
        .send(data[8])
        .set('Authorization', 'Bearer ' + token)
        .end((err,res) =>{
            expect(res.body).to.be.a('object');
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.have.property('status');
            expect(res.type).to.be.equal('application/json');
        });
    });
});
 