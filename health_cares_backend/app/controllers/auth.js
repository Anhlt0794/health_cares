import {registerSchema} from "../schemas/auth";
import User from "../models/user";
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export const  signup = async (req, res) => {
    // get data from request body
    const { username,email, password, confirmPassword } = req.body;
    // validate data
    const {error} = registerSchema.validate(req.body, {abortEarly : false});

    if(error){
        const message = error.details.map((message) => message.message);
        return res.status(400).send({message})
    }
    // check user exist
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).send({
            message:["User already exists"]
        })
    }
   const hashedPassword = await bcryptjs.hash(password,10);

    const user = await User.create({
        username,email,password : hashedPassword
    });
    user.password = undefined;
    return res.status(200).send({
        user: user
    })
};

export const signin = async (req, res) => {
    // Get data from request body
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).send({
            message: ["Email and password are required."]
        });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({
            message: ["Invalid email or password."]
        });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({
            message: ["Invalid email or password."]
        });
    }

    // Optionally, generate a token (e.g., JWT)
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // Remove password from response
    user.password = undefined;

    return res.status(200).send({
        user: user,
        token: token
    });
};
