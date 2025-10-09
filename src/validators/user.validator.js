import { Joi, validate } from "express-validation";

export const UserValidator = {
  createUserSchema: () =>
    validate({
      body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),
};
