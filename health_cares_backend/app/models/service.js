import mongoose from 'mongoose';

// Define the schema for the Service
const serviceSchema = new mongoose.Schema({
    service_id: {
        type: Number,        // ID can be a number or string, depending on your need
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,        // URL for the icon image
        required: true
    },
    service_img: {
        type: String,        // URL for the detailed service image
        required: true
    }
}, { timestamps: true, versionKey: false });

// Export the model
export default mongoose.model("Service", serviceSchema);
