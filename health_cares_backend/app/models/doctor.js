import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    doc_id: {
        type :String,
        required:true,
        unique:true,
    },
    name: {
        type :String,
        required:true
    },
    specialize : {
        type :String,
    },
    hospital_address : {
        type :String,
    },
    exp : {
        type :Number,
    },
    doc_img: {
        type :String,
    }
},{ timestamps: true, versionKey : false })
export default mongoose.model("Doctors",doctorSchema);