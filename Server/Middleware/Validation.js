import Joi from 'joi';

class EmployeeValidate{

  constructor(){
    this.ceatedOn = new Date().toString();
  }

  schemaCreate(dataToValidate) {

    const empSchema = {
      position : Joi.string().required(),
      name: Joi.string().required().min(3).max(20),
      nationalId: Joi.number().min(16).required(),
      email: Joi.string().required(),
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


}
const ValidateHelp = new EmployeeValidate();
export default ValidateHelp;