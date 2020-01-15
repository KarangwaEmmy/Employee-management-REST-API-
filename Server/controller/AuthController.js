import crypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import impData from '../models/DB';
import Validator from '../helpers/validators';

class Users {
  async signupUser(req, res) {
    const { username, email, password } = req.body;
    const upValidate = Validator.schemaSignUp(req.body);
    if (upValidate.error) {
      const mess = upValidate.error.details[0].message;
      const messUser = mess.replace(/\"/g, '');
      res.status(400).send({ status: 400, message: messUser });
    }
    if (!upValidate.error) {
      const ckEmail2 = await impData.checkEmaiExist(email);
      if (ckEmail2.length !== 0) return res.status(409).json({ status: 409, message: `${username} this email *${email}* already taken !!` });

      const saltRound = 12;
      crypt.hash(password, saltRound, (err, hash) => {
        const hashed = { password: hash };
        impData.createUser(req.body, hash);
        const vistByToken = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: '24000h' });
        res.status(201).json({ status: 201, message: `${username} your account have created successfully on ${Validator.created}`, token: vistByToken });
      });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const inValidate = Validator.schemaSignIn(req.body);
    if (inValidate.error) {
      const mess = inValidate.error.details[0].message;
      const messUser = mess.replace(/\"/g, '');
      res.status(400).send({ status: 400, message: messUser });
    }
    if (!inValidate.error) {
      const findThisUser = await impData.checkEmaiExist(email);
      if (findThisUser.length === 0) { res.status(401).json({ status: 401, message: 'wrong Credentials' }); } else {
        crypt.compare(password, findThisUser[0].password, (err, result) => {
          if (result) {
            const tokens = jwt.sign(findThisUser[0], process.env.SECRET_KEY, { expiresIn: '24000h' });
            res.status(200).json({ status: 200, message: `${findThisUser[0].username} your logged in successfully on ${Validator.created}`, token: tokens });
          } else {
            res.status(401).json({ status: 401, message: `${findThisUser[0].username} You are using wrong Credentials Password` });
          }
        });
      }
    }
  }

  async getUsers(req, res) {
    const ckEmailOnGetUsers = await impData.checkEmaiExist(req.attachedWithInfo.email);
    if (ckEmailOnGetUsers.length === 0) return res.status(400).json({ status: 400, message: 'Invalid token' });
    const users = await impData.fetchAllUser();
    return res.status(200).json({ status: 200, message: ` ${req.attachedWithInfo.username} users retrieved Successfully `, data: users });
  }
}
const expUsers = new Users();
export default expUsers;
