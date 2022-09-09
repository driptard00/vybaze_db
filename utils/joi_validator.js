const Joi = require("joi");

class JoiValidator {
    //User validation schema.
    static userSignUpSchema = Joi.object({
        firstname: Joi.string().required().min(2),
        lastname: Joi.string().required().min(2),
        age: Joi.number().required(),
        phonenumber: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
        .pattern(new RegExp('[a-zA-Z0-9]{8,30}$'))
        .error(new Error("Password must have at least 8 characters and alphanumberic.")),
        is_active: Joi.boolean().required(),
    });

    //User Login validation schema.
    static userLoginSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    //User validation schema.
    static userUpdateSchema = Joi.object({
        firstname: Joi.string().required().min(2),
        lastname: Joi.string().required().min(2),
        phonenumber: Joi.string(),
        email: Joi.string().required().email(),
        is_active: Joi.boolean().required(),
    });
}

module.exports = JoiValidator;