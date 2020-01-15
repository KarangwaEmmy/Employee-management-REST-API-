import Joi from 'joi';

class Validator {
  schemaSignUp(dataToValidate) {
    const upSchema = {
        firstname: Joi.string().min(4).required(),
        lastname: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().trim(),
        phoneNumber: Joi.number().min(9).required(),
        username: Joi.string().min(3).required(),
    };
    return Joi.validate(dataToValidate, upSchema);
  }

  schemaSignIn(dataToValidate) {
    const inSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().trim(),
    };
    return Joi.validate(dataToValidate, inSchema);
  }

  constructor() {
    this.created = new Date().toString();
  }
}

const expValidator = new Validator();
export default expValidator;
