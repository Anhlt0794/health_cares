import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "any.required": "Username là trường bắt buộc",
        "string.empty": "Username không được để trống",
        "string.trim": "Username không được chứa khoảng cách"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email là trường bắt buộc",
        "string.email": "Email không hợp lệ",
        "string.empty": "Email không được để trống"
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password là trường bắt buộc",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Confirm Password là trường bắt buộc",
        "any.only": "Confirm Password không trùng khớp",
        "string.empty": "Confirm Password không được để trống"
    })
});
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email là trường bắt buộc",
        "string.email": "Email không hợp lệ",
        "string.empty": "Email không được để trống"
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password là trường bắt buộc",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống"
    })
});