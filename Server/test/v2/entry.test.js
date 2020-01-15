// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../index';
// import imptokelp from './tokenHelper';

// chai.use(chaiHttp);
// const router = () => chai.request(app);
// describe('my Testing suite', () => {
//   const token = imptokelp.validToken;
//   const invalidToken = imptokelp.invalidToken;
 
//  it('should successfully view all red flags', (done) => {
//       router()
//         .get('/api/v1/red-flags/')
//         .set('Authorization', 'Bearer ' + token)
//         .end((err, res) => {
//             chai.expect(res.body).to.be.a('object');
//             chai.expect(res.statusCode).to.equal(200);
//             chai.expect(res.type).to.be.equal('application/json');
//         });
//       done();
//     });
// });

// describe('Red flags Tests',() =>{

//     it('should delete existing red flag',() =>{
//         router()
//         .delete('/api/v1/red-flags/:id')
//         .set('Authorization', 'Bearer ' + token)
//         .end((err,res) =>{
//         chai.expect(res.type).to.be.equal('application/json');
//         });
//     });
//     it('should update existing red flag comment',() =>{
//         router()
//         .patch('/api/v1/red-flags/:id/comment')
//         .set('Authorization', 'Bearer ' + token)
//         .end((err,res) =>{
//             chai.expect(res.body).to.be.a('object');
//             chai.expect(res.statusCode).to.be.equal(422);
//             chai.expect(res.body).to.have.property('status');
//             chai.expect(res.type).to.be.equal('application/json');

//         });
//     });
//     it('should update existing red flag location',() =>{
//         router()
//         .patch('/api/v1/red-flags/:id/location')
//         .set('Authorization', 'Bearer ' + token)
//         .end((err,res) =>{
//             chai.expect(res.body).to.be.a('object');
//         chai.expect(res.type).to.be.equal('application/json');
//         chai.expect(res.body).to.have.property('status');

//         });
//     });
//     });
       
   
    
//     describe('verifyToken',() =>{
//         it('it should respond with  authorisation header',function (){
//             const generateToken = tokenObj => jwt.sign(tokenObj, process.env.SECRET_KEY);
//             router()
//             .get('/api/auth/signUp')
//             .set('Authorization', 'Bearer ' + generateToken)
//             .end(function(err,res){
//                 chai.expect(res.body).to.be.a('object');
//                 if(err) return done(err);
//             });
//         });
//     });

//     describe('return  a specific red -flag', () => {
//         it('should return  a specific red -flag',() =>{
//             router()
//             .get('/api/v1/red-flags/:id')
//             .set('Authorization', 'Bearer ' + token)
//             .end((err,res) =>{
//                 chai.expect(res.body).to.be.a('object');
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.type).to.be.equal('application/json');
    
//             });
//     });
// });