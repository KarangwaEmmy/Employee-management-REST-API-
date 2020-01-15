import Joi from 'joi';

class EmployeeValidate{

  constructor(){
    this.ceatedOn = new Date().toString();
  }

  schemaValidate(dataToValidate) {

    const empSchema = {
      name: Joi.string().required().min(3).max(20),
      nationalId: Joi.number().min(16).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().min(10).required(),
      dateofBirth: Joi.string(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(6).required(),
      status: Joi.string().required()
    }

    return Joi.validate(dataToValidate, empSchema);
  }

   checkStatus(status) {
    if(status != 'active' && status != 'inactive' && status != 'suspend'){
      return status;
    }
  }
  schemaSignIn(dataToValidate) {
    const inSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    };
    return Joi.validate(dataToValidate, inSchema);
  }

}
const ValidateHelp = new EmployeeValidate();
export default ValidateHelp;