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

const router = () => chai.request(server);
   
   describe('verifyToken Suite',() =>{
        it('it should respond with  authorisation header',function (){
            router()
            .get('/api/auth/signUp')
            .set('Authorization', 'Bearer ' + token.validToken)
            .end((error,response) => {
                expect(response.body).to.be.a('object');
                if(err) return done(err);
            });
        });
    });