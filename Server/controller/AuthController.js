import Bcrypt from '../Helper/hash';
import jwt from 'jsonwebtoken';
import ValidateHelp from '../Middleware/Validation';
import EmpModel from '../model/DBModel';
import Mailer from '../Helper/Mailer'

class Employees {
    async SignupEmployee( req, res) {
        const {  name, email, nationalId, phoneNumber, dateofBirth, password} = req.body;
        const createValidate = ValidateHelp.schemaCreate(req.body);
        if(createValidate.error){
          const Message = createValidate.error.details[0].message;
          const messUser = Message.replace(/\"/g, '');
          res.status(400).send({
            status: 400,
            message: messUser
          });
        } if(!createValidate.error){
          try{

      // Check existence of email 
      // const findThisUser = await EmpModel.checkEmaiExist(email);
      // if (findThisUser.length > 0)
      //  { res.status(401).json({ status: 401, message: 'email Already exists. Try another email' }); }
      //    // Check existence of  national Id 
      // const foundId = await EmpModel.checkNationalIdExist(nationalId);
      // if (foundId.length > 0)
      //  { res.status(401).json({ status: 401, message: 'National ID Already exists. Check if youo have written correct ID' }); }
      //    // Check existence of phone Number
      // const foundPhone = await EmpModel.checkPhoneExist(phoneNumber);
      // if (foundPhone.length > 0)
      //  { res.status(401).json({ status: 401, message: 'phone Number Already exists. check if  phone number is correct' }); } 
       
          const hashed = Bcrypt.hashpassword(password)
          const EmpData = {
            position: 'manager',
            name: name,
            nationalId: nationalId,
            phoneNumber: phoneNumber,
            email: email,
            hashed,
            dateofBirth: dateofBirth,
            status: 'inactive',
            createdDate: new Date(),
            modifiedDate: 'none'
          }    

          const newEmployee = await EmpModel.createEmployee(EmpData);
          const data = await EmpModel.fetchOneRecord(newEmployee[0].id);
          res.status(201).json({ status: 201, message: ` Employee was created successfully on ${ValidateHelp.ceatedOn}`, 
          data: {name, email, nationalId, phoneNumber, status: newEmployee.status, createdDate: newEmployee.createdDate}});

          const transporter = nodemailer.createTransport(
            {
              service: 'gmail',
              auth: {
                user: process.env.USER_ACC,
                pass: process.env.USER_PASS,
              },
              logger: false,
              debug: false,
            },
            {
              from: 'karangwa Emmy <karangwae10@gmail.com>',
            },
          );
      
          const messageObj = {
            to: `<${email}>`,
            subject: 'Registration was done successfully',
            text: `Hello ${name}`,
            html: `<p><b>Hello</b> ${name}</p>
                  <p><b>Your have registered successfully please confirm to access your account</b></p>
                  <button style =" background-color: green"> confirm </button>
                  `
          };
      
          // await transporter.sendMail(messageObj);
          // transporter.close();

        }catch(error){
          res.status(500).json({ status: 500, error: 'Internal Server Error!' });
        }
        }
      }

  async LoginEMployee(req, res) {
    const { email, password } = req.body;
    const inValidate = ValidateHelp.schemaSignIn(req.body);
    if (inValidate.error) {
      const mess = inValidate.error.details[0].message;
      const messUser = mess.replace(/\"/g, '');
      res.status(400).send({ status: 400, message: messUser });
    }
    if (!inValidate.error) {
      try {

      const findThisUser = await EmpModel.checkEmaiExist(email);
      if (findThisUser.length === 0)
       { res.status(401).json({ status: 401, message: 'wrong Credentials email' }); }
       const comparredPassword = Bcrypt.comparepassword(password, findThisUser[0].password); 
          if (comparredPassword) {
            const tokens = jwt.sign(findThisUser[0], process.env.SECRET_KEY, { expiresIn: '24000h' });
            res.status(200).json({ status: 200, message: `${findThisUser[0].name} your logged in successfully on ${ValidateHelp.ceatedOn}`, token: tokens });
          } else {
            res.status(401).json({ status: 401, message: `${findThisUser[0].name} You are using wrong Credentials Password` });
          }
        }catch(error){
          res.status(500).json({ status: 500, error: 'Internal Server Error!' });
        }
        };
       
  }

}
const EmpEMployee = new Employees();
export default EmpEMployee;
