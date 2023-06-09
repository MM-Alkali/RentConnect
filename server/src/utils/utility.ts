import Joi from "joi";
import bcrypt from 'bcryptjs'

export const registerSchema = Joi.object().keys({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.any().equal(Joi.ref("password")).required().label("Confirm password").messages({"any.only": "{{#label}} does not match"})

});

export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
}

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const HashedPassword = async(password:string, salt:string) => {
    return await bcrypt.hash(password, salt)
}
