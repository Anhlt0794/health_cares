import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true, versionKey : false }
);
export default mongoose.model("Users", userSchema);