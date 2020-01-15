import Bcrypt from '../Helper/hash';
import jwt from 'jsonwebtoken';
import ValidateHelp from '../Middleware/AuthValidations';
import EmpModel from '../model/DBModel';
import Mailer from '../Helper/Mailer'

class Users {
    async SignupEmployee( req, res) {
        const {  email, nationalId, phoneNumber, dateofBirth, password, createdDate, nodifiedDate} = req.body;
        const createValidate = ValidateHelp.schemaCreate(req.body);
        if(createValidate.error){
          const Message = createValidate.error.details[0].message;
          const messUser = Message.replace(/\"/g, '');
          res.status(400).send({
            status: 400,
            message: messUser
          });
        } if(!createValidate.error){
          const EmpData = {
            position: 'manager',
            email: email,
            nationalId: nationalId,
            phoneNumber: phoneNumber,
            email: email,
            dateofBirth: dateofBirth,
            status: 'inactive',
            createdDate: new Date(),
            modifiedDate: 'none'
          }
          const hashed = Bcrypt.hashpassword(password)
           const newEmployee = await EmpModel.createRecord(EmpData);
          const data = await EmpModel.fetchOneRecord(newEmployee[0].id);
          res.status(201).json({ status: 201, message: ` Employee was created successfully on ${ValidateHelp.ceatedOn}`, data: data});
          await Mailer.sendMail(newEmployee);
        }
      }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const inValidate = ValidateHelp.schemaSignIn(req.body);
    if (inValidate.error) {
      const mess = inValidate.error.details[0].message;
      const messUser = mess.replace(/\"/g, '');
      res.status(400).send({ status: 400, message: messUser });
    }
    if (!inValidate.error) {
      const findThisUser = await EmpModel.checkEmaiExist(email);
      if (findThisUser.length === 0) { res.status(401).json({ status: 401, message: 'wrong Credentials' }); } else {
        Bcrypt.comparepassword(password, findThisUser[0].password, (err, result) => {
          if (result) {
            const tokens = jwt.sign(findThisUser[0], process.env.SECRET_KEY, { expiresIn: '24000h' });
            res.status(200).json({ status: 200, message: `${findThisUser[0].email} your logged in successfully on ${Validator.created}`, token: tokens });
          } else {
            res.status(401).json({ status: 401, message: `${findThisUser[0].email} You are using wrong Credentials Password` });
          }
        });
      }
    }
  }

  async getUsers(req, res) {
    const ckEmailOnGetUsers = await EmpModel.checkEmaiExist(req.attachedWithInfo.email);
    if (ckEmailOnGetUsers.length === 0) return res.status(400).json({ status: 400, message: 'Invalid token' });
    const users = await EmpModel.fetchAllUser();
    return res.status(200).json({ status: 200, message: ` ${req.attachedWithInfo.email} users retrieved Successfully `, data: users });
  }
}
const expUsers = new Users();
export default expUsers;
