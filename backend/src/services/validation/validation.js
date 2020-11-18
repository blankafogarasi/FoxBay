const Joi = require('@hapi/joi');

export const userValidation = (data) => {
    const schema = Joi.object({
       username: Joi.string()
         .min(6)
         .required(),
        firstName: Joi.string()
          .required(),
        lastName: Joi.string()
          .required(),
        password: Joi.string()
          .min(8)
          .required(),
        email: Joi.string()
          .min(6)
          .required()
          .email(),
    });
    return schema.validate(data);
};

export const loginValidation = (data) => {
    const schema = Joi.object({
       username: Joi.string()
         .min(6)
         .required(),
        password: Joi.string()
          .min(8)
          .required(),
    });
    return schema.validate(data);
};