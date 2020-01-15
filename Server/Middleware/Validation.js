import Joi from 'joi';
import EmpModel from '../model/DBModel'

class EmployeeValidate{

  constructor(){
    this.ceatedOn = new Date().toString();
  }

  schemaCreate(dataToValidate) {

    const empSchema = {
      position : Joi.string(),
      name: Joi.string().required().min(3).max(20),
      nationalId: Joi.number().min(16).required(),
      email: Joi.string().required(),
      password: Joi.string().min(6),
      phoneNumber: Joi.number().min(10).required(),
      dateofBirth: Joi.string(),
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
      password: Joi.string().min(6),
    };
    return Joi.validate(dataToValidate, inSchema);
  }

}
const ValidateHelp = new EmployeeValidate();
export default ValidateHelp;